const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.route("/").get(usersController.index).post(usersController.addUser);

router.route("/:id").get(usersController.singleUser);

module.exports = router;
