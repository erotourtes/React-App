import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { EllipsisVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { PopupIcon } from "../popmenu-utils";
import { Button } from "../ui/button";
import TaskCard from "./TaskCard";

function TaskList() {
  return (
    <div className="w-[250px] space-y-3">
      <div className="flex justify-between border-t-2 border-b-2 py-2 px-1 border-secondary">
        <p>To Do</p>
        <div className="flex gap-4">
          <p>45</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground rounded-sm">
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <PopupIcon icon={<Pencil />} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PopupIcon icon={<Plus />} />
                Add new card
              </DropdownMenuItem>
              <DropdownMenuItem className="des-btn focus:des-btn-rev">
                <PopupIcon icon={<Trash2 />} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Button variant="outline" className="w-full gap-2 border-dashed border-2">
        <Plus />
        Add new card
      </Button>
      <TaskCard />
    </div>
  );
}

export default TaskList;
