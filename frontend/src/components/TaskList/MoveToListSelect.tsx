import { useGetAllTaskListsQuery } from "@/redux/apiSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { isValidIdFor } from "@/utils/utils";

const MoveToListSelect = ({
  selectedListId,
  onSelect,
  className,
  placeholder,
}: {
  selectedListId: number;
  onSelect: (id: number) => void;
  className?: string;
  placeholder?: string;
}) => {
  const { data: taskList = [] } = useGetAllTaskListsQuery();
  return (
    <Select onValueChange={(val) => onSelect(+val)}>
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder={placeholder || "Move to:"} />
      </SelectTrigger>
      <SelectContent>
        {taskList.map((list) => (
          <SelectItem
            disabled={
              list.id == selectedListId || !isValidIdFor({ id: list.id })
            }
            key={list.id}
            value={list.id.toString()}
          >
            {list.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MoveToListSelect;
