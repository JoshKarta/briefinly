"use client"
import { createLetter } from '@/actions/action'
import FormInput from '@/components/FormInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

export default function LetterForm({ handleDialog, onLetterCreated }: { handleDialog: () => void, onLetterCreated: () => void }) {
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const [confettiType, setConfettiType] = useState<string>('basic')
    const [confettiEnabled, setConfettiEnabled] = useState(false)
    const { user } = useUser()

    return (
        <form action={async (formData: FormData) => {
            try {
                setLoading(true)
                formData.set('confetti', confettiEnabled.toString());
                await createLetter(formData)
                formRef.current?.reset()
                toast.success(`Letter created successfully`)
                handleDialog()
                onLetterCreated()
            } catch (error) {
                // toast.error("Something went wrong. Please try again later")
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
            <div className='grid grid-cols-6 gap-4'>
                <FormInput name='confetti'>
                    <Switch
                        checked={confettiEnabled}
                        onCheckedChange={setConfettiEnabled}
                    />
                </FormInput>
                <FormInput name='confetti Type' className='col-span-3'>
                    <Select
                        name='confetti_type'
                        onValueChange={(value) => setConfettiType(value)}
                        disabled={!confettiEnabled}
                    >
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Basic" />
                        </SelectTrigger>
                        <SelectContent>
                            {['basic', 'stars', 'custom'].map((item, i) => (
                                <SelectItem value={item} key={i} className='capitalize'>{item}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormInput>

                {confettiType === 'custom' && confettiEnabled && (
                    <FormInput name='Confetti emoji' className='col-span-2'>
                        <Input type='text' name="confetti-emoji" placeholder='🦄' />
                    </FormInput>
                )}
            </div>
            <Button type='submit' disabled={loading}>Save</Button>
        </form>
    )
}
