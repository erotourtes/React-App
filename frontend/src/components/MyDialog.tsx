import { Dialog, DialogClose, DialogContent } from "@components/ui/dialog";

import { X } from "lucide-react";

type TaskDialogProps = {
  onDialogChange: (open: boolean) => void;
  isOpen: boolean;
  children: React.ReactNode;
};

const MyDialog = ({ onDialogChange, isOpen, children }: TaskDialogProps) => {
  return (
    <Dialog onOpenChange={onDialogChange} open={isOpen}>
      <DialogContent className="overflow-hidden p-0 border-0 min-w-[90vw] min-h-[90vh]">
        <div>
          <div className="flex h-[50px] bg-primary text-primary-foreground items-center justify-end p-3">
            <DialogClose
              asChild
              className="cursor-pointer hover:text-destructive"
            >
              <X />
            </DialogClose>
          </div>
          <div className="container">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
