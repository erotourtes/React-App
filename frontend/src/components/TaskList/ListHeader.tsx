import { EllipsisVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { PopupIcon } from "../popmenu-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { TaskListT } from "@shared/dtos";

function ListHeader({ list }: { list: TaskListT }) {
  return (
    <div className="flex justify-between border-t-2 border-b-2 py-2 px-1 border-secondary">
      <p>{list.name}</p>
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
  );
}

export default ListHeader;
