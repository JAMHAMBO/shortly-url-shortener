import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <div className='footer'>

            <div className="footer-logo">
                <img src="/icons8-link.png" alt="Shorlty Logo" />
                <b>Shortly</b>
            </div>

            <div className="footer-sections">
                <Link to="/about">About</Link>
                <Link to="/privacy">Privacy</Link>
                <Link to="/terms">Terms</Link>
                <Link to="/contact">Contact</Link>
            </div>

        </div>
    )
}

export default Footer
