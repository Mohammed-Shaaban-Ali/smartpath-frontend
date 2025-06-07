"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { handleReqWithToaster } from "@/lib/handle-req-with-toaster";

const DeleteDialog = ({
  id,
  title,
  deleteFunction,
  isDeleting,
  btnClassName,
  children,
}: {
  id: string | number;
  title?: string;
  deleteFunction: any;
  isDeleting: boolean;
  btnClassName?: string;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDeleted = async () => {
    handleReqWithToaster("Please wait...", async () => {
      await deleteFunction(id).unwrap();
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="ghost" size={"lg"} className={btnClassName}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="text-center max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-start text-xl font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2.5 text-start mt-4">
          <h3 className="text-16 text-black/80 font-semibold">
            Are you absolutely sure?
          </h3>
          <p className="text-14 text-black/60  ">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </p>
        </div>

        <div className="flex justify-center items-center gap-5 mt-5">
          <Button
            variant="outline"
            className=" w-1/3 h-10 text-black/60 hover:text-black transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className="w-2/3 h-10 bg-red-500 hover:bg-red-400 text-white transition-all duration-300"
            size={"lg"}
            onClick={handleDeleted}
            disabled={isDeleting}
          >
            <Check className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete, I'm sure?"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
