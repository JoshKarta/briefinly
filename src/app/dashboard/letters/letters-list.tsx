"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function LettersList() {
  const { user } = useUser()
  const [letters, setLetters] = useState<any>()

  useEffect(() => {
    const fetchLetters = async () => {
      if (user?.id) {
        const { data } = await supabase.from('letters').select().eq("user_id", user.id);
        setLetters(data)
      }
    }
    fetchLetters()
  }, [user])



  return (
    <div className='mt-4 flex flex-col gap-2'>
      {letters?.map((item: any) => (
        <Card key={item.id}>
          <CardHeader></CardHeader>
          <CardContent></CardContent>
        </Card>
      ))}
    </div>
  )
}
