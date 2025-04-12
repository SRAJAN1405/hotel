import React from "react";
import { Icon } from "@iconify/react";
import { Input, Button } from "@heroui/react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-deep-brown/95 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <a
              href="/"
              className="text-3xl font-forum text-gold-crayola flex items-center gap-2"
            >
              <Icon icon="lucide:utensils" className="w-8 h-8" />
              Tandoor
            </a>
            <p className="text-white/70">
              Experience the authentic taste of Indian cuisine in a luxurious
              setting.
            </p>
            <div className="flex gap-4">
              {["facebook", "instagram", "twitter", "youtube"].map((social) => (
                <motion.a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-gold-crayola/10 flex items-center justify-center text-gold-crayola hover:bg-gold-crayola hover:text-deep-brown transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon icon={`lucide:${social}`} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-forum text-gold-crayola">
              Opening Hours
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between text-white/70">
                <span>Monday - Friday</span>
                <span>11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between text-white/70">
                <span>Saturday</span>
                <span>10:00 AM - 11:30 PM</span>
              </li>
              <li className="flex justify-between text-white/70">
                <span>Sunday</span>
                <span>10:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-forum text-gold-crayola">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/70">
                <Icon icon="lucide:map-pin" className="text-gold-crayola" />
                789 Saffron Road, Mumbai 400002, India
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Icon icon="lucide:phone" className="text-gold-crayola" />
                +91 987 654 3210
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Icon icon="lucide:mail" className="text-gold-crayola" />
                booking@tandoor.com
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-forum text-gold-crayola">Newsletter</h3>
            <p className="text-white/70">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Enter your email"
                variant="bordered"
                color="warning"
                startContent={<Icon icon="lucide:mail" />}
              />
              <Button
                color="warning"
                variant="solid"
                radius="none"
                className="w-full"
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gold-crayola/20 text-center text-white/60"
        >
          <p>© 2024 Tandoor Restaurant. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};
