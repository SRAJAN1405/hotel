import express from "express";
import Reservation from "../models/table.model.js";

const router = express.Router();

router.put("/book", (req, res) => {
  const { name, phone, guests, date, time, specialRequests } = req.body;

  const reservation = new Reservation({
    name,
    phone,
    guests,
    date,
    time,
    specialRequests,
  });

  reservation
    .save()
    .then((savedReservation) => {
      res.status(201).json({
        success: true,
        reservation: savedReservation,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to save reservation" });
    });
});

router.get("/", (req, res) => {
  Reservation.find()
    .then((reservations) => {
      res.status(200).json({
        success: true,
        reservations,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: "Failed to fetch reservations",
      });
    });
});

export default router;
