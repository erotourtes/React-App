import { TaskHistory } from "@/components/TaskHistory";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useGetAllHistoryQuery } from "@/redux/apiSlice";

const AllHistoryList = ({ children }: React.PropsWithChildren) => {
  const { data: historyList = [] } = useGetAllHistoryQuery();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-0 min-w-[500px]">
        <SheetHeader>
          <SheetTitle className="bg-primary text-primary-foreground px-3 py-4 text-left">
            History
          </SheetTitle>
          <div className="p-3 text-left h-screen space-y-5 overflow-auto">
            {historyList.map((history) =>
              history.tableName === "task" ? (
                <div>
                  Task({history.name}):
                  <TaskHistory key={history.id} history={history} />
                </div>
              ) : null
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AllHistoryList;
