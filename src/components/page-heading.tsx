import { cn } from '@/lib/utils'
import React from 'react'

type PageHeading = {
    title: string
    description?: string
    className?: string
}

export default function PageHeading({ title, description, className }: PageHeading) {
    return (
        <div className={cn('flex-1 space-y-1', className)}>
            <h1 className='text-2xl font-semibold dark:text-zinc-100'>{title}</h1>
            <p className='font-light text-neutral-400'>{description}</p>
        </div>
    )
}
