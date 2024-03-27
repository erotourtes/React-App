import { HistoryT } from "@shared/dtos";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
          <SheetDescription className="p-3 text-left">
            {historyList.map((history) => (
              <div>
                <p>{history.name}</p>
              </div>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AllHistoryList;
