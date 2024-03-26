import AddTaskBtn from "@/components/TaskList/AddTaskBtn";
import {
  useGetAllTaskListsQuery,
  useGetTasksForListQuery,
} from "@redux/apiSlice";
import { TaskListT } from "@shared/dtos";
import ListHeader from "./ListHeader";
import TaskCard from "./TaskCard";
import { isValidIdFor } from "@/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";

function TaskList() {
  const { data: lists = [] } = useGetAllTaskListsQuery();

  return (
    <div className="flex gap-10 flex-wrap md:flex-nowrap md:overflow-x-auto pb-5">
      {lists.map((list) => (
        <ListColumn key={list.id} list={list} />
      ))}
    </div>
  );
}

function ListColumn({ list }: { list: TaskListT }) {
  const { data: tasks = [] } = useGetTasksForListQuery(list.id);

  if (!isValidIdFor(list)) {
    return (
      <div className="min-w-[250px] h-[44px] flex justify-between border-t-2 border-b-2 py-2 px-1 border-secondary">
        <p>{list.name}</p>
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
    );
  }

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
