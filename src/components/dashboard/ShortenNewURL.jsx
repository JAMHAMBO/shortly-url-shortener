import { X } from 'lucide-react'
import './ShortenNewURL.css'
import UrlShortener from '../home/UrlShortener'

function ShortenNewURL({ onClose, onCreated }) {
    return (
        <div className="shorten-modal-backdrop">
            <section
                className="shorten-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="shorten-modal-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="shorten-modal-header">
                    <h2 id="shorten-modal-title">Shorten a new URL</h2>
                    <button className="shorten-modal-close" type="button" onClick={onClose} aria-label="Close URL shortener">
                        <X size={20} aria-hidden="true" />
                    </button>
                </div>
                <UrlShortener onCreated={onCreated} />
            </section>
        </div>
    )
}

export default ShortenNewURL
