import './NoLinks.css'
import { Link2 } from 'lucide-react'

function NoLinks() {
    return (
        <section className="no-links-container">
            <div className="no-links-icon" aria-hidden="true">
                <Link2 size={22} />
            </div>
            <h2>No shortened links yet</h2>
            <p>Create your first short link to start sharing and tracking clicks.</p>
        </section>
    )
}

export default NoLinks
