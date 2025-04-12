import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Menus", href: "menus" },
  { label: "About Us", href: "about-us" },
  { label: "Our Chefs", href: "our-chefs" },
  { label: "Contact", href: "contact" },
  { label: "Admin", href: "admin" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-deep-brown shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.a
            href="/"
            className="text-3xl font-forum text-gold-crayola tracking-wide hover:text-white transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Icon icon="lucide:utensils" className="w-8 h-8" />
            Tandoor
          </motion.a>

          <nav className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              className="hidden lg:flex font-forum tracking-wide bg-gold-crayola text-deep-brown hover:bg-amber-400 hover:text-black transition-colors"
              color="warning"
              variant="solid"
              radius="full"
              size="sm"
              startContent={<Icon icon="lucide:calendar" />}
              onClick={() => (window.location.href = "#reservation")}
            >
              Reserve Table
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gold-crayola focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <Icon
                icon={isMenuOpen ? "lucide:x" : "lucide:menu"}
                className="w-8 h-8"
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-deep-brown/95 backdrop-blur-md"
            >
              <ul className="flex flex-col items-center py-8 gap-6">
                {NAV_ITEMS.map((item) => (
                  <NavItem
                    key={item.label}
                    {...item}
                    onClick={() => setIsMenuOpen(false)}
                  />
                ))}
                <li>
                  <Button
                    className="font-forum tracking-wide bg-gold-crayola text-deep-brown hover:bg-amber-400 hover:text-black transition-colors"
                    variant="solid"
                    radius="full"
                    size="sm"
                    startContent={
                      <Icon
                        icon="lucide:calendar"
                        className="text-deep-brown"
                      />
                    }
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.location.href = "#reservation";
                    }}
                  >
                    Reserve Table
                  </Button>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

const NavItem = ({ label, href, onClick }) => (
  <motion.li whileHover={{ scale: 1.1 }}>
    <Link
      to={href}
      className="text-white hover:text-gold-crayola transition-colors font-forum text-lg tracking-wide relative group"
      onClick={onClick}
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-crayola transition-all duration-300 group-hover:w-full" />
    </Link>
  </motion.li>
);

const ContactItem = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-sm text-gold-crayola/90">
    <Icon icon={icon} className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

const ContactLink = ({ icon, href, text }) => (
  <motion.a
    href={href}
    className="flex items-center gap-2 text-sm text-gold-crayola/90 hover:text-gold-crayola transition-colors"
    whileHover={{ scale: 1.05 }}
  >
    <Icon icon={icon} className="w-4 h-4" />
    <span>{text}</span>
  </motion.a>
);
