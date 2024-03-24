import { TaskForm } from "@/components/TaskList/TaskForm";
import { useCreateNewTaskMutation } from "@/redux/apiSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@components/ui/dialog";

import { CreateTaskDto } from "@shared/dtos";
import { X } from "lucide-react";

type TaskDialogProps = {
  onDialogChange: (open: boolean) => void;
  isOpen: boolean;
  children?: React.ReactNode;
  selectedListId: number;
};

const TaskDialog = ({
  onDialogChange,
  isOpen,
  children,
  selectedListId,
}: TaskDialogProps) => {
  const [createNewTask] = useCreateNewTaskMutation();
  function onSubmit(data: CreateTaskDto) {
    console.log(data);
    createNewTask(data);
    onDialogChange(false);
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

export default TaskDialog;
