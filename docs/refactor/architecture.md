## No server-side dynamic routing or Server Component data access

**Found:** While verifying the `next-async-request-api` codemod's "0 files
modified" result, a manual audit confirmed: zero `[param]`-style dynamic
route folders under `app/`, zero server-side reads of `params` or
`searchParams` in page/layout functions, zero usage of `cookies()` or
`headers()` from `next/headers` anywhere in the codebase. The 6 usages of
route params that do exist are all the client-side `useParams`/
`useSearchParams` hooks from `next/navigation` — a different, unaffected
API.

**Root cause:** Qodum is built almost entirely with client components.
Routing state, IDs, and data fetching are handled client-side (hooks +
`useEffect` + server actions called from the client) rather than through
Next.js's App Router server-rendering model. This is consistent with a
separate finding in the auth system: route protection is also implemented
as a client-side `useEffect` redirect rather than a server-side check.

**Fix:** No code change from this entry alone — this is a diagnostic
finding, not a bug fix. It's the reason the async-request-api migration
required no changes, and it directly informs the auth remediation work,
since any server-side session check that gets added will need to be
introduced deliberately rather than extended from existing patterns.

**Verification:** `grep`-based audit of `app/` and `components/` for
dynamic route folders, `params`/`searchParams` destructuring, and
`next/headers` imports — zero matches for all three, confirming the
codemod's result was correct rather than a silent no-op failure.

**Impact:** Not a bug in itself, but an architectural fact that shapes
every subsequent fix in this codebase.

---

## Duplicated CRUD boilerplate across every module (Form/Buttons/Print/View)

**Found:** Every module in the app (~70, spot-checked several across
Users, Fees, and Payroll) follows the same four-file shape —
`FormCom.tsx`, `Buttons.tsx`, `PrintButton.tsx`, `ViewCom.tsx` — hand-written
per module with near-identical logic and only the field/column names
differing. A single record's data was held in up to five separate places
at once (`editingUser`, `formDraft`, a manually maintained
`comparisonObject` for dirty-checking, and two independent hardcoded
"empty form" reset objects), each requiring manual updates in sync.
Create/modify/delete were branches of one function, with delete
routed through the same `form.handleSubmit` used for create/modify —
meaning a delete required the full record to pass field validation first.
Permission checks and sort/pagination controls were duplicated per
module; the latter never had working logic behind them (no `onClick`,
no state) in every file checked.

**Root cause:** No shared abstraction existed for the create → view →
edit → delete cycle. Each module was built by copying the previous
module's four files and renaming fields, so any structural fix had to be
(or, more often, wasn't) repeated 70 times by hand.

**Fix:** Built a shared CRUD layer and migrated the Users → Manage Users →
Create User page to it as the reference implementation:

- `useCrudForm` — one hook owning the record lifecycle. Mode
  (`create`/`edit`) and dirty state are derived from a single stored
  record rather than tracked as separate flags; delete is its own call,
  no longer routed through form validation; in-progress typing persists
  across tab switches via the existing Zustand tab store.
- `DynamicField` — renders a field from a config object
  (`text`/`password`/`number`/`select`/`multiselect`/`switch`) instead of
  hand-written markup per field.
- `CrudButtons` — one Save/Modify/Delete/View/Cancel bar driven by
  `permissions` and callbacks, replacing each module's own `Buttons.tsx`.
- `PrintButton` — config-driven xlsx/csv export. Replaced
  `react-xlsx-wrapper` with `exceljs` (the former has unpatched
  known vulnerabilities in its free/npm-distributed styling path and its
  npm listing is stale; `exceljs` is itself unmaintained upstream but
  stable and the only actively-viable option supporting the cell styling
  already in use — noted here so this tradeoff isn't re-litigated per
  module).
- `ListView` — replaces each module's hand-built `ViewCom` table.
  Columns and the record-hydration-on-select logic derive automatically
  from the module's `emptyRecord` constant (its field types tell you the
  needed DB↔form conversions, e.g. a string-typed default on a field the
  DB returns as a number), with `columns`/`hidden` props to override or
  trim the derived set. Adds working search, sort, and pagination, none
  of which existed before.
