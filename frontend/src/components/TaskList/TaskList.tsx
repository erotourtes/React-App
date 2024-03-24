import AddTaskBtn from "@/components/TaskList/AddTaskBtn";
import {
  useGetAllTaskListsQuery,
  useGetTasksForListQuery,
} from "@redux/apiSlice";
import { TaskListT } from "@shared/dtos";
import ListHeader from "./ListHeader";
import TaskCard from "./TaskCard";

function TaskList() {
  const { data: lists = [] } = useGetAllTaskListsQuery();

  return (
    <div className="flex gap-10 flex-wrap md:flex-nowrap md:overflow-x-scroll">
      {lists.map((list) => (
        <ListColumn key={list.id} list={list} />
      ))}
    </div>
  );
}

function ListColumn({ list }: { list: TaskListT }) {
  const { data: tasks = [] } = useGetTasksForListQuery(list.id);

  return (
    <div className="min-w-[250px] space-y-3">
      <ListHeader list={list} taskCount={tasks.length} />
      <AddTaskBtn list={list} />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} list={list} />
      ))}
    </div>
  );
}

export default TaskList;
