import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div className='footer'>

            <div className="footer-logo">
                <img src="/icons8-link.png" alt="Shorlty Logo" />
                <b>Shortly</b>
            </div>

            <div className="footer-sections">
                <span>About</span>
                <span>Privacy</span>
                <span>Terms</span>
                <span>Contact</span>
            </div>

        </div>
    )
}

export default Footer
