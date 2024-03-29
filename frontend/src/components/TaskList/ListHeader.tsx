import { EllipsisVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { PopupIcon } from "../popmenu-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import EditListDialog from "@/components/TaskList/EditListDialog";
import { AddTaskDialog } from "@/components/TaskList/TaskEditDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TaskListT } from "@shared/dtos";
import { useCallback, useState } from "react";
import {
  useDeleteNewListMutation,
  useUpdateNewListMutation,
} from "@/redux/api/hooks";

function ListHeader({
  list,
  taskCount,
  disabled,
}: {
  list: TaskListT;
  taskCount: number;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteListApi] = useDeleteNewListMutation();
  const [updateListApi] = useUpdateNewListMutation();

  const deleteList = useCallback(() => {
    deleteListApi(list.id);
  }, [list.id, deleteListApi]);

  const updateList = useCallback(
    (name: string) => {
      updateListApi({ id: list.id, name });
    },
    [list.id, updateListApi]
  );

  return (
    <div className="flex justify-between border-t-2 border-b-2 py-2 px-1 border-secondary">
      <p>{list.name}</p>
      <div className="flex gap-4">
        <p>{taskCount}</p>
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={disabled}
            className="hover:bg-accent hover:text-accent-foreground rounded-sm"
          >
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setEditDialog(true)}>
              <PopupIcon icon={<Pencil />} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <PopupIcon icon={<Plus />} />
              Add new card
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="des-btn focus:des-btn-rev"
            >
              <DeleteBtn onConfirm={deleteList} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {open && (
        <AddTaskDialog
          isOpen={open}
          onDialogChange={setOpen}
          selectedListId={list.id}
        />
      )}
      {editDialog && (
        <EditListDialog
          open={editDialog}
          onDialogChange={setEditDialog}
          list={list}
          onSubmit={updateList}
        />
      )}
    </div>
  );
}

const DeleteBtn = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full">
        <PopupIcon icon={<Trash2 />} />
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the list
            as well as ALL your tasks in it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ListHeader;
