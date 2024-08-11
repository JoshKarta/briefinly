"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";
import { CopyIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LettersList() {
  const { user } = useUser()
  const [letters, setLetters] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchLetters = async () => {
      if (user?.id) {
        setLoading(true)
        const { data } = await supabase.from('letters').select().eq("user_id", user.id);
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
        <Card key={item.id}>
          <CardHeader className="pb-0">
            <CardTitle className="font-medium text-lg flex items-center justify-between">
              {item.title !== null ? item.title : "Title"}
              <div className="flex items-center gap-2">
                <Button size={"icon"}>
                  <EyeIcon className="icon-size" />
                </Button>
                <Button size={"icon"} variant={"outline"} onClick={() => { handleCopy(item.letter_id) }}>
                  <CopyIcon className="icon-size" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="w-1/2 truncate text-neutral-400">
              {item.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
