import React from 'react'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-slate-100 py-24 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold font-heading text-orange-500">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none text-slate-400 space-y-4">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        At Lifeline, we take your privacy seriously. This policy describes how we collect, use, and handle your information when you use our website.
                    </p>
                    <h2 className="text-2xl font-semibold text-white mt-8">1. Information Collection</h2>
                    <p>
                        We do not collect personal information unless you explicitly provide it (e.g., newsletter subscription). We may collect anonymous usage data to improve our services.
                    </p>
                    <h2 className="text-2xl font-semibold text-white mt-8">2. Use of Information</h2>
                    <p>
                        Any information collected is used solely for the purpose of providing and improving the Lifeline experience.
                    </p>
                    <h2 className="text-2xl font-semibold text-white mt-8">3. Cookies</h2>
                    <p>
                        We use minimal cookies to enhance site functionality and analyze traffic.
                    </p>
                </div>
            </div>
        </div>
    )
}
