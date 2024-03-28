import { TaskHistory } from "@/components/TaskHistory";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useGetAllHistoryQuery } from "@/redux/api/hooks";

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
          <div className="p-3 text-left h-[calc(100vh-70px)] space-y-5 overflow-auto">
            {historyList.map((history) =>
              history.tableName === "task" ? (
                <div key={history.id}>
                  Task({history.name}):
                  <TaskHistory history={history} />
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
