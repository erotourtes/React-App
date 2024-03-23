import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  EllipsisVertical,
  Pencil,
  X,
  FileBarChart2,
  Calendar,
  BarChart,
  Trash2,
  Badge,
} from "lucide-react";
import { useState } from "react";
import { PopupIcon } from "../popmenu-utils";
import { H3 } from "../typography";
import { Card, CardHeader, CardContent } from "../ui/card";

function TaskCard() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Card>
      <CardHeader className="p-3 flex-row justify-between">
        Task 1
        <DropdownMenu onOpenChange={setOpenMenu} open={openMenu}>
          <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground rounded-sm">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Dialog
                onOpenChange={(open) => {
                  if (!open) setOpenMenu(false);
                  setOpenDialog(open);
                }}
                open={openDialog}
              >
                <DialogTrigger className="w-full flex">
                  <PopupIcon icon={<Pencil />} />
                  Edit
                </DialogTrigger>
                <DialogContent className="overflow-hidden p-0 border-0 min-w-[90vw] min-h-[90vh]">
                  <div>
                    <div className="flex h-[50px] bg-primary text-primary-foreground items-center justify-end p-3">
                      <DialogClose
                        asChild
                        className="hover:text-primary hover:bg-primary-foreground rounded-full cursor-pointer"
                      >
                        <X />
                      </DialogClose>
                    </div>

                    <div className="flex h-full">
                      <div className="p-10 flex-[4]">
                        <H3>Task Name</H3>
                        <div className="flex pt-3">
                          <div className="flex w-1/5 text-secondary-foreground opacity-grayish gap-3">
                            <FileBarChart2 /> Status
                          </div>
                          In progress
                        </div>

                        <div className="flex pt-3">
                          <div className="flex w-1/5 text-secondary-foreground opacity-grayish gap-3">
                            <Calendar /> Due date
                          </div>
                          2022-12-31
                        </div>

                        <div className="flex pt-3">
                          <div className="flex w-1/5 text-secondary-foreground opacity-grayish gap-3">
                            <BarChart /> Priority
                          </div>
                          Low
                        </div>
                        <H3 className="mt-10">Description</H3>
                      </div>
                      <div className="p-10 flex-[2] bg-secondary text-secondary-foreground">
                        <H3>Activity</H3>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem className="des-btn focus:des-btn-rev">
              <PopupIcon icon={<Trash2 />} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-3 flex flex-col gap-y-3">
        <p className="text-[0.9rem] opacity-grayish">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex gap-3">
          <Calendar />
          <span className="opacity-grayish">Wed, 19 Apr</span>
        </div>
        <div>
          <Badge className="px-3 py-2">Badge</Badge>
        </div>
        <Select>
          <SelectTrigger className="w-full bg-secondary">
            <SelectValue placeholder="Move to:" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
