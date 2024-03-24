import TaskEditDialog from "@/components/TaskList/TaskEditDialog";
import { Button } from "@/components/ui/button";
import { TaskListT, TaskPriority } from "@shared/dtos";
import { Plus } from "lucide-react";
import { useState } from "react";

const AddTaskBtn = ({ list }: { list: TaskListT }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="w-full gap-2 border-dashed border-2"
      >
        <Plus />
        Add new card
      </Button>
      <TaskEditDialog
        isOpen={open}
        onDialogChange={setOpen}
        task={{
          id: 0,
          description: "",
          dueDate: "",
          name: "",
          priority: TaskPriority.LOW,
        }}
      />
    </>
  );
};

export default AddTaskBtn;
