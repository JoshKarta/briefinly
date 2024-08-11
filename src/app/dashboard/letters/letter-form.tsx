"use client"
import { createLetter } from '@/actions/action'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { useRef } from 'react'
import { toast } from 'sonner'

export default function LetterForm() {
    const formRef = useRef<HTMLFormElement>(null)
    const { user } = useUser()

    return (
        <form action={async (formData: FormData) => {
            try {
                await createLetter(formData)
                formRef.current?.reset()
                toast.success(`Letter created successfully`)
            } catch (error) {
                toast.error(error as string)
                console.log(error)
            }
        }}
            className='flex flex-col gap-2'
        >
            <input type="hidden" name="user_id" value={user?.id} />
            <Textarea name='text' placeholder='I love Twix Chocolate' />
            <Button type='submit'>Save</Button>
        </form>
    )
}
