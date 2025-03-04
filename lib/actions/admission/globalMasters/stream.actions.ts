"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Stream from "@/lib/models/admission/globalMasters/Stream.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create stream props
interface CreateStreamProps {
  stream_name: String;
}
// Create stream
export const createStream = async ({ stream_name }: CreateStreamProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the stream already exists
    const existinStream = await Stream.findOne({
      stream_name,
      session: activeSession?.year_name,
    });
    if (existinStream) {
      throw new Error("Stream already exists");
    }

    // Creating new stream
    const newStream = await Stream.create({
      session: activeSession?.year_name,
      stream_name,
    });
    newStream.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "streams_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating stream: ${err.message}`);
  }
};

// Fetch streams
export const fetchStreams = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const streams = await Stream.find({ session: activeSession?.year_name });
    return streams;
  } catch (err: any) {
    throw new Error(`Error fetching streams: ${err}`);
  }
};

// Fetch streams names
export const fetchStreamsNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const streams = await Stream.find(
      { session: activeSession?.year_name },
      { stream_name: 1 }
    );
    return streams;
  } catch (err: any) {
    throw new Error(`Error fetching streams: ${err}`);
  }
};

// Modify stream props
interface ModifyStreamProps {
  id: String;
  stream_name: string;
}
// Modify stream
export const modifyStream = async ({ id, stream_name }: ModifyStreamProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the stream already exists
    const streams = await Stream.find({ session: activeSession?.year_name });
    const existingStream = await Stream.findById(id);
    if (
      existingStream.stream_name !== stream_name &&
      streams.map((s) => s.stream_name).includes(stream_name)
    ) {
      throw new Error("Stream already exists");
    }

    // Updating stream
    await Stream.findByIdAndUpdate(id, { stream_name }, { new: true });

    // Update last updated at date
    await modifyAdmissionStates({ property: "streams_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating stream: ${err}`);
  }
};

// Delete stream
export const deleteStream = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting stream
    await Stream.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "streams_last_updated_at" });

    // Return
    return "Stream deleted";
  } catch (err) {
    throw new Error(`Error deleting stream: ${err}`);
  }
};
