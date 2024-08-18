"use client"
import { createLetter } from '@/actions/action'
import FormInput from '@/components/FormInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

export default function LetterForm({ handleDialog }: { handleDialog: () => void }) {
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const { user } = useUser()

    return (
        <form action={async (formData: FormData) => {
            try {
                await createLetter(formData)
                formRef.current?.reset()
                toast.success(`Letter created successfully`)
                setLoading(true)
                handleDialog()
            } catch (error) {
                toast.error(error as string)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }}
            className='flex flex-col gap-4 mt-2'
        >
            <FormInput name='title'>
                <Input type='text' name="title" placeholder='Dear Jane' />
            </FormInput>
            <input type="hidden" name="user_id" value={user?.id} />
            <FormInput name='text'>
                <Textarea name='text' placeholder='I love Twix Chocolate' />
            </FormInput>
            <Button type='submit' disabled={loading}>Save</Button>
        </form>
    )
}
