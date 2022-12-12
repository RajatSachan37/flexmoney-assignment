const express = require("express");
const controller = require("../controllers/controller");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true })); //Body parser
router.use(methodOverride("_method"));

router.route("/").get(controller.enrollForm);

router
  .route("/complete-payment/:id")
  .get(controller.completePayment)
  .patch(controller.completeEnrollment);

router.route("/enroll").post(controller.enroll);

router
  .route("/change-batch")
  .get(controller.changeBatchForm)
  .patch(controller.changeBatch);

module.exports = router;
