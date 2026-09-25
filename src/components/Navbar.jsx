import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <div className="nav">
                <img src="/icons8-link.png" alt="Shorlty Logo" />
                <span>Shortly</span>

                <div className="buttons">
                    <button className='button1'><Link to="/login" className='link'>Log in</Link></button>
                    <button className='button2'><Link to="/signup" className='link' >Sign Up</Link></button>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
