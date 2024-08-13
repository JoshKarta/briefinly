import React from 'react'
import { Label } from './ui/label'
import { cn } from '@/lib/utils'

export default function FormInput({ children, name, className }: { children: React.ReactNode, name: string, className?: string}) {
    return (
        <div className={cn('flex flex-col gap-1',className)}>
            <Label htmlFor={name} className='capitalize dark:text-zinc-100'>{name}</Label>
            {children}
        </div>
    )
}
