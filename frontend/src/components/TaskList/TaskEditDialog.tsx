import { TaskForm } from "@/components/TaskList/TaskForm";
import {
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/apiSlice";
import { Dialog, DialogClose, DialogContent } from "@components/ui/dialog";

import { CreateTaskDto, TaskT } from "@shared/dtos";
import { X } from "lucide-react";
import { useState } from "react";

type TaskDialogProps = {
  onDialogChange: (open: boolean) => void;
  isOpen: boolean;
  selectedListId: number;
  isEdit?: boolean;
  onEditRequest?: () => void;
  task?: TaskT;
  onSubmit: (data: CreateTaskDto) => void;
};

const TaskDialog = ({
  onDialogChange,
  isOpen,
  isEdit,
  onEditRequest,
  selectedListId,
  task,
  onSubmit,
}: TaskDialogProps) => {
  function submit(data: CreateTaskDto) {
    onSubmit(data);
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
            <TaskForm
              onSubmit={submit}
              edit={isEdit}
              onEditRequest={onEditRequest}
              task={task}
              listId={selectedListId}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EditTaskDialog = ({
  onDialogChange,
  isOpen,
  selectedListId,
  task,
}: Omit<TaskDialogProps, "onSubmit">) => {
  const [isEdit, setIsEdit] = useState(true);
  const [update] = useUpdateTaskMutation();

  return (
    <TaskDialog
      onSubmit={(data) => update({ ...data, id: task!.id })}
      onDialogChange={(open) => {
        setIsEdit(false);
        onDialogChange(open);
      }}
      isOpen={isOpen}
      isEdit={isEdit}
      onEditRequest={() => setIsEdit(true)}
      selectedListId={selectedListId}
      task={task}
    />
  );
};

const AddTaskDialog = ({
  onDialogChange,
  isOpen,
  selectedListId,
}: Omit<TaskDialogProps, "task" | "onSubmit">) => {
  const [create] = useCreateNewTaskMutation();

  return (
    <TaskDialog
      onSubmit={create}
      onDialogChange={onDialogChange}
      isOpen={isOpen}
      isEdit={true}
      selectedListId={selectedListId}
    />
  );
};

export { EditTaskDialog, AddTaskDialog };
