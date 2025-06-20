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
import { CartProvider } from "./CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartPage } from "./pages/CartPage";

function HomePage() {
  return (
    <>
      <Hero />
      <CookieFeatures />
      <CookieProducts />
      <CookieDescription />
      <FeaturedCookies />
      <BiggestCookie />
      <ContactForm />
    </>
  )
}

function App() {
  // Smooth scroll behavior for the entire app
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;