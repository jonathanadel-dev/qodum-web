/* eslint-disable react/jsx-key */
// Imports
import Draggable from "react-draggable";
import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import {
  fetchAccountGroups,
  groupsSesssionTransfer,
} from "@/lib/actions/accounts/accounts/accountGroup.actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Main function
const DefineGroup = ({
  currentSession,
  nextSession,
  showDraggables,
  setShowDraggables,
  state,
  setState,
}: any) => {
  // Toast
  const { toast } = useToast();

  // Groups
  const [groups, setGroups] = useState([{}]);

  // Transer handler
  const transerHandler = async () => {
    try {
      await groupsSesssionTransfer({ next_session: nextSession });
      setState({ ...state, isTransfered: true });
      setShowDraggables(
        showDraggables.filter((d: any) => d !== "Define Group")
      );
      toast({ title: "Process completed successfully" });
    } catch (err) {
      console.log(err);
    }
  };

  // Skip handler
  const skipHandler = () => {
    setShowDraggables(showDraggables.filter((d: any) => d !== "Define Group"));
    toast({ title: "Process completed successfully" });
  };

  // Use effect
  useEffect(() => {
    const fetcher = async () => {
      const groupsRes = await fetchAccountGroups();
      setGroups(groupsRes);
    };
    fetcher();
  }, []);

  return (
    <Draggable>
      <div className="absolute w-[90%] h-[90%] flex flex-col items-center justify-between gap-6 pb-10 border-[0.5px] border-[#ccc] rounded-[4px] bg-[#fff]">
        <div className="w-full flex flex-col items-center gap-4">
          {/* Header */}
          <div className="flex flex-row items-center justify-center w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[4px]">
            <h2>Define Group {currentSession}</h2>
          </div>

          {/* Values */}
          <div className="w-[90%] flex flex-col h-[70%] overflow-scroll custom-sidebar-scrollbar border-[0.5px] border-[#ccc]">
            {/* Headers */}
            <ul className="w-full min-w-[600px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md">
              <li className="basis-[50%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]">
                Sr. No.
                <ChevronsUpDown size={12} />
              </li>
              <li className="basis-[50%] flex flex-row items-center justify-between px-2">
                Group Name
                <ChevronsUpDown size={12} />
              </li>
            </ul>
            {/* Values */}
            <div>
              {groups.map((g: any) => (
                <ul className="w-full min-w-[600px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md">
                  <li className="basis-[50%] flex flex-row items-center justify-center px-2 py-[2px] border-r-[0.5px] border-[#ccc]">
                    {groups.indexOf(g) + 1}
                  </li>
                  <li className="basis-[50%] flex flex-row items-center justify-center px-2">
                    {g.group_name}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger
              className="flex items-center justify-center px-8 h-8 text-md text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color"
            >
              Transfer
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to transfer groups from session{" "}
                  {currentSession} to {nextSession}
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction>
                  <Button
                    className="border-[0.5px] border-black"
                    onClick={transerHandler}
                  >
                    Yes
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <span
            onClick={skipHandler}
            className="flex items-center justify-center px-8 h-8 text-md text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color"
          >
            Skip
          </span>
        </div>
      </div>
    </Draggable>
  );
};

// Export
export default DefineGroup;
