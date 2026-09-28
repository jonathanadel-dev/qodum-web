// prisma/seed.ts
import { prisma } from '../lib/prisma';
import { permissionModules } from '../constants/permissionsTree';

async function main() {
    const items: { module_name: string; page_name: string }[] = [];

    for (const module of permissionModules) {
        for (const subModule of module.subModules) {
            for (const page of subModule.pages) {
                const location = `${module.moduleName} > ${subModule.subModuleName}`;

                if (typeof page !== 'object' || page === null) {
                    throw new Error(`Bad page entry at ${location}: ${JSON.stringify(page)}`);
                }

                if (page.threads) {
                    for (const thread of page.threads) {
                        if (typeof thread !== 'string' || !thread.trim()) {
                            throw new Error(`Bad thread at ${location} > ${page.pageName}: ${JSON.stringify(thread)}`);
                        }
                        items.push({ module_name: module.moduleName, page_name: thread });
                    }
                } else {
                    if (typeof page.pageName !== 'string' || !page.pageName.trim()) {
                        throw new Error(`Missing pageName at ${location}: ${JSON.stringify(page)}`);
                    }
                    items.push({ module_name: module.moduleName, page_name: page.pageName });
                }
            }
        }
    }

    const result = await prisma.permissionItem.createMany({
        data: items,
        skipDuplicates: true,
    });

    console.log(`Inserted ${result.count} of ${items.length} permission items (rest already existed).`);
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });