import './Overview.css'
import { CheckCircle, Link2, MousePointerClick, Plus } from 'lucide-react'

function Overview({ links, onShorten }) {
    return (
        <main className="overview">
            <div className="overview-header">
                <div>
                    <h1>Your Dashboard</h1>
                    <p>Manage and track your shortened links.</p>
                </div>

                <button className="shorten-button" type="button" onClick={onShorten}>
                    <Plus size={18} aria-hidden="true" />
                    Shorten New URL
                </button>
            </div>

            <div className="overview-container">
                <div className="overview-card">
                    <div>
                        <p>Total Links</p>
                        <span>{links.length}</span>

                    </div>
                    <div className="overview-icon">
                        <Link2 size={22} aria-hidden="true" />
                    </div>
                </div>

                <div className="overview-card">
                    <div>
                        <p>Total Clicks</p>
                        <span>{links.reduce((total, link) => total + link.clicks, 0)}</span>
                    </div>
                    <div className="overview-icon">
                        <MousePointerClick size={22} aria-hidden="true" />
                    </div>
                </div>

                <div className="overview-card">
                    <div>
                        <p>Active Links</p>
                        <span><span>{links.filter((link) => link.active).length}</span></span>
                    </div>
                    <div className="overview-icon">
                        <CheckCircle size={22} aria-hidden="true" />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Overview
