import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import axios from "axios";

// Guest and initial time options
const GUEST_OPTIONS = [
  { value: "1", label: "1 Person" },
  { value: "2", label: "2 People" },
  { value: "4", label: "4 People" },
  { value: "6", label: "6 People" },
  { value: "8", label: "8+ People" },
];

// Mock dynamic time slots based on date
const getTimeOptions = (date) => {
  const today = new Date().toISOString().split("T")[0];
  if (date === today) {
    return [
      { value: "19:00", label: "7:00 PM" },
      { value: "20:00", label: "8:00 PM" },
    ];
  }
  return [
    { value: "17:00", label: "5:00 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "19:00", label: "7:00 PM" },
    { value: "20:00", label: "8:00 PM" },
    { value: "21:00", label: "9:00 PM" },
  ];
};

export const ReservationSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeOptions, setTimeOptions] = useState([]);

  // Handle input change with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);

    if (name === "date") {
      const newTimeOptions = getTimeOptions(value);
      setTimeOptions(newTimeOptions);
      // Reset time only if the current time isn’t in the new options
      setFormData((prev) => ({
        ...prev,
        time: newTimeOptions.some((opt) => opt.value === prev.time)
          ? prev.time
          : "",
      }));
    }
  };

  // Field-specific validation
  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;
      case "phone":
        if (!/^[0-9]{10}$/.test(value))
          error = "Enter a valid 10-digit phone number";
        break;
      case "guests":
        if (!value) error = "Select number of guests";
        break;
      case "date":
        if (!value) error = "Select a date";
        else if (
          new Date(value) < new Date(new Date().toISOString().split("T")[0])
        )
          error = "Date cannot be in the past";
        break;
      case "time":
        if (!value) error = "Select a time";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.guests) newErrors.guests = "Select number of guests";
    if (!formData.date) newErrors.date = "Select a date";
    else if (
      new Date(formData.date) < new Date(new Date().toISOString().split("T")[0])
    )
      newErrors.date = "Date cannot be in the past";
    if (!formData.time) newErrors.time = "Select a time";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered with data:", formData);
    if (!validateForm()) {
      console.log("Validation failed, errors:", errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(
        "http://localhost:10000/api/table/book",
        formData
      );
      console.log("Reservation submitted successfully:", response.data);
      setShowModal(true);

      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
      setTimeOptions([]);
      setShowModal(false);
      setErrors({
        form: "Failed to submit reservation. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form after successful booking
  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      phone: "",
      guests: "",
      date: "",
      time: "",
      specialRequests: "",
    });
    setErrors({});
  };

  // Update time options on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTimeOptions(getTimeOptions(today));
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-deep-brown to-maroon relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto bg-deep-brown/80 backdrop-blur-md p-8 rounded-lg shadow-xl border border-gold-crayola/20"
        >
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gold-crayola font-forum text-xl tracking-wider uppercase"
            >
              Reservation
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-5xl font-forum text-white font-bold"
            >
              Book Your Culinary Journey
            </motion.h2>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              <Input
                label="Your Name"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                startContent={
                  <Icon icon="lucide:user" className="text-gold-crayola" />
                }
                color="default"
                variant="bordered"
                isRequired
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                className="text-white placeholder:text-gray-300"
                classNames={{
                  label: "text-gold-crayola",
                  input: "text-white",
                  inputWrapper:
                    "border-gold-crayola/50 hover:border-gold-crayola focus-within:border-gold-crayola bg-deep-brown/50",
                }}
              />

              <Input
                label="Phone Number"
                placeholder="Enter phone number (10 digits)"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                startContent={
                  <Icon icon="lucide:phone" className="text-gold-crayola" />
                }
                color="default"
                variant="bordered"
                isRequired
                isInvalid={!!errors.phone}
                errorMessage={errors.phone}
                className="text-white placeholder:text-gray-300"
                classNames={{
                  label: "text-gold-crayola",
                  input: "text-white",
                  inputWrapper:
                    "border-gold-crayola/50 hover:border-gold-crayola focus-within:border-gold-crayola bg-deep-brown/50",
                }}
              />

              <Select
                label="Number of Guests"
                placeholder="Select number of guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                color="default"
                variant="bordered"
                isRequired
                isInvalid={!!errors.guests}
                errorMessage={errors.guests}
                className="text-white"
                classNames={{
                  label: "text-gold-crayola",
                  trigger:
                    "border-gold-crayola/50 hover:border-gold-crayola focus-within:border-gold-crayola bg-deep-brown/50 text-white",
                  value: "text-white",
                  popoverContent: "bg-deep-brown text-white",
                }}
              >
                {GUEST_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-white hover:bg-gold-crayola/20"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                color="default"
                variant="bordered"
                isRequired
                min={new Date().toISOString().split("T")[0]}
                isInvalid={!!errors.date}
                errorMessage={errors.date}
                className="text-white placeholder:text-gray-300"
                classNames={{
                  label: "text-gold-crayola",
                  input: "text-white",
                  inputWrapper:
                    "border-gold-crayola/50 hover:border-gold-crayola focus-within:border-gold-crayola bg-deep-brown/50",
                }}
              />

              <Select
                label="Time"
                placeholder="Select time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                color="default"
                variant="bordered"
                isRequired
                isInvalid={!!errors.time}
                errorMessage={errors.time}
                isDisabled={!formData.date}
                className="text-white"
                classNames={{
                  label: "text-gold-crayola",
                  trigger:
                    "border-gold-crayola/50 hover:border-gold-crayola focus-within:border-gold-crayola bg-deep-brown/50 text-white",
                  value: "text-white",
                  popoverContent: "bg-deep-brown text-white",
                }}
              >
                {timeOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-white hover:bg-gold-crayola/20"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              <Textarea
                label="Special Requests"
                placeholder="Dietary preferences, seating requests, etc."
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                color="default"
                variant="bordered"
                minRows={4}
                maxLength={200}
                description={`${formData.specialRequests.length}/200 characters`}
                className="text-white placeholder:text-gray-300"
                classNames={{
                  label: "text-gold-crayola",
                  input: "text-white",
                  inputWrapper:
                    "border-gold-crayola/50 hover:border-gold-crayola focus-within:border-gold-crayola bg-deep-brown/50",
                  description: "text-gray-300",
                }}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gold-crayola/10 p-6 rounded-lg space-y-4 border border-gold-crayola/30"
              >
                <ContactDetail
                  icon="lucide:map-pin"
                  text="789 Saffron Road, Mumbai 400002, India"
                />
                <ContactDetail
                  icon="lucide:clock"
                  text="Daily: 11:00 AM - 11:00 PM"
                />
                <ContactDetail icon="lucide:phone" text="+91 987 654 3210" />
              </motion.div>

              <Button
                type="submit"
                color="warning"
                variant="solid"
                size="lg"
                radius="sm"
                className="w-full font-forum tracking-wide text-lg"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Confirm Reservation"}
              </Button>

              {errors.form && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-center font-forum"
                >
                  {errors.form}
                </motion.p>
              )}
            </motion.div>
          </form>
        </motion.div>

        <AnimatePresence>
          {showModal && (
            <Modal
              isOpen={showModal}
              onClose={handleModalClose}
              backdrop="blur"
            >
              <ModalContent className="bg-deep-brown text-white">
                <ModalHeader className="text-gold-crayola font-forum text-2xl">
                  Reservation Confirmed
                </ModalHeader>
                <ModalBody>
                  <p>
                    Thank you, <strong>{formData.name}</strong>! Your table for{" "}
                    <strong>{formData.guests}</strong> is booked on{" "}
                    <strong>
                      {new Date(formData.date).toLocaleDateString()}
                    </strong>{" "}
                    at <strong>{formData.time}</strong>.
                  </p>
                  {formData.specialRequests && (
                    <p className="text-gold-crayola mt-2">
                      Special Requests: {formData.specialRequests}
                    </p>
                  )}
                  <p className="mt-2">
                    We’ll send a confirmation to{" "}
                    <strong>{formData.phone}</strong>.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="warning"
                    variant="solid"
                    onClick={handleModalClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Reusable Contact Detail Component
const ContactDetail = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-gold-crayola">
    <Icon icon={icon} className="w-5 h-5" />
    <span>{text}</span>
  </div>
);
export default ReservationSection;
