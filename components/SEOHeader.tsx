"use client"
import React from 'react'

type Props = {
    title: string
    description: string
    jsonLd?: Record<string, any>
}

export default function SEOHeader({ title, description, jsonLd }: Props) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd || {}) }}
        />
    )
}
