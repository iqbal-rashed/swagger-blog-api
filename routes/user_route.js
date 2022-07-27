const router = require("express").Router();
const {
    getSingleUser,
    updateUser,
    deleteUser,
} = require("../controllers/user_handler");

router.get("/:id", getSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
