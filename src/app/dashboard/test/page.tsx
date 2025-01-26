"use client";
import { useMutation } from "convex/react";
import React, { FormEvent } from "react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function page() {
  const createTest = useMutation(api.test.createTest);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await createTest({
        text: formData.get("text"),
      });
      toast.success("Successfully created");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" name="text" />

      <Button type="submit">Save</Button>
    </form>
  );
}
