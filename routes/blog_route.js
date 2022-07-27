const router = require("express").Router();
const {
    createBlog,
    getBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
} = require("../controllers/blog_handler");

router.post("/", createBlog);
router.get("/", getBlog);
router.get("/:id", getSingleBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
