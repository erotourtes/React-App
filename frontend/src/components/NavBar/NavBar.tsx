import CreateNewList from "@/components/NavBar/CreateNewList";
import { History } from "lucide-react";
import { H3 } from "../typography";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

function NavBar() {
  return (
    <nav className="flex flex-wrap justify-between items-center">
      <H3>My Task Board</H3>
      <div className="space-x-5 flex">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <History />
              History
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SheetHeader>
              <SheetTitle className="bg-secondary fg-secondary-foreground px-3 py-4 text-left">
                History
              </SheetTitle>
              <SheetDescription className="p-3 text-left">
                <ul>
                  <li>1</li>
                  <li>1</li>
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <CreateNewList />
      </div>
    </nav>
  );
}

export default NavBar;
