import MyDialog from "@/components/MyDialog";
import { TaskForm } from "@/components/TaskList/TaskForm";
import {
  useCreateNewTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/apiSlice";
import { CreateTaskDto, TaskT } from "@shared/dtos";
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

const EditTaskDialog = ({
  onDialogChange,
  isOpen,
  selectedListId,
  task,
  editMode = true,
}: Omit<TaskDialogProps, "onSubmit"> & { editMode: boolean }) => {
  if (!task) throw new Error("Task is required");
  const [isEdit, setIsEdit] = useState(editMode);
  const [update] = useUpdateTaskMutation();

  const dialogChange = (open: boolean) => {
    setIsEdit(false);
    onDialogChange(open);
  };

  const submit = (data: CreateTaskDto) => {
    const updatedTask = { ...data, id: task.id };
    update({ oldTask: task, updatedTask });
    onDialogChange(false);
  };

  return (
    <MyDialog isOpen={isOpen} onDialogChange={dialogChange}>
      <TaskForm
        onSubmit={submit}
        edit={isEdit}
        onEditRequest={() => setIsEdit(true)}
        task={task}
        listId={selectedListId}
      />
    </MyDialog>
  );
};

const AddTaskDialog = ({
  onDialogChange,
  isOpen,
  selectedListId,
}: Omit<TaskDialogProps, "task" | "onSubmit">) => {
  const [create] = useCreateNewTaskMutation();

  const submit = (data: CreateTaskDto) => {
    create(data);
    onDialogChange(false);
  };

  return (
    <MyDialog isOpen={isOpen} onDialogChange={onDialogChange}>
      <TaskForm onSubmit={submit} edit={true} listId={selectedListId} />
    </MyDialog>
  );
};

export { EditTaskDialog, AddTaskDialog };
