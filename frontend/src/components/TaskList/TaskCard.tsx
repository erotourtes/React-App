import { TaskT } from "@shared/dtos";
import { Calendar, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
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
import TaskEditDialog from "./TaskEditDialog";
import { strDateFormat } from "@/utils/utils";

function TaskCard({ task }: { task: TaskT }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { data: taskList = [] } = useGetAllTaskListsQuery();
  const [deleteTask] = useDeleteTaskMutation();

  return (
    <Card>
      <CardHeader className="p-3 pb-1 flex-row justify-between">
        {task.name}
        <DropdownMenu onOpenChange={setOpenMenu} open={openMenu}>
          <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground rounded-sm">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <TaskEditDialog
                isOpen={openDialog}
                onDialogChange={(open) => {
                  if (!open) setOpenMenu(false);
                  setOpenDialog(open);
                }}
                task={task}
              >
                <PopupIcon icon={<Pencil />} />
                Edit
              </TaskEditDialog>
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
      <CardContent className="p-3 pt-0 flex flex-col gap-y-3">
        <p className="text-[0.9rem] opacity-grayish">{task.description}</p>
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
              <SelectItem key={list.id} value={list.id.toString()}>
                {list.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

export default TaskCard;