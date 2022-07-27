const UserModel = require("../models/User");
exports.getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw MyError("Id not found", 400);
        }

        const user = await UserModel.findOne({ _id: id });

        if (!user) {
            throw MyError("User not found", 401);
        }

        res.status(200).send({
            success: true,
            user,
        });
    } catch (error) {
        res.status(error.status || 500).send({
            success: false,
            message: error.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        if (!id) {
            throw MyError("Id not found", 400);
        }

        await UserModel.updateOne({ _id: id }, { name, email, password });

        res.status(200).send({
            success: true,
            message: "User updated successfully",
        });
    } catch (error) {
        res.status(error.status || 500).send({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw MyError("Id not found", 403);
        }

        await UserModel.deleteOne({ _id: id });

        res.status(200).send({
            success: true,
            message: "User deleted successfully",
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
