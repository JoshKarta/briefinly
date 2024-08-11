import React from 'react'
import LettersList from './letters-list'
import CreateLetter from './create-letter'


export default async function page() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <CreateLetter />
            </div>
            <LettersList />
        </div>
    )
}
