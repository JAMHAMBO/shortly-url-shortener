import React from 'react'
import './Features.css'

function Features() {
    return (
        <section className="features-container">
                <div className="feature-card">
                    <div className="feature-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                            <path d="M9.5 8.5h-2a3.5 3.5 0 0 0 0 7h2" />
                            <path d="M14.5 8.5h2a3.5 3.5 0 0 1 0 7h-2" />
                            <path d="M8.5 12h7" />
                        </svg>
                    </div>
                    <h3>Short & Simple</h3>
                    <span>Turn long URLs into clean, shareable links.</span>
                </div>

                <div className="feature-card">
                    <div className="feature-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                            <path d="m13 2-8 11h6l-1 9 8-11h-6l1-9Z" />
                        </svg>
                    </div>
                    <h3>Fast Redirects</h3>
                    <span>Send visitors to the original URL instantly.</span>
                </div>

                <div className="feature-card">
                    <div className="feature-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                            <path d="M5 19V9" />
                            <path d="M10 19V5" />
                            <path d="M15 19v-7" />
                            <path d="M20 19V3" />
                        </svg>
                    </div>
                    <h3>Track Clicks</h3>
                    <span>See how many times your links are being used.</span>
                </div>
        </section>
    )
}

export default Features
