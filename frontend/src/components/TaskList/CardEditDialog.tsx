import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@components/ui/dialog";
import { BarChart, Calendar, FileBarChart2, Pencil, X } from "lucide-react";
import { PopupIcon } from "../popmenu-utils";
import { H3 } from "../typography";
import { TaskT } from "@shared/dtos";
import { strDateFormat } from "@/utils/utils";

interface CardEditDialogProps {
  onDialogChange: (open: boolean) => void;
  isOpen: boolean;
  task: TaskT;
  children?: React.ReactNode;
}

const CardEditDialog = ({
  onDialogChange,
  isOpen,
  task,
  children,
}: CardEditDialogProps) => {
  return (
    <Dialog onOpenChange={onDialogChange} open={isOpen}>
      {children && (
        <DialogTrigger className="w-full flex">{children}</DialogTrigger>
      )}
      <DialogContent className="overflow-hidden p-0 border-0 min-w-[90vw] min-h-[90vh]">
        <div>
          <div className="flex h-[50px] bg-primary text-primary-foreground items-center justify-end p-3">
            <DialogClose
              asChild
              className="hover:text-primary hover:bg-primary-foreground rounded-full cursor-pointer"
            >
              <X />
            </DialogClose>
          </div>

          <div className="flex h-full">
            <div className="p-10 flex-[4]">
              <H3>{task.name}</H3>
              <div className="flex pt-3">
                <div className="flex w-1/5 text-secondary-foreground opacity-grayish gap-3">
                  <FileBarChart2 /> Status
                </div>
                TODO
              </div>

              <div className="flex pt-3">
                <div className="flex w-1/5 text-secondary-foreground opacity-grayish gap-3">
                  <Calendar /> Due date
                </div>
                {strDateFormat(task.dueDate)}
              </div>

              <div className="flex pt-3">
                <div className="flex w-1/5 text-secondary-foreground opacity-grayish gap-3">
                  <BarChart /> Priority
                </div>
                {task.priority}
              </div>
              <H3 className="mt-10">{task.description}</H3>
            </div>
            <div className="p-10 flex-[2] bg-secondary text-secondary-foreground">
              <H3>Activity</H3>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardEditDialog;
