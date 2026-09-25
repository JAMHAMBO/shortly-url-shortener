import Footer from '../components/Footer'
import Features from '../components/home/Features'
import Slogan from '../components/home/Slogan'
import UrlShortener from '../components/home/UrlShortener'
import Navbar from '../components/Navbar'

function Home() {
    return (
        <>
            <Navbar />
            <Slogan />
            <UrlShortener />
            <Features />
            <Footer />
        </>
    )
}

export default Home