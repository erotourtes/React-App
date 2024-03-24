import { cn } from "@/lib/utils";
import { strDateFormat } from "@/utils/utils";
import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { CreateTaskDto, TaskPriority, TaskT } from "@shared/dtos";
import { BarChart, CalendarIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type CardDialogProps = {
  onDialogChange: (open: boolean) => void;
  isOpen: boolean;
  children?: React.ReactNode;
  task: TaskT;
};

const CardDialog = ({ onDialogChange, isOpen, children }: CardDialogProps) => {
  return (
    <Dialog onOpenChange={onDialogChange} open={isOpen}>
      {children && (
        <DialogTrigger className="w-full flex">{children}</DialogTrigger>
      )}
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
          <div className="container">
            <CalendarForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function CalendarForm() {
  const form = useForm<CreateTaskDto>({
    resolver: classValidatorResolver(CreateTaskDto),
    defaultValues: {
      description: "",
    },
  });

  console.log(form.formState.errors);

  function onSubmit(data: CreateTaskDto) {
    alert(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="pt-5">
              <Input
                className="text-2xl font-semibold tracking-tight pl-0"
                placeholder="Name"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex items-baseline">
              <FormLabel className="flex gap-3 min-w-[150px] max-w-[150px]">
                <CalendarIcon className="h-4 w-4 opacity-50" />
                Due date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        strDateFormat(field.value)
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value || "")}
                    onSelect={(event) => field.onChange(event?.toISOString())}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="flex gap-3 max-w-[150px] min-w-[150px] items-center">
                <BarChart />
                Priority
              </FormLabel>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(TaskPriority).map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority.toLocaleLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="pt-5">
              <FormLabel className="text-2xl font-semibold tracking-tight">
                Description
              </FormLabel>
              <Textarea placeholder="Description" {...field} rows={3} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// interface CardEditDialogProps {
//   onDialogChange: (open: boolean) => void;
//   isOpen: boolean;
//   task: TaskT;
//   children?: React.ReactNode;
// }

// const TaskEditDialog = ({
//   onDialogChange,
//   isOpen,
//   task,
//   children,
// }: CardEditDialogProps) => {
//   return (
//     <Dialog onOpenChange={onDialogChange} open={isOpen}>
//       {children && (
//         <DialogTrigger className="w-full flex">{children}</DialogTrigger>
//       )}
//       <DialogContent className="overflow-hidden p-0 border-0 min-w-[90vw] min-h-[90vh]">
//         <div>
//           <div className="flex h-[50px] bg-primary text-primary-foreground items-center justify-end p-3">
//             <DialogClose
//               asChild
//               className="hover:text-primary hover:bg-primary-foreground rounded-full cursor-pointer"
//             >
//               <X />
//             </DialogClose>
//           </div>

//           <div className="flex h-full">
//             <div className="p-10 flex-[4]">
//               <H3>{task.name}</H3>
//               <div className="flex pt-3">
//                 <div className="flex w-1/5 text-secondary-foreground opacity-grayish gap-3">
//                   <FileBarChart2 /> Status
//                 </div>
//                 TODO
//               </div>

//               <div className="flex pt-3">
//                 <div className="flex w-1/5 text-secondary-foreground opacity-grayish gap-3">
//                   <Calendar /> Due date
//                 </div>
//                 {strDateFormat(task.dueDate)}
//               </div>

//               <div className="flex pt-3">
//                 <div className="flex w-1/5 text-secondary-foreground opacity-grayish gap-3">
//                   <BarChart /> Priority
//                 </div>
//                 {task.priority}
//               </div>
//               <H3 className="mt-10">{task.description}</H3>
//             </div>
//             <div className="p-10 flex-[2] bg-secondary text-secondary-foreground">
//               <H3>Activity</H3>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

export default CardDialog;
