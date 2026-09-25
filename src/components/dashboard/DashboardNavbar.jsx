import React from 'react'
import './DashboardNavbar.css'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function DashboardNavbar() {
    const [user, setUser] = React.useState(null);
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        if (isLoggingOut) return;

        setIsLoggingOut(true);
        const token = localStorage.getItem("token");

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            // Remove the browser copy even if the server cannot be reached.
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
        }
    };
    
    return (
        <nav>
            <div className="dashboard-navbar">

                <img src="/icons8-link.png" alt="Shorlty Logo" />
                <span>Shortly</span>

                <div className="profile">
                    <div className="profile-picture">{user?.name?.charAt(0).toUpperCase()}</div>
                    <span>{user?.name}</span>
                </div>

                <button
                    className="logout-button"
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                >
                    <LogOut size={20} aria-hidden="true" />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </button>
            </div>
        </nav>
    )
}

export default DashboardNavbar
