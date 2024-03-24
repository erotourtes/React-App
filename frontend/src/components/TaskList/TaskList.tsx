import { Button } from "@components/ui/button";
import TaskCard from "./TaskCard";
import { TaskListT } from "@shared/dtos";
import ListHeader from "./ListHeader";
import { Plus } from "lucide-react";
import {
  useGetAllTaskListsQuery,
  useGetTasksForListQuery,
} from "@redux/apiSlice";
import AddTaskBtn from "@/components/TaskList/AddTaskBtn";

function TaskList() {
  const { data: lists = [] } = useGetAllTaskListsQuery();

  return (
    <div className="flex gap-10">
      {lists.map((list) => (
        <ListColumn key={list.id} list={list} />
      ))}
    </div>
  );
}

function ListColumn({ list }: { list: TaskListT }) {
  const { data: tasks = [] } = useGetTasksForListQuery(list.id);

  return (
    <div className="w-[250px] space-y-3">
      <ListHeader list={list} />
      <AddTaskBtn listId={list.id} />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
