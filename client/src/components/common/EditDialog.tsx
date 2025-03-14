import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface EditDialogProps {
  title: string;
  inputValue?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (value: string) => void;
  confirmText?: string;
  cancelText?: string;
}

export function EditDialog({
  title,
  inputValue = "",
  open,
  onOpenChange,
  onConfirm,
  confirmText = "확인",
}: EditDialogProps) {
  const [value, setValue] = useState(inputValue);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Input value={value} className="dark:bg-accent" onChange={(e) => setValue(e.target.value)} />
        <DialogFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            className="rounded-3xl border dark:border-neutral-700 dark:bg-white dark:text-background dark:hover:bg-white/80"
            onClick={() => onConfirm(value)}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
