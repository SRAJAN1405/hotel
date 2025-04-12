import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Button } from "@heroui/react";

const events = [
  {
    image: "https://img.heroui.chat/image/food?w=350&h=450&u=3",
    date: "15/09/2024",
    category: "Food & Flavour",
    title: "Savor the Taste Beyond Your Eyes",
  },
  {
    image: "https://img.heroui.chat/image/food?w=350&h=450&u=4",
    date: "08/09/2024",
    category: "Healthy Living",
    title: "Pure Bliss in Every Bite",
  },
  {
    image: "https://img.heroui.chat/image/food?w=350&h=450&u=5",
    date: "03/09/2024",
    category: "Culinary Arts",
    title: "A Feast for All Senses",
  },
];

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9, rotate: 2 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.2,
      ease: [0.43, 0.13, 0.23, 0.96], // Smooth bounce
    },
  }),
  hover: {
    scale: 1.05,
    rotate: 1,
    boxShadow: "0px 10px 20px rgba(207, 143, 45, 0.2)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: { scale: 1.08, transition: { duration: 0.5 } },
};

const dateBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { delay: 0.3, duration: 0.5, type: "spring", stiffness: 120 },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.3 },
  },
};

export const Events = () => {
  return (
    <section
      className="section event bg-gradient-to-br from-[#3C2F2F] to-[#2E2525] py-20 relative overflow-hidden"
      aria-label="event"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,143,45,0.1),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.p
            variants={textVariants}
            className="section-subtitle text-lg text-amber-400 font-forum mb-4 tracking-wide"
          >
            Latest Highlights
          </motion.p>
          <motion.h2
            variants={textVariants}
            className="section-title text-4xl md:text-5xl text-white font-forum font-bold"
          >
            Upcoming Experiences
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card className="event-card bg-[#4A3C3C]/90 rounded-xl overflow-hidden shadow-lg border border-amber-500/20">
                <div className="relative group">
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[450px] object-cover"
                    loading="lazy"
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                  />
                  <motion.time
                    className="publish-date absolute top-4 left-4 bg-gray-900/80 text-amber-300 px-3 py-1 rounded-md text-sm font-medium"
                    dateTime={event.date}
                    variants={dateBadgeVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                  >
                    {event.date}
                  </motion.time>
                </div>
                <CardBody className="mt-4 px-4 pb-6">
                  <motion.p
                    variants={textVariants}
                    className="card-subtitle text-amber-300 text-center text-sm font-medium mb-2"
                  >
                    {event.category}
                  </motion.p>
                  <motion.h3
                    variants={textVariants}
                    className="card-title text-xl text-white text-center font-forum font-semibold line-clamp-2"
                  >
                    {event.title}
                  </motion.h3>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          {" "}
          {/* Removed motion wrapper */}
          <Button
            className="btn bg-amber-500 text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md"
            variant="flat"
          >
            <span className="text text-lg">Explore Our Blog</span>
          </Button>
        </div>
      </div>
    </section>
  );
};


