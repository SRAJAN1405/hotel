import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/react";

const services = [
  {
    id: 1,
    image: "https://img.heroui.chat/image/food_category?w=285&h=336&u=1",
    title: "Breakfast",
    link: "#breakfast",
  },
  {
    id: 2,
    image: "https://img.heroui.chat/image/food_category?w=285&h=336&u=2",
    title: "Appetizers",
    link: "#appetizers",
  },
  {
    id: 3,
    image: "https://img.heroui.chat/image/food_category?w=285&h=336&u=3",
    title: "Drinks",
    link: "#drinks",
  },
];

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.2,
      ease: [0.6, -0.05, 0.01, 0.99], // Smooth elastic ease
    },
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0px 15px 30px rgba(207, 143, 45, 0.2)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const overlayVariants = {
  hidden: { opacity: 0.4 },
  hover: { opacity: 0, transition: { duration: 0.5 } },
};

export const ServiceSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#3C2F2F] to-[#2E2525]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.p
            variants={textVariants}
            className="text-amber-400 font-forum text-xl tracking-wide mb-4"
          >
            Flavors Fit for Royalty
          </motion.p>
          <motion.h2
            variants={textVariants}
            className="text-4xl md:text-5xl font-forum text-white font-bold mb-6"
          >
            Exceptional Culinary Arts
          </motion.h2>
          <motion.p variants={textVariants} className="text-gray-200 text-lg">
            Indulge in the finest Indian cuisine, crafted with tradition and
            passion.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card
                className="bg-[#4A3C3C]/90 border border-amber-500/30 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/10 transition-shadow duration-300"
                radius="lg"
              >
                <CardBody className="p-0">
                  <div className="relative overflow-hidden group">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[336px] object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      variants={overlayVariants}
                      initial="hidden"
                      whileHover="hover"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-forum text-amber-300 font-semibold mb-3">
                        {service.title}
                      </h3>
                      <a
                        href={service.link}
                        className="inline-block text-white bg-amber-500/20 hover:bg-amber-500 hover:text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                      >
                        Explore Menu
                      </a>
                    </motion.div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


