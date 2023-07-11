const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel");

const adminCredentials = {
  adminId: "admin12345",
  name: "Admin",
  email: "admin@gmail.com",
  password: "123456",
};
module.exports = {
  adminLogin: (req, res) => {
    if (
      adminCredentials.email == req.body.email &&
      adminCredentials.password == req.body.password
    ) {
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(
        { adminId: adminCredentials.adminId, role: "Admin" },
        secret,
        { expiresIn: "1d" }
      );
      res.status(200).send({
        success: true,
        message: "Logged in successfully",
        adminToken: token,
        adminCredentials,
      });
    }
  },

  getAllUsers: async (req, res) => {
    await userSchema.user.find().then((allUsers) => {
      res.send(allUsers);
    });
  },

  editUser: async (req, res) => {
    await userSchema.user
      .updateOne(
        { _id: req.body.id },
        { name: req.body.name, email: req.body.email, mobile: req.body.mobile }
      )
      .then(() => {
        res.status(200).send({
          success: true,
          message: "Updated Successfully",
        });
      });
  },

  deleteUser: async (req, res) => {
    console.log(req.params.id);
    await userSchema.user.deleteOne({ _id: req.params.id }).then(() => {
      res.status(200).send({
        success: true,
        message: "Deleted Successfully",
      });
    });
  },

};
