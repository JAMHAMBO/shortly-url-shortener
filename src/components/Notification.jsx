import { CheckCircle, Info, TriangleAlert, X, XCircle } from 'lucide-react'
import './Notification.css'

const notificationIcons = {
    success: CheckCircle,
    error: XCircle,
    warning: TriangleAlert,
    info: Info,
}

function Notification({ type = 'info', message, onClose }) {
    const Icon = notificationIcons[type] || notificationIcons.info

    return (
        <div className={`notification notification-${type}`} role="alert">
            <Icon className="notification-icon" size={20} aria-hidden="true" />
            <span>{message}</span>
            <button className="notification-close" type="button" onClick={onClose} aria-label="Close notification">
                <X size={17} aria-hidden="true" />
            </button>
        </div>
    )
}

export default Notification
