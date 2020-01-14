const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const SessionController = require("./Controllers/SessionController");
const SpotController = require("./Controllers/SpotController");
const DashboardController = require("./Controllers/DashboardController");
const BookingController = require("./Controllers/BookingController");
const ApprovalController = require("./Controllers/ApprovalController");
const RejectionController = require("./Controllers/RejectController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/spots', upload.single("thumbnail"), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboards', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals',ApprovalController.store);
routes.post('/bookings/:booking_id/rejections',RejectionController.store);

module.exports = routes;