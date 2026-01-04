import React from 'react'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-slate-100 py-24 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold font-heading text-orange-500">Terms of Service</h1>
                <div className="prose prose-invert max-w-none text-slate-400 space-y-4">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        By accessing Lifeline, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                    </p>
                    <h2 className="text-2xl font-semibold text-white mt-8">1. Use License</h2>
                    <p>
                        Permission is granted to temporarily view the materials on Lifeline's website for personal, non-commercial use only.
                    </p>
                    <h2 className="text-2xl font-semibold text-white mt-8">2. Disclaimer</h2>
                    <p>
                        The materials on Lifeline's website are provided on an 'as is' basis. Lifeline makes no warranties, expressed or implied.
                    </p>
                    <h2 className="text-2xl font-semibold text-white mt-8">3. Limitations</h2>
                    <p>
                        In no event shall Lifeline or its suppliers be liable for any damages arising out of the use or inability to use the materials.
                    </p>
                </div>
            </div>
        </div>
    )
}
