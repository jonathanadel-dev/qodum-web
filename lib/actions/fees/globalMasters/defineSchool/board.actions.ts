"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Board from "@/lib/models/fees/globalMasters/defineSchool/Board.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "@/lib/actions/payroll/globalMasters/admissionStates.actions";

// Create board Props
interface CreateBoardProps {
  board: String;
  is_default: Boolean;
}
// Create board
export const createBoard = async ({ board, is_default }: CreateBoardProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the board already exists
    const existinBoard = await Board.findOne({
      board,
      session: activeSession?.year_name,
    });
    if (existinBoard) {
      throw new Error("Board already exists");
    }

    // Creating new board
    const newBoard = await Board.create({
      session: activeSession?.year_name,
      board,
      is_default,
    });

    // Checking if the board is default and setting all the other records to false if so
    if (is_default === true) {
      newBoard.save();
      await Board.updateMany(
        { _id: { $ne: newBoard._id }, session: activeSession?.year_name },
        { is_default: false }
      );
    } else {
      newBoard.save();
    }

    // Update last updated at date
    await modifyAdmissionStates({ property: "boards_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating board: ${err.message}`);
  }
};

// Fetch boards
export const fetchBoards = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const boards = await Board.find({ session: activeSession?.year_name });
    return boards;
  } catch (err: any) {
    throw new Error(`Error fetching boards: ${err}`);
  }
};

// Modify board Props
interface ModifyBoardProps {
  id: String;
  board: string;
  is_default: Boolean;
}
// Modify board
export const modifyBoard = async ({
  id,
  board,
  is_default,
}: ModifyBoardProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the board already exists
    const boards = await Board.find({ session: activeSession?.year_name });
    const existingBoard = await Board.findById(id);
    if (
      existingBoard.board !== board &&
      boards.map((board) => board.board).includes(board)
    ) {
      throw new Error("Board already exists");
    }

    if (is_default === true) {
      // Update Board
      await Board.findByIdAndUpdate(
        id,
        { board, is_default },
        { new: true }
      ).then(async () => {
        try {
          await Board.updateMany(
            { _id: { $ne: id }, session: activeSession?.year_name },
            { is_default: false }
          );
        } catch (err: any) {
          console.log(`Error updating other boards: ${err.message}`);
        }
      });
      // Update last updated at date
      await modifyAdmissionStates({ property: "boards_last_updated_at" });
      return "Updated";
    } else {
      // Update board with setting other board is defailt to false
      await Board.findByIdAndUpdate(id, { board, is_default }, { new: true });
      // Update last updated at date
      await modifyAdmissionStates({ property: "boards_last_updated_at" });
      return "Updated";
    }
  } catch (err) {
    throw new Error(`Error updating board: ${err}`);
  }
};

// Delete board
export const deleteBoard = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting board
    await Board.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "boards_last_updated_at" });

    // Return
    return "Board Deleted";
  } catch (err) {
    throw new Error(`Error deleting board: ${err}`);
  }
};
