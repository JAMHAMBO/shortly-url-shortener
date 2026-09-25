import { useEffect, useState } from 'react'
import DashboardNavbar from '../components/dashboard/DashboardNavbar'
import Overview from '../components/dashboard/Overview'
import Links from '../components/dashboard/Links'
import Footer from '../components/Footer'
import ShortenNewURL from '../components/dashboard/ShortenNewURL'

function Dashboard() {
    const [links, setLinks] = useState([]);
    const [isShortenModalOpen, setIsShortenModalOpen] = useState(false)

    const fetchLinks = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/urls/my-urls`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

        if (!response.ok) return

        setLinks(await response.json())
    }

    useEffect(() => {
        fetchLinks().catch((error) => console.error("Error fetching links:", error))
    }, []);

    return (
        <div className="dashboard-page">
            <DashboardNavbar />
            <Overview links={links} onShorten={() => setIsShortenModalOpen(true)} />
            <Links
                links={links}
                setLinks={setLinks}
            />
            <Footer />
            {isShortenModalOpen && (
                <ShortenNewURL
                    onClose={() => setIsShortenModalOpen(false)}
                    onCreated={async () => {
                        await fetchLinks()
                    }}
                />
            )}
            {/* <NoLinks/> */}
            {/* <UrlShortener/> */}
        </div>

    );
}

export default Dashboard;