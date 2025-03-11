// In src/controllers/userController.js
const userService = require("../services/userService");


const getAllUsers = (req, res) => {
    try {
        const allUsers = userService.getAllUsers();
        res.send({ status: "OK", data: allUsers });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneUser = (req, res) => {
    const {
        params: { userId },
    } = req;
    if (!userId) {
        res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':userId' can not be empty" },
      });
    }
    try {
        const user = userService.getOneUser(userId);
        res.send({ status: "OK", data: user });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewUser = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.email ||
    !body.password ||
    !body.mobile ||
    !body.description
  ) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'email', 'password', 'mobile', 'discription'",
        },
      });
    return;
  }
  const newUser = {
    name: body.name,
    email: body.email,
    password: body.password,
    mobile: body.mobile,
    description: body.description,
  };
  try {
    const createdUser = userService.createNewUser(newUser);
    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneUser = (req, res) => {
    const {
    body,
    params: { userId },
  } = req;
  if (!userId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':userId' can not be empty" },
      });
  }
  try {
    const updatedUser = userService.updateOneUser(userId, body);
    res.send({ status: "OK", data: updatedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneUser = (req, res) => {
    const {
        params: { userId },
    } = req;
    if (!userId) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: { error: "Parameter ':userId' can not be empty" },
        });
    }
    try {
        userService.deleteOneUser(userId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};