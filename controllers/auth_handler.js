const UserModel = require("../models/User");

exports.signupHandler = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            throw MyError("Input data not found", 400);
        }

        const checkUser = await UserModel.findOne({ email });
        if (checkUser) {
            throw MyError("User already exist!", 409);
        }

        const userModel = new UserModel({ name, email, password });
        await userModel.save();

        res.status(201).send({
            success: true,
            message: "User created successfully!",
        });
    } catch (error) {
        res.status(error.status || 500).send({
            success: false,
            message: error.message,
        });
    }
};

exports.loginHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw MyError("Input data not found", 400);
        }

        const user = await UserModel.findOne({ email });
        const checkPass = user && user.password == password;

        if (!user || !checkPass) {
            throw MyError("Invalid credentials", 403);
        }

        res.status(200).send({
            success: true,
            message: "Login Successfully",
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
