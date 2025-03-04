"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Group from "@/lib/models/fees/feeMaster/defineFeeMaster/FeeGroup.model";
import Class from "@/lib/models/fees/globalMasters/defineClassDetails/Class.model";
import { modifyAdmissionStates } from "@/lib/actions/payroll/globalMasters/admissionStates.actions";
import AdmittedStudent from "@/lib/models/admission/admission/AdmittedStudent.model";

// Create Class Props
interface CreateClassProps {
  class_name: String;
  wing_name: String;
  school: String;
  order: Number;
}
// Create Class
export const createClass = async ({
  class_name,
  wing_name,
  school,
  order,
}: CreateClassProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching classes
    const classes = await Class.find();

    // Checking if the class already exists
    const existinClass = await Class.findOne({ class_name });
    if (existinClass) {
      throw new Error("Class name already exists");
    }

    // Checking if the order already exists
    if (classes.map((c: any) => c.order).includes(order)) {
      // Affected classes
      const affectedClasses = classes.filter((c: any) => c.order >= order);
      affectedClasses.map(async (c: any) => {
        await Class.updateMany(
          { class_name: c.class_name },
          { $inc: { order: 1 } }
        );
      });

      // New class
      const newClass = await Class.create({
        class_name,
        wing_name,
        school,
        order,
        is_admission_opened: true,
      });
      newClass.save();
    } else {
      const newClass = await Class.create({
        class_name,
        wing_name,
        school,
        order,
        is_admission_opened: true,
      });
      newClass.save();
    }

    // Update last updated at date
    await modifyAdmissionStates({ property: "classes_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating class: ${err.message}`);
  }
};

// Fetch classes
export const fetchClasses = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching
    const classes = await Class.find().sort({ order: 1 });
    return classes;
  } catch (err: any) {
    throw new Error(`Error fetching classes: ${err}`);
  }
};

// Fetch classes names
export const fetchClassesNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching
    const classes = await Class.find(
      {},
      { class_name: 1, is_admission_opened: 1 }
    ).sort({ order: 1 });
    return classes;
  } catch (err: any) {
    throw new Error(`Error fetching classes: ${err}`);
  }
};

// Modify Class Props
interface ModifyClassProps {
  id: String;
  class_name: string;
  wing_name: String;
  school: String;
  order: number;
}
// Modify Class
export const modifyClass = async ({
  id,
  class_name,
  wing_name,
  school,
  order,
}: ModifyClassProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Checking if the class already exists
    const classes = await Class.find();
    const existingClass = await Class.findById(id);
    if (
      existingClass.class_name !== class_name &&
      classes.map((item) => item.class_name).includes(class_name)
    ) {
      throw new Error("Class name already exists");
    }

    // Class to be updated
    const updateClass = await Class.findById(id);

    // Checking if the order already exists
    if (updateClass.order !== order) {
      if (order > updateClass.order) {
        const affectedClasses = classes.filter(
          (c: any) => c.order > updateClass.order && c.order <= order
        );
        affectedClasses.map(async (c: any) => {
          await Class.updateMany(
            { class_name: c.class_name },
            { $inc: { order: -1 } }
          );
        });
      } else {
        const affectedClasses = classes.filter(
          (c: any) => c.order >= order && c.order < updateClass.order
        );
        affectedClasses.map(async (c: any) => {
          await Class.updateMany(
            { class_name: c.class_name },
            { $inc: { order: 1 } }
          );
        });
      }

      // Updating class
      await Class.findByIdAndUpdate(
        id,
        {
          class_name,
          wing_name,
          school,
          order,
          affiliated_heads: { group_name: "", heads: [] },
        },
        { new: true }
      );
    } else {
      await Class.findByIdAndUpdate(
        id,
        {
          class_name,
          wing_name,
          school,
          order,
          affiliated_heads: { group_name: "", heads: [] },
        },
        { new: true }
      );
    }

    // Update last updated at date
    await modifyAdmissionStates({ property: "classes_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating class: ${err}`);
  }
};

// Modify Class Sections Props
interface ModifyClassSectionsProps {
  class_name: String;
  sections: string[];
}
// Modify Class Sections
export const modifyClassSections = async ({
  class_name,
  sections,
}: ModifyClassSectionsProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Updating class
    await Class.findOneAndUpdate({ class_name }, { sections }, { new: true });

    // Update last updated at date
    await modifyAdmissionStates({ property: "classes_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating class sections: ${err}`);
  }
};

// Fetch class by class name
export const fetchClass = async ({ class_name }: { class_name: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching class
    const c = await Class.findOne({ class_name });
    const classRes = {
      ...c._doc,
      _id: c._doc._id.toString(),
    };

    // Return
    return classRes;
  } catch (err) {
    throw new Error(`Error updating class sections: ${err}`);
  }
};

// Delete class
export const deleteClass = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Classes
    const classes = await Class.find();

    // Class to be deleted
    const deleteClass = await Class.findById(id);

    // Altering "order" value in the other classes
    if (classes.filter((c: any) => c.order > deleteClass.order).length > 0) {
      const affectedClasses = classes.filter(
        (c: any) => c.order > deleteClass.order
      );
      affectedClasses.map(async (c: any) => {
        await Class.updateMany(
          { class_name: c.class_name },
          { $inc: { order: -1 } }
        );
      });
      await Class.findByIdAndDelete(id);
    } else {
      await Class.findByIdAndDelete(id);
    }

    // Update last updated at date
    await modifyAdmissionStates({ property: "classes_last_updated_at" });

    // Return
    return "Class Deleted";
  } catch (err) {
    throw new Error(`Error deleting class: ${err}`);
  }
};

