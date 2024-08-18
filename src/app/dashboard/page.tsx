"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { IconCalendarWeek, IconMail } from '@tabler/icons-react'
import moment from 'moment'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase/client'
import ParticleSwarmLoader from '@/components/magicui/particle-loader'

export default function DashboardPage() {
    const { user } = useUser()
    const [letters, setLetters] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)

    // Function to fetch all letters by user
    const fetchLetters = async () => {
        if (user?.id) {
            setLoading(true)
            const { data } = await supabase.from('letters').select('*').eq("user_id", user.id).order('created_at', { ascending: false });
            setLetters(data)
        }
        setLoading(false)
    }

    // Fetch letters when page loads
    useEffect(() => {
        fetchLetters()
    }, [user])

    return (
        <div className='dark:text-zinc-100'>
            <div className='flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center w-full'>
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

            {loading ?
                <div className='grid mt-10 place-content-center'>
                    <ParticleSwarmLoader />
                </div>
                :
                <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-10'>
                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Letters Written
                            </CardTitle>
                            <IconMail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{letters && letters.length}</p>
                        </CardContent>
                    </Card>
                </div>
            }
        </div>
    )
}
