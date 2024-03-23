import {
  Plus,
  History,
  EllipsisVertical,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { H3 } from "./components/typography";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { PopupIcon } from "./components/popmenu-utils";

function NavBar() {
  return (
    <nav className="flex justify-between items-center">
      <H3>My Task Board</H3>
      <div className="space-x-5">
        <Sheet>
          <SheetTrigger>
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

        <Button className="gap-2">
          <Plus />
          Create new list
        </Button>
      </div>
    </nav>
  );
}

function TaskList() {
  return (
    <div className="w-[250px] space-y-3">
      <div className="flex justify-between border-t-2 border-b-2 py-2 px-1 border-secondary">
        <p>To Do</p>
        <div className="flex gap-4">
          <p>45</p>
          <EllipsisVertical />
        </div>
      </div>
      <Button variant="outline" className="w-full gap-2 border-dashed border-2">
        <Plus />
        Add new card
      </Button>
      <TaskCard />
    </div>
  );
}

function TaskCard() {
  return (
    <Card>
      <CardHeader className="p-3 flex-row justify-between">
        Task 1
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground rounded-sm">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <PopupIcon icon={<Pencil />} />
              Edit
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

function App() {
  return (
    <div className="container p-5">
      <div className="mb-7">
        <NavBar />
      </div>
      <TaskList />
    </div>
  );
}

export default App;
