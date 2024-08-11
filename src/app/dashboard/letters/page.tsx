import PageHeading from '@/components/page-heading'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { MailPlus } from 'lucide-react'
import LetterForm from './letter-form'
import LettersList from './letters-list'


export default async function page() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <PageHeading title='Letters' description='Lorem ipsum odor amet, consectetuer adipiscing elit.' />

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            New
                            <MailPlus className='ml-2 w-5 h-5' />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create A new Record</DialogTitle>
                        </DialogHeader>
                        <LetterForm />
                    </DialogContent>
                </Dialog>

            </div>

            <LettersList />
        </div>
    )
}
