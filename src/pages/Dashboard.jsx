import { useCallback, useEffect, useState } from 'react'
import DashboardNavbar from '../components/dashboard/DashboardNavbar'
import Overview from '../components/dashboard/Overview'
import Links from '../components/dashboard/Links'
import NoLinks from '../components/dashboard/NoLinks'
import Footer from '../components/Footer'
import ShortenNewURL from '../components/dashboard/ShortenNewURL'

function Dashboard() {
    const [links, setLinks] = useState([]);
    const [isShortenModalOpen, setIsShortenModalOpen] = useState(false)

    const fetchLinks = useCallback(async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/urls/my-urls`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

        if (!response.ok) return

        setLinks(await response.json())
    }, [])

    useEffect(() => {
        fetchLinks().catch((error) => console.error("Error fetching links:", error))

        // Keep click counts current while the dashboard is open.
        const refreshInterval = window.setInterval(() => {
            fetchLinks().catch((error) => console.error("Error fetching links:", error))
        }, 5000)

        // Refresh immediately when returning from a short-link tab or page.
        const refreshWhenVisible = () => {
            if (document.visibilityState === "visible") {
                fetchLinks().catch((error) => console.error("Error fetching links:", error))
            }
        }

        document.addEventListener("visibilitychange", refreshWhenVisible)

        return () => {
            window.clearInterval(refreshInterval)
            document.removeEventListener("visibilitychange", refreshWhenVisible)
        }
    }, [fetchLinks]);

    return (
        <div className="dashboard-page">
            <DashboardNavbar />
            <Overview links={links} onShorten={() => setIsShortenModalOpen(true)} />
            {links.length === 0 ? (
                <NoLinks />
            ) : (
                <Links
                    links={links}
                    setLinks={setLinks}
                />
            )}
            <Footer />
            {isShortenModalOpen && (
                <ShortenNewURL
                    onClose={() => setIsShortenModalOpen(false)}
                    onCreated={async () => {
                        await fetchLinks()
                    }}
                />
            )}
            {/* <UrlShortener/> */}
        </div>

    );
}

export default Dashboard;
