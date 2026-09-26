import './UrlShortener.css'
import { useState, useRef } from 'react'

function UrlShortener({ onCreated }) {
    const [originalUrl, setOriginalUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [copied, setCopied] = useState(false)

    const shortenUrl = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/urls`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                ...(token && {
                    Authorization: `Bearer ${token}`
                })
            },
            body: JSON.stringify({ originalUrl }),
        })

        const data = await response.json()

        if (!response.ok) {
            return
        }

        setShortUrl(`${import.meta.env.VITE_API_URL}/${data.shortCode}`)
        onCreated?.(data)
    }

    const originalUrlInput = useRef(null)

    const createAnother = () => {
        setOriginalUrl('')
        setShortUrl('')
        setCopied(false)
        originalUrlInput.current?.focus()
    }

    const copyShortUrl = async () => {
        if (!shortUrl) return

        await navigator.clipboard.writeText(shortUrl)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1500)
    }

    const openShortUrl = () => {
        if (!shortUrl) return

        window.open(shortUrl, "_blank", "noopener,noreferrer")
    }

    return (
        <div className="url-shortener-container">
            <div className="url-input">
                <span>Enter your long URL</span>
                <input
                    ref={originalUrlInput}
                    value={originalUrl}
                    onChange={(event) => setOriginalUrl(event.target.value)}
                    placeholder="https://example.com/your-long-url" />
                <button onClick={shortenUrl}>Shorten URL</button>
            </div>

            <div className="url-output">
                <h2>Your shortened URL</h2>
                <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    placeholder="https://shortly.com/short-url"
                    onClick={openShortUrl}
                    aria-label="Open shortened URL in a new tab"
                    title={shortUrl ? "Open link in a new tab" : undefined}
                />

                <button className="copy-button" type="button" onClick={copyShortUrl} disabled={!shortUrl}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="8" y="8" width="11" height="11" rx="2" />
                        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                    </svg>
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>

            <div className="url-actions">
                {shortUrl && (

                    <span className="ready-message">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" />
                            <path d="m8 12 2.5 2.5L16 9" />
                        </svg>
                        Your link is ready to share.
                    </span>

                )}
                <button type='button' onClick={createAnother} >Create another</button>
            </div>
        </div>
    )
}

export default UrlShortener
