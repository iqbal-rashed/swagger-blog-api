const BlogModel = require("../models/Blog");

exports.createBlog = async (req, res) => {
    const { title, description, user_id } = req.body;
    try {
        if (!title || !description || !user_id) {
            throw MyError("Required data not found", 400);
        }
        const blogModel = new BlogModel({ title, description, user_id });
        await blogModel.save();

        res.status(200).send({
            success: true,
            message: "Blog created successfully!",
        });
    } catch (error) {
        res.status(error.status || 500).send({
            success: false,
            message: error.message,
        });
    }
};

exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        if (!id) {
            throw MyError("Required id not found", 403);
        }
        await BlogModel.updateOne({ _id: id }, { title, description });

        res.status(200).send({
            success: true,
            message: "Blog updated successfully!",
        });
    } catch (error) {
        res.status(error.status || 500).send({
            success: false,
            message: error.message,
        });
    }
};

exports.getBlog = async (req, res) => {
    const query = req.query;
    try {
        const allBlog = await BlogModel.find(query);

        if (!allBlog) {
            throw MyError("Blog not found", 403);
        }

        res.status(200).send({
            success: true,
            blogs: allBlog,
        });
    } catch (error) {
        res.status(error.status || 500).send({
            success: false,
            message: error.message,
        });
    }
};
exports.getSingleBlog = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw MyError("Id not found", 400);
        }
        const singleBlog = await BlogModel.findOne({ _id: id });

        if (!singleBlog) {
            throw MyError("Blog not found", 403);
        }

        res.status(200).send({
            success: true,
            singleBlog,
        });
    } catch (error) {
        res.status(error.status || 500).send({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw MyError("Id not found", 403);
        }
        await BlogModel.deleteOne({ _id: id });

        res.status(200).send({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(error.status || 500).send({
            success: false,
            message: error.message,
        });
    }
};

function MyError(message, status) {
    let err = new Error(message);
    err.status = status;
    return err;
}
