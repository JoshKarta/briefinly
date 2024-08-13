import React from 'react'
import { Label } from './ui/label'

export default function FormInput({ children, name }: { children: React.ReactNode, name: string }) {
    return (
        <div className='flex flex-col gap-1'>
            <Label htmlFor={name} className='capitalize dark:text-zinc-100'>{name}</Label>
            {children}
        </div>
    )
}
