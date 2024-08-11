"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";
import { CopyIcon, EyeIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function LettersList() {
  const { user } = useUser()
  const [letters, setLetters] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchLetters = async () => {
      if (user?.id) {
        setLoading(true)
        const { data } = await supabase.from('letters').select('*').eq("user_id", user.id).order('created_at', { ascending: false });
        setLetters(data)
      }
      setLoading(false)
    }
    fetchLetters()
  }, [user])


  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(`${process.env.BASE_URL}/share/${text}`);
      toast.info("Link copied!")
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy link.")
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-14">
        <div className="loader" />
      </div>
    )
  }

  return (
    <div className='mt-4 flex flex-col gap-2'>
      {letters?.map((item: any) => (
        <Card key={item.id} className="hover:shadow-md dark:shadow-neutral-500 hover-effect">
          <CardHeader className="pb-0">
            <CardTitle className="font-medium text-lg">
              {item.title !== null ? item.title : "Title"}

            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2 flex items-center justify-between">
            <p className="w-1/2 truncate text-neutral-400">
              {item.text}
            </p>
            <div className="md:flex items-center gap-2 hidden">
              <Button size={"icon"} className="w-8 h-8">
                <EyeIcon className="icon-size" />
              </Button>
              <Button size={"icon"} className="w-8 h-8" variant={"outline"} onClick={() => { handleCopy(item.letter_id) }}>
                <CopyIcon className="icon-size" />
              </Button>
              <Button size={"icon"} className="w-8 h-8" variant={"destructive"} onClick={() => { setIsOpen(!isOpen) }}>
                <Trash2 className="icon-size" />
              </Button>
            </div>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>	&#46;	&#46;	&#46;</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { handleCopy(item.letter_id) }}>Copy URL</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setIsOpen(!isOpen) }}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-neutral-400">
              {formatDate(item.created_at)}
            </p>
          </CardFooter>
        </Card>
      ))}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-neutral-100 text-neutral-500 bg-neutral-300">Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant={"destructive"}>
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
