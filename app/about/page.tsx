import React from 'react'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-slate-100 py-24 px-4">
            <div className="max-w-3xl mx-auto space-y-8 text-center">
                <h1 className="text-5xl font-bold font-heading text-orange-500">About Lifeline</h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                    We are dedicated to helping you make informed decisions about your next mobile device.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 text-left">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
                        <p className="text-slate-400">
                            To provide the most accurate, up-to-date, and comprehensive mobile comparison tool on the web.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Transparency</h2>
                        <p className="text-slate-400">
                            We pride ourselves on being transparent about our data sources and affiliate relationships.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
