import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import axios from "axios";

export const AdminPanel = () => {
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Dummy data for orders with transaction IDs (commented out)
  // const dummyOrders = [
  //   {
  //     _id: "txn_3928471029384756",
  //     items: [
  //       { id: "item1", name: "Butter Chicken", price: 350, quantity: 2 },
  //       { id: "item2", name: "Naan", price: 40, quantity: 4 },
  //     ],
  //     total: 860,
  //     status: "confirmed",
  //     createdAt: "2025-04-11T10:30:00Z",
  //   },
  //   {
  //     _id: "txn_6872041359876234",
  //     items: [
  //       { id: "item3", name: "Paneer Tikka", price: 300, quantity: 1 },
  //       { id: "item4", name: "Biryani", price: 400, quantity: 2 },
  //     ],
  //     total: 1100,
  //     status: "confirmed",
  //     createdAt: "2025-04-11T12:15:00Z",
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [ordersResponse, reservationsResponse] = await Promise.all([
          axios.get("https://hotel-cqng.onrender.com/api/order"),
          axios.get("https://hotel-cqng.onrender.com/api/table"),
        ]);

        setOrders(ordersResponse.data || []);
        setReservations(reservationsResponse.data?.reservations || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setOrders([]);
        setReservations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle expanded order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.93 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: i * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0px 15px 30px rgba(207, 143, 45, 0.4)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(217, 119, 6, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#2E2525] to-[#1A1212] relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,143,45,0.15),transparent_60%)] pointer-events-none" />
      <div className="container mx-auto px-6">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          className="text-5xl md:text-6xl font-forum text-gradient bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent text-center mb-14 tracking-wide"
        >
          Admin Panel - Orders & Reservations
        </motion.h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <div className="space-y-12">
            {/* Confirmed Orders Section - First Full-Width Row */}
            <div>
              <motion.h2
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                className="text-3xl md:text-4xl font-forum text-amber-300 text-center mb-6"
              >
                Confirmed Orders
              </motion.h2>
              {orders.length === 0 ? (
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="text-center text-amber-300 text-xl"
                >
                  No confirmed orders available.
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {orders.map((order, index) => (
                    <motion.div
                      key={order._id}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      variants={cardVariants}
                      className="w-full"
                    >
                      <Card className="bg-[#3D2F2F]/70 backdrop-blur-lg border border-amber-500/30 rounded-2xl shadow-xl overflow-hidden transform-gpu min-h-[450px]">
                        <CardBody className="p-8 text-white space-y-6 relative flex flex-col justify-between h-full">
                          {/* Transaction ID with # on separate line */}
                          <motion.div
                            variants={textVariants}
                            className="text-xl font-semibold text-amber-300 text-center mb-2"
                          >
                            #
                          </motion.div>
                          <motion.div
                            variants={textVariants}
                            className="text-2xl font-semibold text-amber-300 text-center mb-6"
                          >
                            {order._id}
                          </motion.div>

                          {/* Status */}
                          <motion.div
                            variants={textVariants}
                            className="flex justify-center mb-6"
                          >
                            <span className="px-4 py-2 rounded-full text-sm font-medium shadow-inner bg-green-600/20 text-green-300 border-green-500/30">
                              {order.status}
                            </span>
                          </motion.div>

                          {/* Order Summary */}
                          <div className="flex flex-col flex-grow space-y-4">
                            <motion.div
                              variants={textVariants}
                              className="space-y-2 text-center"
                            >
                              <p className="text-base text-amber-400 opacity-80">
                                Items
                              </p>
                              <ul className="text-lg font-medium">
                                {order.items.map((item) => (
                                  <li key={item.id}>
                                    {item.name} (x{item.quantity})
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                            <motion.div
                              variants={textVariants}
                              className="space-y-2 text-center"
                            >
                              <p className="text-base text-amber-400 opacity-80">
                                Total
                              </p>
                              <p className="text-lg font-medium">
                                ₹{order.total.toFixed(2)}
                              </p>
                              <p className="text-base text-amber-400 opacity-80">
                                Ordered At
                              </p>
                              <p className="text-lg font-medium">
                                {new Date(order.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </motion.div>
                          </div>

                          {/* Expanded Details */}
                          <motion.div
                            variants={detailsVariants}
                            initial="hidden"
                            animate={
                              expandedOrder === order._id ? "visible" : "hidden"
                            }
                            className="overflow-hidden"
                          >
                            {expandedOrder === order._id && (
                              <div className="mt-6 p-6 bg-amber-500/10 rounded-lg">
                                <h4 className="text-lg font-forum text-amber-300 mb-4">
                                  Order Details
                                </h4>
                                <table className="w-full text-left">
                                  <thead>
                                    <tr className="text-amber-400 opacity-80">
                                      <th className="py-3">Item</th>
                                      <th className="py-3">Quantity</th>
                                      <th className="py-3">Price</th>
                                      <th className="py-3">Subtotal</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order.items.map((item) => (
                                      <tr
                                        key={item.id}
                                        className="border-t border-amber-500/20"
                                      >
                                        <td className="py-3">{item.name}</td>
                                        <td className="py-3">
                                          {item.quantity}
                                        </td>
                                        <td className="py-3">
                                          ₹{item.price.toFixed(2)}
                                        </td>
                                        <td className="py-3">
                                          ₹
                                          {(item.price * item.quantity).toFixed(
                                            2
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                                <p className="mt-4 text-lg font-medium text-amber-300">
                                  Total: ₹{order.total.toFixed(2)}
                                </p>
                              </div>
                            )}
                          </motion.div>

                          {/* Bottom Section with Button */}
                          <div className="flex justify-center mt-6">
                            <motion.div variants={textVariants}>
                              <Button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="bg-gradient-to-br from-amber-600 to-orange-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center"
                                size="md"
                                onPress={() => toggleOrderDetails(order._id)}
                              >
                                <Icon
                                  icon={
                                    expandedOrder === order._id
                                      ? "lucide:chevron-up"
                                      : "lucide:eye"
                                  }
                                  className="w-5 h-5 mr-2"
                                />
                                {expandedOrder === order._id
                                  ? "Hide Details"
                                  : "View Details"}
                              </Button>
                            </motion.div>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Reservations Section - Second Full-Width Row */}
            <div>
              <motion.h2
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                className="text-3xl md:text-4xl font-forum text-amber-300 text-center mb-6"
              >
                Reservations
              </motion.h2>
              {reservations.length === 0 ? (
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="text-center text-amber-300 text-xl"
                >
                  No reservations available.
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {reservations.map((reservation, index) => (
                    <motion.div
                      key={reservation._id}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      variants={cardVariants}
                      className="w-full"
                    >
                      <Card className="bg-[#3D2F2F]/70 backdrop-blur-lg border border-amber-500/30 rounded-2xl shadow-xl overflow-hidden transform-gpu min-h-[450px]">
                        <CardBody className="p-8 text-white space-y-6 relative flex flex-col justify-between h-full">
                          {/* Reservation ID with # on separate line */}
                          <motion.div
                            variants={textVariants}
                            className="text-xl font-semibold text-amber-300 text-center mb-2"
                          >
                            #
                          </motion.div>
                          <motion.div
                            variants={textVariants}
                            className="text-2xl font-semibold text-amber-300 text-center mb-6"
                          >
                            {reservation._id}
                          </motion.div>

                          {/* Status */}
                          <motion.div
                            variants={textVariants}
                            className="flex justify-center mb-6"
                          >
                            <span
                              className={`px-4 py-2 rounded-full text-sm font-medium shadow-inner ${
                                reservation.status === "Confirmed"
                                  ? "bg-green-600/20 text-green-300 border-green-500/30"
                                  : reservation.status === "Pending"
                                  ? "bg-yellow-600/20 text-yellow-300 border-yellow-500/30"
                                  : "bg-gray-600/20 text-gray-300 border-gray-500/30"
                              }`}
                            >
                              {reservation.status}
                            </span>
                          </motion.div>

                          {/* Reservation Summary */}
                          <div className="flex flex-col flex-grow space-y-4">
                            <motion.div
                              variants={textVariants}
                              className="space-y-2 text-center"
                            >
                              <p className="text-base text-amber-400 opacity-80">
                                Name
                              </p>
                              <p className="text-lg font-medium">
                                {reservation.name}
                              </p>
                            </motion.div>
                            <motion.div
                              variants={textVariants}
                              className="space-y-2 text-center"
                            >
                              <p className="text-base text-amber-400 opacity-80">
                                Guests
                              </p>
                              <p className="text-lg font-medium">
                                {reservation.guests}
                              </p>
                            </motion.div>
                            <motion.div
                              variants={textVariants}
                              className="space-y-2 text-center"
                            >
                              <p className="text-base text-amber-400 opacity-80">
                                Time
                              </p>
                              <p className="text-lg font-medium">
                                {reservation.time}
                              </p>
                            </motion.div>
                            <motion.div
                              variants={textVariants}
                              className="space-y-2 text-center"
                            >
                              <p className="text-base text-amber-400 opacity-80">
                                Date
                              </p>
                              <p className="text-lg font-medium">
                                {reservation.date}
                              </p>
                            </motion.div>
                          </div>

                          {/* Removed View Details and Grey Empty Icon */}
                          <div className="mt-6">
                            {/* No button or icon here */}
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
