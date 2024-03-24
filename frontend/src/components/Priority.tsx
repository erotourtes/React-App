import { TaskPriority } from "@shared/dtos";
import { Badge } from "@components/ui/badge";

const Priority = ({ priority }: { priority: TaskPriority }) => {
  return <Badge className="px-3 py-1">{priority}</Badge>;
};

export default Priority;
