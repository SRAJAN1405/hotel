import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./component/layout/navbar.jsx";
import { Footer } from "./component/layout/footer.jsx";
import { HeroSection } from "./component/hero-section.jsx";
import { ServiceSection } from "./component/sections/service-section.jsx";
import AboutSection from "./component/sections/about-section.jsx";
import { SpecialDishSection } from "./component/sections/special-dish-section.jsx";
import { MenuSection } from "./component/sections/menu-section.jsx";
import { TestimonialSection } from "./component/sections/testimonial-section.jsx";
import { ReservationSection } from "./component/sections/reservation-section.jsx";
import { Events } from "./component/sections/our-events-section.jsx";
import { Features } from "./component/sections/our-strength-section.jsx";
import { AdminPanel } from "./component/AdminPanel.jsx";
import MenuAndCartWithProvider from "./component/sections/all-dishes.jsx";

function App() {
  return (
    <Router>
      <main className="bg-deep-brown min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ServiceSection />
                <AboutSection />
                <SpecialDishSection />
                <MenuSection />
                <Features />
                <Events />
                <TestimonialSection />
                <ReservationSection />
              </>
            }
          />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/menu" element={<MenuAndCartWithProvider />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
