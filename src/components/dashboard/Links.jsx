import {useState} from 'react'
import './Links.css'
import { Check, Copy, Power, Trash2 } from 'lucide-react'

function Links({ links, setLinks }) {
    const [copiedId, setCopiedId] = useState(null)

    const copyLink = async (link) => {
        const shortUrl = `${import.meta.env.VITE_API_URL}/${link.shortCode}`

        await navigator.clipboard?.writeText(shortUrl)

        setCopiedId(link._id)

        window.setTimeout(() => setCopiedId(null), 1500)
    }

    const toggleLink = async (id) => {
        try {
            const token = localStorage.getItem("token")

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/urls/${id}/toggle`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const updatedLink = await response.json()

            if (!response.ok) {
                console.error(updatedLink.message)
                return
            }

            setLinks((currentLinks) =>
                currentLinks.map((link) =>
                    link._id === id ? updatedLink : link
                )
            )

        } catch (error) {
            console.error("Toggle failed:", error)
        }
    }

    const deleteLink = async (id) => {
        try {
            const token = localStorage.getItem("token")

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/urls/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            if (!response.ok) {
                console.error(data.message)
                return
            }

            setLinks((currentLinks) =>
                currentLinks.filter((link) => link._id !== id)
            )

        } catch (error) {
            console.error("Delete failed:", error)
        }
    }

    return (
        <section className="links-container">
            <div className="your-links">
                <h2>Your Links</h2>
                <div className="number-links">{links.length} links</div>
            </div>

            <div className="links-table-wrapper">
                <table className="links-table">
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Short URL</th>
                            <th>Clicks</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map((link) => (
                            <tr key={link._id} className={!link.active ? 'inactive-link' : ''}>
                                <td className="original-url">{link.originalUrl}</td>
                                <td className="short-url">
                                    <a href={`${import.meta.env.VITE_API_URL}/${link.shortCode}`} target="_blank" rel="noreferrer">
                                        {link.shortCode}
                                    </a>
                                </td>
                                <td className="clicks">{link.clicks}</td>
                                <td>{new Date(link.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className="link-actions">
                                        <button className="copy-action" type="button" onClick={() => copyLink(link)}>
                                            {copiedId === link._id ? <Check size={16} /> : <Copy size={16} />}
                                            {copiedId === link._id ? 'Copied' : 'Copy'}
                                        </button>
                                        <button className="delete-action" type="button" onClick={() => deleteLink(link._id)}>
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                        <button
                                            className={link.active ? 'deactivate-action' : 'activate-action'}
                                            type="button"
                                            onClick={() => toggleLink(link._id)}
                                        >
                                            <Power size={16} />
                                            {link.active ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Links