// Modify class heads props
interface ModifyClassHeadsProps {
  group_name: String;
  installment: String;
  classes: any;
  group_type: String;
}
// Modify Class heads
export const modifyClassHeads = async ({
  group_name,
  installment,
  classes,
  group_type,
}: ModifyClassHeadsProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    if (installment === "All installments") {
      // Fetching
      const group = await Group.findOne({ name: group_name });
      const selectedHeads = group.affiliated_heads.filter(
        (head: any) => head.fee_type === "regular"
      );
      classes.map(async (c: any) => {
        try {
          const theClass = await Class.findOne({ class_name: c });
          if (
            theClass?.affiliated_heads?.group_name !== group_name ||
            theClass?.affiliated_special_heads?.group_name !== group_name
          ) {
            if (group_type === "Special") {
              await Class.updateMany(
                { class_name: c },
                {
                  affiliated_special_heads: {
                    group_name: group_name,
                    heads: selectedHeads,
                  },
                }
              );
            } else {
              await Class.updateMany(
                { class_name: c },
                {
                  affiliated_heads: {
                    group_name: group_name,
                    heads: selectedHeads,
                  },
                }
              );
            }
          }
        } catch (err: any) {
          console.log(err);
        }
      });
    } else {
      const group = await Group.findOne({ name: group_name });
      const selectedHeads = group.affiliated_heads.filter(
        (head: any) =>
          (head.installment === installment && head.fee_type === "regular") ||
          (head.installment === "All installments" &&
            head.fee_type === "regular")
      );
      classes.map(async (c: any) => {
        try {
          const theClass = await Class.findOne({ class_name: c });
          if (
            theClass?.affiliated_heads?.group_name !== group_name ||
            theClass?.affiliated_special_heads?.group_name !== group_name
          ) {
            if (group_type === "Special") {
              await Class.updateMany(
                { class_name: c },
                {
                  affiliated_special_heads: {
                    group_name: group_name,
                    heads: selectedHeads,
                  },
                }
              );
            } else {
              // await Class.updateMany({class_name:c}, {affiliated_heads:{group_name:theClass?.affiliated_heads?.group_name ? `${theClass?.affiliated_heads?.group_name} (${group_name})` : group_name, heads:theClass?.affiliated_heads?.heads?.length > 0 ? theClass?.affiliated_heads?.heads?.concat(selectedHeads) : selectedHeads}});
              await Class.updateMany(
                { class_name: c },
                {
                  affiliated_heads: {
                    group_name: group_name,
                    heads: selectedHeads,
                  },
                }
              );
            }
          }
        } catch (err: any) {
          console.log(err);
        }
      });
    }

    // Update last updated at date
    await modifyAdmissionStates({ property: "classes_last_updated_at" });

    return "Modified";
  } catch (err) {
    throw new Error(`Error updating class heads: ${err}`);
  }
};

// Fetch open admission classes names
export const fetchOpenAdmissionClassesNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching
    const classes = await Class.find(
      { is_admission_opened: true },
      { class_name: 1 }
    ).sort({ order: 1 });
    return classes;
  } catch (err: any) {
    throw new Error(`Error fetching classes: ${err}`);
  }
};

// Update classes admission states
export const updateClassesAdmissionStates = async ({
  classes_states,
}: {
  classes_states: any;
}) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching
    classes_states.map(async (c: any) => {
      await Class.findOneAndUpdate(
        { class_name: c.class_name },
        { is_admission_opened: c.is_admission_opened }
      );
    });

    // Update last updated at date
    await modifyAdmissionStates({ property: "classes_last_updated_at" });

    // Return
    return "Classes asmission states updated";
  } catch (err: any) {
    throw new Error(`Error updating classes admission states: ${err}`);
  }
};

// Modify class fee data
export const modifyClassFeeData = async ({
  class_name,
  group_name,
  affiliated_heads,
  affiliated_special_heads,
}) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Class
    const theClass = await Class.findOne({ class_name });

    // Students
    const students = await AdmittedStudent.find({
      "student.class": class_name,
    });

    // Modifying class
    if (affiliated_heads !== "" && affiliated_special_heads !== "") {
      await Class.findOneAndUpdate(
        { class_name },
        { affiliated_heads, affiliated_special_heads }
      );
    }
    if (affiliated_heads !== "") {
      if (students?.length > 0) {
        students?.map(async (s: any) => {
          await AdmittedStudent.findOneAndUpdate(
            { "student.name": s?.student?.name },
            {
              affiliated_heads: {
                group_name: s?.affiliated_heads?.group_name
                  ?.replace(group_name, "")
                  ?.trim(),
                heads: s?.affiliated_heads?.heads?.filter(
                  (h: any) =>
                    !theClass?.affiliated_heads?.heads
                      ?.map((ch: any) => ch.head_name)
                      .includes(h.head_name)
                ),
              },
            }
          );
        });
      }
      await Class.findOneAndUpdate({ class_name }, { affiliated_heads });
    }
    if (affiliated_special_heads !== "") {
      if (students?.length > 0) {
        students?.map(async (s: any) => {
          await AdmittedStudent.findOneAndUpdate(
            { "student.name": s?.student?.name },
            {
              affiliated_heads: {
                group_name: s?.affiliated_heads?.group_name
                  ?.replace(`(${group_name})`, "")
                  ?.trim(),
                heads: s?.affiliated_heads?.heads?.filter(
                  (h: any) =>
                    !theClass?.affiliated_special_heads?.heads
                      ?.map((ch: any) => ch.head_name)
                      .includes(h.head_name)
                ),
              },
            }
          );
        });
      }
      await Class.findOneAndUpdate(
        { class_name },
        { affiliated_special_heads }
      );
    }

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating class: ${err}`);
  }
};