- `usePermission` — derives the module/sub-menu permission key from the
  route itself (reusing the same `modules` config `resolveBreadcrumb`
  already walks) instead of every module passing hardcoded name strings
  that had to exactly match the permissions data.

Two real bugs surfaced and fixed during the conversion, independent of
the refactor itself: the Users list's "OTP Enabled" column read a field
name (`otp_enable`) that doesn't exist on the record (the real field is
`enable_otp`), so it always displayed `False`; and `modifyUser`
unconditionally re-hashed and overwrote the password on every edit,
including with an empty string — meaning any edit made without
deliberately retyping the password would have silently wiped it. The
Create User validation schema previously required a password on every
edit for this same reason; it's now optional on edit and required only
on create, with the server-side overwrite fixed to match.

**Verification:** Line count for Create User's four files dropped from
what the equivalent still-unconverted module (`defineSchoolBoard`) has
today — 611 lines (171 + 179 + 113 + 148) — to 218 (0 + 194 + 0 + 24),
with the shared layer (`useCrudForm`, `DynamicField`, `CrudButtons`,
`PrintButton`, `ListView`, `usePermission`) at ~660 lines as a one-time
cost amortized across every module it's applied to next. Numeric-field
and password-validation edge cases (empty vs. zero, DB-omitted vs.
form-empty) were verified against the actual installed `zod`/
`react-hook-form`/`@hookform/resolvers` versions in a sandboxed
reproduction before landing, since two of the fixes depended on resolver
behavior that isn't obvious from the libraries' types alone.

**Impact:** Applied to Create User first as the reference
implementation; the same five-piece pattern (`useCrudForm` +
`DynamicField` config + `CrudButtons` + `PrintButton` config +
`ListView` with an `emptyRecord`) is the intended path for every
remaining module still on the old four-file shape.

---

## Database migration: MongoDB → PostgreSQL

**Found:** While scoping the plan to unify Qodum Mobile's standalone
Express/MongoDB server (`qodum-server`) into the ERP's Next.js API, an
audit of all 73 Mongoose models in `lib/models/` found zero uses of
`ObjectId` + `ref`. Every relationship in the app — student → class,
payment → student, class → wing, fee → fee group — is expressed as a
plain string that's expected to match a name in another collection,
with no schema-level enforcement. One concrete bug surfaced during
the same audit:phone/mobile fields across `Student`,
`AdmittedStudent`, `User`, and `Staff` are typed `Number`, which drops
leading zeros and has no reason to support arithmetic.

**Root cause:** MongoDB's flexible schema doesn't require declaring
relationships or enforcing referential integrity, so `mongoose.Schema`
was used as a loose validation layer rather than a real data model.
Combined with unifying the mobile server onto one database — which
was already forcing a decision about what the shared schema should
look like — this was the point where continuing to build on Mongo's
document model stopped being the path of least resistance.

**Fix:** Decided to migrate to PostgreSQL via Prisma (already adopted
elsewhere in the codebase for type safety). Migration is phased, not a
single big-bang pass:
1. Lookup/reference models (`Class`, `Board`, `Religion`, `Caste`,
   `AcademicYear`, etc.) migrate first as real tables with primary
   keys, since other models currently reference them only by name.
