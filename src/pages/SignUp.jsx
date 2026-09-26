import React from 'react'
import ShortlyLogo from '../components/ShortlyLogo'
import './SignUp.css'
import { LockKeyhole, Eye, EyeOff, Mail, User } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import Notification from '../components/Notification'
import { useState } from 'react';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async () => {

        if (password !== confirmPassword) {
            setNotification({ type: 'error', message: 'Passwords do not match.' })
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setNotification({ type: 'error', message: data.message || 'Unable to create your account.' })
                return
            }

            localStorage.setItem("token", data.token);

            setNotification({ type: 'success', message: 'Account created successfully.' })

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
            
        } catch (error) {
            setNotification({ type: 'error', message: 'Could not connect to the server.' })
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

            <main className='signup-page'>
                <ShortlyLogo />
                <section className="signup-container">
                    <h1>Create your Shortly account</h1>
                    <p>Start creating and managing your shortened links.</p>

                    <div className="signup-details">

                        <label htmlFor="name">Full Name</label>
                        <div className="signup-input-wrapper">
                            <User className="signup-icon" aria-hidden="true" size={16} />
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <label htmlFor="email">Email Address</label>
                        <div className="signup-input-wrapper">
                            <Mail className="signup-icon" aria-hidden="true" size={16} />
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <label htmlFor="password">Password</label>
                        <div className="signup-input-wrapper">
                            <LockKeyhole className="signup-icon" aria-hidden="true" size={16} />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="password-toggle-button"
                                type="button"
                                onClick={() => setShowPassword((isVisible) => !isVisible)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                            >
                                {showPassword ? <EyeOff aria-hidden="true" size={16} /> : <Eye aria-hidden="true" size={16} />}
                            </button>
                        </div>

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <div className="signup-input-wrapper">
                            <LockKeyhole className="signup-icon" aria-hidden="true" size={16} />
                            <input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                className="password-toggle-button"
                                type="button"
                                onClick={() => setShowConfirmPassword((isVisible) => !isVisible)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                aria-pressed={showConfirmPassword}
                            >
                                {showConfirmPassword ? <EyeOff aria-hidden="true" size={16} /> : <Eye aria-hidden="true" size={16} />}
                            </button>
                        </div>

                        <button
                            type="button"
                            className="signup-button"
                            onClick={handleSignup} >
                            Create Account</button>
                    </div>
                    <div className="login-prompt">
                        <span>Already have an account?</span>
                        <Link to="/login">Log in</Link>
                    </div>
                </section>
                <Link className="back-home" to="/">Back to Home</Link>

            </main>

            <Footer />
        </>
    )
}

export default SignUp
