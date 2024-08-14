"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { IconCalendarWeek } from '@tabler/icons-react'
import moment from 'moment'

export default function DashboardPage() {
    const { user } = useUser()

    return (
        <div className='dark:text-zinc-100'>
            <div className='flex justify-between items-center w-full'>
                <h3 className='font-bold text-3xl capitalize'>Hello, {user?.username}</h3>
                <div className='flex items-center gap-2'>
                    <p className='font-medium'>
                        {moment().format('D MMM, YYYY')}
                    </p>
                    <div className="rounded-full p-2 bg-neutral-100 dark:bg-neutral-800">
                        <IconCalendarWeek className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                    </div>
                </div>
            </div>
        </div>
    )
}
