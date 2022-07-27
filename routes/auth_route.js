const router = require("express").Router();
const { signupHandler, loginHandler } = require("../controllers/auth_handler");

router.post("/signup", signupHandler);

router.post("/login", loginHandler);

module.exports = router;