2. Transactional models (`Student`, `Payment`, `User`, `Staff`) are
   ported structurally: flat fields become typed columns (fixing the
   `Number`-for-phone issue as they're touched), and deeply nested
   subdocuments (e.g. `Student.parents`, `guardian_details`) become
   `Json` columns rather than being force-normalized into more tables.
3. String fields that are true pseudo-relations (e.g. `Student.class`)
   are converted to real foreign keys opportunistically, as each
   module is touched for the mobile-server unification work, rather
   than in one pass across all 73 models.

The Prisma schema is split across multiple files under
`prisma/models/`, mirroring the existing module structure
(`global-masters`, `admission`, `fees`, `payroll`, `users`,
`accounts`) rather than one `schema.prisma`.

**Verification:** Manual review of all 73 model files in `lib/models/`
confirmed zero `ObjectId`/`ref` usage. Field-type issues (the `tyoe`
typo, `Number`-typed phone fields) were found by direct inspection of
model source, not inferred.

**Impact:** Affects every model in the codebase and the Qodum Mobile
server unification plan directly — the shared Postgres DB is what both
the ERP web app and the mobile API will run against going forward,
with routes split by client (`api/erp/...` vs `api/mobile/...`) over
shared, client-agnostic domain functions.

---

## User authorization: per-user permissions in PostgreSQL, enforced in API routes

**Found:** Permissions were an embedded array on the Mongo `User` document. Every new user was stamped with the full set (450+ entries, one per page across 12 modules) from a ~700-line hardcoded literal inside `createUser`, so the page catalog and the per-user grants were the same data, copied per user. Each entry carried both `main_menu` and `sub_menu`, but runtime lookups only ever used the module name and `sub_menu`. `sr_no` repeated within modules, so it couldn't be used for ordering either. None of the 76 files in `lib/actions` checks who is calling, so the only enforcement was the UI hiding buttons.

**Root cause:** Nothing separated "which pages exist" from "what this user may do on them", and enforcement was only ever designed for page navigation (`proxy.ts`), not for the data-changing calls.

**Fix:** Three tables, refining phase 2 of the migration entry above (`User.permissions` was first drafted as a `Json?` column and rejected):

- `PermissionItem`: the catalog. One row per permissionable page, `[module_name, page_name]` unique, seeded once from `constants/permissionsTree.ts` via `prisma db seed`. Seeding is idempotent for additions but not for renames.
- `UserPermission`: one row per grant, with the five action flags, unique on `[user_id, permission_item_id, session]`. Sparse (no row means no access, so a new user has zero rows) and scoped to an academic year, so a user can hold a page in one session and not the next. `onDelete: Cascade` on the user relation.
- `User.session` was removed. An account persists across sessions, and only its grants are session-scoped. Grants do **not** carry forward when a new `AcademicYear` is activated.

Conventions that came with it:

- **Slugs:** `module_name` and `page_name` are stored as slugs matching the route (`fees`, `define-wing`). Display labels are derived by one `humanize()` function, with an acronym exceptions map.
- **Thread rule:** a page with `threads` is only a grouping label. Each thread is the permission unit, matching the old data. Sub-modules are display-only and never reach the database.
- **snake_case:** every field that mirrors a database column is snake_case, including the JWT payload and `CurrentUser`.
- **Admin:** `is_admin` bypasses all checks and admins hold no `UserPermission` rows. The bypass exists in `proxy.ts`, `usePermission`, the modules grid, the sidebar, and `authorize()`.
- **Two tiers:** unchanged from the JWT entry in `authentication.md`. The token carries only the flat module map, and the granular grants are read from Postgres per request.

Enforcement uses API routes, not server actions, because routes can return 401/403/409 and fit SWR reads. A single `authorize(module_name, page_name, action)` helper runs at the top of every handler. `proxy.ts` does not match `/api/*`, so this helper is the only gate on those routes. `getCurrentUser()` re-reads the user on every call, so setting `is_active` to false takes effect immediately despite the 30-day token.

**Verification:** The catalog seeds, and the seed script now reports the module and sub-module of a malformed tree entry instead of a generic Prisma error. An admin can sign in, pass `proxy.ts`, and see the modules grid, sidebar, and Create User buttons.

**Impact:** Closes the "action-level checks deferred" item in `authentication.md`, once the routes exist. **Not done yet:** the `app/api/users/*` routes and `authorize()` (designed, not built); ~80 legacy components still read `sub_menu` and the nested permission shape; carry-forward of grants between sessions.

---

## Numeric data through the form lifecycle: one schema, two conversion points

**Found:** The shared CRUD layer moved records between the database and
the form, but had no defined rule for numbers. The User model has almost
no integer surface (`mobile` is a string), so the gap never showed up on
Create User. Tracing the flow for other models found:

- `hydrateRecord` converts numbers to strings for the form, but nothing
  converted them back. Only `id` (`parseId`) and `schools` (`toIds`) had
  hand-written reverse conversions.
- The client and server each had their own Zod schema for a user, and they
  had already drifted (the form required a numeric `mobile`; the server
  accepted any string).
- The old schema pattern `.pipe(z.coerce.number())` turns an empty
  optional field into `0`, since `Number('')` is `0`.
- `toDbNumber` existed twice and was never called.

**Root cause:** HTML inputs always emit strings, and the database wants
real numbers, so the type has to change twice on every round trip. With
no rule for where, each field got its own ad-hoc conversion, or none.

**Fix:** Each direction has exactly one conversion point.

```
READ   Postgres (Int) → GET /api/users (JSON, numbers) → SWR cache
       → ListView row select → hydrateRecord (number → string) → Zustand record
       → useCrudForm defaultValues → <input> (strings)

WRITE  <input> (strings) → react-hook-form → shared Zod schema
       (string → number, '' → null) → save() → api/users.ts
       → route: parseBody(same schema) → Prisma → Postgres
```

- **DB → form:** `hydrateRecord` only. A string default in `emptyRecord`
  means a string field, so numbers are stringified and `null` becomes
  `''`. Arrays of ids become string arrays. Number fields must default to
  `''`, never `0`, or `isDirty` compares `5` against `"5"`.
- **Form → DB:** the Zod schema only, using `zInt` and `zFloat`
  (`lib/validations/shared/number.ts`). They accept a string (form) or a
  number (JSON), reject anything that isn't a clean number (no `1e3`,
  `0x10`, `1.5` for an int, or values above the Postgres Int range),
  and output a real number. `.optional()` turns an empty value into
  `null`, so a PATCH can clear a column; `.required()` rejects it.
