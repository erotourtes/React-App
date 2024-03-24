import { TaskForm } from "@/components/TaskList/TaskForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@components/ui/dialog";

import { CreateTaskDto, TaskT } from "@shared/dtos";
import { X } from "lucide-react";

type CardDialogProps = {
  onDialogChange: (open: boolean) => void;
  isOpen: boolean;
  children?: React.ReactNode;
  task: TaskT;
  selectedListId: number;
};

const CardDialog = ({
  onDialogChange,
  isOpen,
  children,
  selectedListId,
}: CardDialogProps) => {
  function onSubmit(data: CreateTaskDto) {
    alert(data);
  }
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
          <div className="container">
            <TaskForm onSubmit={onSubmit} listId={selectedListId} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
