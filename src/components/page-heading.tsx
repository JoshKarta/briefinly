import React from 'react'

type PageHeading = {
    title: string
    description?: string
}

export default function PageHeading({ title, description }: PageHeading) {
    return (
        <div className='flex-1 space-y-1'>
            <h1 className='text-2xl font-semibold'>{title}</h1>
            <p className='font-light text-neutral-400'>{description}</p>
        </div>
    )
}