- **One schema:** `user.validation.ts` is the only user schema. The client
  validates with it through `zodResolver`, and the routes validate with it
  through a shared `parseBody()` helper. PATCH uses
  `UpdateUserValidation.partial()`, so an omitted field means "leave it
  unchanged". The separate API schema, `toIds`, and the `.map(String)` in
  `fetchUsers` were deleted.
- **Numeric strings:** values that are digits but not numbers (phone
  numbers, codes) use `zNumericString`, which is digits-only and stays a
  string end to end.
- **Types:** `useCrudForm` takes a second type parameter inferred from the
  update schema, so `create` and `modify` are typed with the Zod *output*
  rather than the form-side `emptyRecord` type. `UserPayload` is derived
  from the schema instead of written by hand.
- Removed a phantom `employee` field from the form schema and
  `emptyUser`. It isn't in the Prisma model and would have reached
  `prisma.user.create` as an unknown argument.

**Verification:** Tested end to end on Create User with two test fields
added to the `User` model: `age` (required `Int`, default `-1`) and
`salary` (optional `Int`). Create and edit both work, and
`npx tsc --noEmit` reports no errors in the files touched. Errors that
remain in `manageUsers/feeTypeAssignToUser` and
`manageUsers/userPermission` come from the legacy `AuthContext` import,
not from this work. A stale `"ignoreDeprecations": "6.0"` in
`tsconfig.json` (TypeScript is on 5) had been aborting `tsc` before it
checked any file, so type errors across the project had not been
surfacing.

**Impact:** Every remaining module inherits this: define one schema, use
`zInt`/`zFloat`/`zNumericString` for numeric fields, default number fields
to `''` in `emptyRecord`, and use `parseBody()` in the routes.

**Not done yet:**
- Only `Int` and numeric strings were exercised. `Float`/`Decimal` fields
  (money columns should become `Decimal`, which serializes to a string in
  JSON), single nullable foreign-key selects, dates, and booleans on other
  pages haven't been tested through this path.
- `strictNullChecks` is off, so Zod types every object key as optional and
  drops `null` from unions. This is why `parseBody()` casts its result to
  `Required<>`. TypeScript won't catch a missing required field on these
  pages; Zod enforces it at runtime. Enabling the flag project-wide is a
  separate task.
- Existing users get `age = -1` from the column default, and the form
  rejects `-1`, so each old user needs a real age before it can be saved.
- `request()` still throws only `data.error`, so a rejected save shows a
  generic "Invalid data" toast and the field errors in `details` are lost.