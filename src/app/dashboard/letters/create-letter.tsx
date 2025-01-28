"use client";
import PageHeading from "@/components/page-heading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MailPlus } from "lucide-react";
import React from "react";
import LetterForm from "./letter-form";

export default function CreateLetter() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-full flex-col gap-1 md:flex-row md:justify-between">
      <PageHeading
        title="Letters"
        description="Here you can see all the letters you wrote."
      />

      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild>
          <Button>
            New
            <MailPlus className="ml-2 h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create A new Record</DialogTitle>
          </DialogHeader>
          <LetterForm handleDialog={handleDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
