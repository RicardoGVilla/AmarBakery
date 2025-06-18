import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CookieFeatures } from "./components/CookieFeatures";
import { CookieProducts } from "./components/CookieProducts";
import { CookieDescription } from "./components/CookieDescription";
import { FeaturedCookies } from "./components/FeaturedCookies";
import { BiggestCookie } from "./components/BiggestCookie";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { useEffect } from "react";

function App() {
  // Smooth scroll behavior for the entire app
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <CookieFeatures />
        <CookieProducts />
        <CookieDescription />
        <FeaturedCookies />
        <BiggestCookie />
      </main>
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;