const router = require("express").Router();
const userRoutes = require("./userApi");
const noteRoutes = require("./noteApi");

router.use("/user", userRoutes);

router.use("/note", noteRoutes);

module.exports = router;