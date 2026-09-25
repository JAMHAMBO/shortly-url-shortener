import React from 'react'
import './Login.css'
import { LockKeyhole, Eye, Mail } from "lucide-react";
import ShortlyLogo from '../components/ShortlyLogo'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import { useState } from 'react';
import Notification from '../components/Notification';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setNotification({
                    type: "error",
                    message: data.message || "Unable to log in."
                });
                return;
            }

            localStorage.setItem("token", data.token);
            setNotification({
                type: "success",
                message: "Login successful!"
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (error) {
            setNotification({
                type: "error",
                message: "Could not connect to the server."
            });
        }
    };

    return (
        <>

            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}

            <main className="login-page">
                <ShortlyLogo />
                <div className="login-container">
                    <h1>Welcome back</h1>
                    <p>Log in to manage your shortened links.</p>

                    <div className="login-input">

                        <label htmlFor="email">Email address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" aria-hidden="true" size={16} />
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="password-label">
                            <label htmlFor="password">Password</label>
                            <a href="forgot-password">Forgot password?</a>
                        </div>

                        <div className="input-wrapper">
                            <LockKeyhole className="input-icon" aria-hidden="true" size={16} />
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <Eye className="password-toggle" aria-hidden="true" size={16} />
                        </div>

                        <button
                            type="button"
                            onClick={handleLogin}
                        >Log in</button>

                    </div>

                    <div className="signup-prompt">
                        <span>Don&apos;t have an account?</span>
                        <Link to="/signup">Sign Up</Link>
                    </div>

                </div>
                <Link className="back-home" to="/">Back to Home</Link>
            </main>
            <Footer />
        </>

    )
}

export default Login
