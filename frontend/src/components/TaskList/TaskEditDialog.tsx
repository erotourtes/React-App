import { TaskForm } from "@/components/TaskList/TaskForm";
import { useCreateNewTaskMutation } from "@/redux/apiSlice";
import { Dialog, DialogClose, DialogContent } from "@components/ui/dialog";

import { CreateTaskDto, TaskT } from "@shared/dtos";
import { X } from "lucide-react";

type TaskDialogProps = {
  onDialogChange: (open: boolean) => void;
  isOpen: boolean;
  selectedListId: number;
  task?: TaskT;
};

const TaskDialog = ({
  onDialogChange,
  isOpen,
  selectedListId,
  task,
}: TaskDialogProps) => {
  const [createNewTask] = useCreateNewTaskMutation();

  function onSubmit(data: CreateTaskDto) {
    console.log(data);
    createNewTask(data);
    onDialogChange(false);
  }

  return (
    <Dialog onOpenChange={onDialogChange} open={isOpen}>
      <DialogContent className="overflow-hidden p-0 border-0 min-w-[90vw] min-h-[90vh]">
        <div>
          <div className="flex h-[50px] bg-primary text-primary-foreground items-center justify-end p-3">
            <DialogClose
              asChild
              className="cursor-pointer hover:text-destructive"
            >
              <X />
            </DialogClose>
          </div>
          <div className="container">
            <TaskForm onSubmit={onSubmit} task={task} listId={selectedListId} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
