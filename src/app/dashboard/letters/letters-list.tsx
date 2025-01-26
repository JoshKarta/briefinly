"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";
import { CopyIcon, EyeIcon, Trash2 } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import CreateLetter from "./create-letter";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function LettersList() {
  const { user } = useUser();
  // const [letters, setLetters] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const letters = useQuery(api.letters.getLetters);

  // Function to fetch all letters by user
  const fetchLetters = async () => {
    if (user?.id) {
      setLoading(true);
      // const { data } = await supabase.from('letters').select('*').eq("user_id", user.id).order('created_at', { ascending: false });
    }
    setLoading(false);
  };

  // Fetch letters when page loads
  useEffect(() => {
    fetchLetters();
  }, [user]);

  // Fucntion to delete a letter
  const deleteLetter = async (id: number) => {
    const { error } = await supabase.from("letters").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete letter.");
    } else {
      toast.success("Letter deleted successfully.");
      await fetchLetters(); // Refetch letters after successful deletion
    }
  };

  // Function to Copy the url
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(`${baseUrl}/share/${text}`);
      toast.info("Link copied!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy link.");
    }
  };

  if (loading) {
    return (
      <div className="mt-14 flex w-full justify-center">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div>
      {/* Modal for creating a Letter */}
      <CreateLetter fetchLetters={fetchLetters} />
      {/* All Fetched Letters */}
      <div className="mt-4 flex flex-col gap-2">
        {letters && letters?.length === 0 ? (
          <p className="mt-4 text-center text-2xl text-neutral-500 dark:text-zinc-100">
            You haven&apos;t written any letters yet{" "}
          </p>
        ) : (
          letters?.map((item: any) => (
            <Fragment key={item.id}>
              {/* Single Card that displays letter information */}
              <Card className="hover-effect hover:shadow-md dark:shadow-neutral-500">
                <CardHeader className="pb-0">
                  <CardTitle className="text-lg font-medium">
                    {item.title !== null ? item.title : "Title"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between pb-2">
                  <p className="w-1/2 truncate text-neutral-400">{item.text}</p>
                  {/* Actions for letters on medium screen*/}
                  <div className="hidden items-center gap-2 md:flex">
                    <Button size={"icon"} className="h-8 w-8" asChild>
                      <Link
                        href={`${baseUrl}/share/${item.letter_id}`}
                        target="_blank"
                      >
                        <EyeIcon className="icon-size" />
                      </Link>
                    </Button>
                    <Button
                      size={"icon"}
                      className="h-8 w-8"
                      variant={"outline"}
                      onClick={() => {
                        handleCopy(item.letter_id);
                      }}
                    >
                      <CopyIcon className="icon-size" />
                    </Button>
                    <Button
                      size={"icon"}
                      className="h-8 w-8"
                      variant={"destructive"}
                      onClick={() => {
                        setOpenDialogId(item.id);
                      }}
                    >
                      <Trash2 className="icon-size" />
                    </Button>
                  </div>
                  {/* Actions for letters on small screen */}
                  <div className="md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        {" "}
                        &#46; &#46; &#46;
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            href={`${baseUrl}/share/${item.letter_id}`}
                            target="_blank"
                          >
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            handleCopy(item.letter_id);
                          }}
                        >
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setOpenDialogId(item.id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
                {/* Date of the letter created*/}
                <CardFooter>
                  <p className="text-xs text-neutral-400">
                    {formatDate(item.created_at)}
                  </p>
                </CardFooter>
              </Card>
              {/* Alert Dialog for deleting a letter */}
              <AlertDialog
                open={openDialogId === item.id}
                onOpenChange={() => setOpenDialogId(null)}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="!border-neutral-100 !bg-neutral-100 !text-neutral-500">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        className="bg-red-500 text-white hover:bg-red-100 hover:text-red-500"
                        onClick={() => {
                          deleteLetter(item.id);
                        }}
                      >
                        Continue
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}
