import MyDialog from "@/components/MyDialog";
import { TaskForm } from "@/components/TaskList/TaskForm";
import { H3 } from "@/components/typography";
import {
  useCreateNewTaskMutation,
  useGetHistoryForTaskQuery,
  useUpdateTaskMutation,
} from "@/redux/apiSlice";
import { CreateTaskDto, TaskT } from "@shared/dtos";
import { useState } from "react";
import HistoryList from "@components/HistoryList";

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
  const { data: historyList = [] } = useGetHistoryForTaskQuery(task.id);

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
      <div className="flex h-full">
        <div className="w-3/5 p-5">
          <TaskForm
            onSubmit={submit}
            edit={isEdit}
            onEditRequest={() => setIsEdit(true)}
            task={task}
            listId={selectedListId}
          />
        </div>
        <div className="p-5 bg-secondary h-full w-2/5">
          <H3>Task Action</H3>
          <HistoryList history={historyList} />
        </div>
      </div>
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
    <MyDialog className="p-5" isOpen={isOpen} onDialogChange={onDialogChange}>
      <TaskForm onSubmit={submit} edit={true} listId={selectedListId} />
    </MyDialog>
  );
};

export { EditTaskDialog, AddTaskDialog };
