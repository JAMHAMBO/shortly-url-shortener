import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './InfoPage.css'

const pages = {
    about: {
        label: 'About Shortly',
        title: 'Make every link easier to share.',
        intro: 'Shortly turns long web addresses into compact links that are simple to share and easy to manage.',
        sections: [
            {
                title: 'A simpler way to share',
                paragraphs: [
                    'Paste a destination URL and Shortly creates a short link that redirects visitors to the original page. No extra steps between you and the link you need to share.'
                ]
            },
            {
                title: 'Built for managing links',
                paragraphs: [
                    'Create an account to keep track of your links in one dashboard. You can review click counts, activate or deactivate links, and remove links you no longer need.'
                ]
            },
            {
                title: 'Created by',
                paragraphs: [
                    'Shortly is a link-shortening project by Hamza Tamboowala, based in Mumbai, India.'
                ]
            }
        ]
    },
    privacy: {
        label: 'Privacy',
        title: 'Your data, plainly explained.',
        intro: 'This page describes the information Shortly handles to provide link shortening and account features.',
        sections: [
            {
                title: 'Information you provide',
                paragraphs: [
                    'When you create an account, Shortly stores your name, email address, and a hashed version of your password. When you shorten a URL, the destination address is stored with its short code.'
                ]
            },
            {
                title: 'Link activity',
                paragraphs: [
                    'Shortly records link creation time, whether a link is active, and its click count so links can redirect correctly and account holders can manage their links.'
                ]
            },
            {
                title: 'How information is used',
                paragraphs: [
                    'Account and link information is used to provide sign-in, create and manage short links, display dashboard details, and operate redirects. Authentication tokens are kept in your browser storage while you are signed in.'
                ]
            },
            {
                title: 'Your choices',
                paragraphs: [
                    'You can delete links you own from the dashboard and log out to end your current session. For questions or requests about your information, contact Hamza using the details on the Contact page.'
                ]
            },
            {
                title: 'Service providers',
                paragraphs: [
                    'Shortly relies on hosting and database infrastructure to operate. Those providers may process information as needed to deliver the service. This page may be updated as the project changes.'
                ]
            }
        ]
    },
    terms: {
        label: 'Terms',
        title: 'Use Shortly responsibly.',
        intro: 'By using Shortly, you agree to these basic rules for using the link-shortening service.',
        sections: [
            {
                title: 'Use of the service',
                paragraphs: [
                    'You may use Shortly to create and manage short links for lawful purposes. You are responsible for the URLs you submit and for ensuring you have the right to share them.'
                ]
            },
            {
                title: 'Prohibited activity',
                paragraphs: [
                    'Do not use Shortly to distribute unlawful, deceptive, harmful, or abusive content; to violate another person’s rights; or to interfere with the service or its users.'
                ]
            },
            {
                title: 'Links and availability',
                paragraphs: [
                    'Shortly may deactivate or remove links that appear to violate these terms or put users at risk. The service and links may change or become unavailable, and click counts are provided as a convenience rather than a guarantee of analytics accuracy.'
                ]
            },
            {
                title: 'Changes and contact',
                paragraphs: [
                    'These terms may be updated as the project evolves. Continued use after an update means you accept the revised terms. Questions can be sent using the contact details on the Contact page.'
                ]
            }
        ]
    },
    contact: {
        label: 'Contact',
        title: 'Get in touch.',
        intro: 'For questions about Shortly, privacy, or a link, you can reach the project owner here.',
        contacts: [
            { label: 'Name', value: 'Hamza Tamboowala' },
            { label: 'Location', value: 'Mumbai, India' },
            { label: 'Phone', value: '+91 9594415220', href: 'tel:+919594415220' }
        ],
        sections: [
            {
                title: 'Link safety',
                paragraphs: [
                    'Short links redirect to their original destinations. Check that you trust a link before opening it, and contact me if you believe a Shortly link is being misused.'
                ]
            }
        ]
    }
}

function InfoPage({ page }) {
    const content = pages[page]

    return (
        <div className="info-page">
            <Navbar />
            <main className="info-content">
                <div className="info-heading">
                    <p className="info-label">{content.label}</p>
                    <h1>{content.title}</h1>
                    <p className="info-intro">{content.intro}</p>
                </div>

                {content.contacts && (
                    <dl className="contact-details">
                        {content.contacts.map((contact) => (
                            <div className="contact-detail" key={contact.label}>
                                <dt>{contact.label}</dt>
                                <dd>
                                    {contact.href ? (
                                        <a href={contact.href}>{contact.value}</a>
                                    ) : contact.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}

                <div className="info-sections">
                    {content.sections.map((section) => (
                        <section className="info-section" key={section.title}>
                            <h2>{section.title}</h2>
                            {section.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </section>
                    ))}
                </div>

                <Link className="info-home-link" to="/">Back to Shortly</Link>
            </main>
            <Footer />
        </div>
    )
}

export default InfoPage