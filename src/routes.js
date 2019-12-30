const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const SessionController = require("./Controllers/SessionController");
const SpotController = require("./Controllers/SpotController");
const DashboardController = require("./Controllers/DashboardController");
const BookingController = require("./Controllers/BookingController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/spots', upload.single("thumbnail"), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboards', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;