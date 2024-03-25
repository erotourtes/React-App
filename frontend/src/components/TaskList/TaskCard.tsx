import { TaskListT, TaskT } from "@shared/dtos";
import {
  Calendar,
  EllipsisVertical,
  FileBarChart,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  useDeleteTaskMutation,
  useGetAllTaskListsQuery,
} from "../../redux/apiSlice";
import { PopupIcon } from "../popmenu-utils";
import Priority from "../Priority";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EditTaskDialog } from "./TaskEditDialog";
import { strDateFormat } from "@/utils/utils";

function TaskCard({
  task,
  list: selectedList,
}: {
  task: TaskT;
  list: TaskListT;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const { data: taskList = [] } = useGetAllTaskListsQuery();
  const [deleteTask] = useDeleteTaskMutation();

  const onEditPressed = (e: Event) => {
    e.preventDefault();
    setOpenDialog(true);
    setOpenMenu(false);
    setEditMode(true);
  };

  const onCardPressed = () => {
    setOpenDialog(true);
    setOpenMenu(false);
    setEditMode(false);
  };

  return (
    <Card className="hover:border-primary">
      <CardHeader
        onClick={onCardPressed}
        className="p-3 pb-1 flex-row justify-between"
      >
        {task.name}
        <DropdownMenu onOpenChange={setOpenMenu} open={openMenu}>
          <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground rounded-sm">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onEditPressed}>
              <PopupIcon icon={<Pencil />} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteTask(task.id)}
              className="des-btn focus:des-btn-rev"
            >
              <PopupIcon icon={<Trash2 />} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent
        onClick={onCardPressed}
        className="p-3 pt-0 flex flex-col gap-y-3"
      >
        <p className="text-[0.9rem] opacity-grayish text-ellipsis overflow-hidden line-clamp-1">
          {task.description}
        </p>
        <div className="flex gap-3">
          <FileBarChart />
          {selectedList.name}
        </div>
        <div className="flex gap-3">
          <Calendar />
          <span className="opacity-grayish">{strDateFormat(task.dueDate)}</span>
        </div>
        <div>
          <Priority priority={task.priority} />
        </div>
        <Select>
          <SelectTrigger className="w-full bg-secondary">
            <SelectValue placeholder="Move to:" />
          </SelectTrigger>
          <SelectContent>
            {taskList.map((list) => (
              <SelectItem
                disabled={list.id == selectedList.id}
                key={list.id}
                value={list.id.toString()}
              >
                {list.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      {openDialog && (
        <EditTaskDialog
          isOpen={openDialog}
          onDialogChange={(open) => setOpenDialog(open)}
          task={task}
          selectedListId={selectedList.id}
          editMode={editMode}
        />
      )}
    </Card>
  );
}

export default TaskCard;
