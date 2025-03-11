// In src/services/userService.js
const { v4: uuid } = require("uuid");
const User = require("../database/User");

const getAllUsers = () => {
    try {
      const allUsers = User.getAllUsers();
      return allUsers;
    } catch (error) {
      throw error;
    }
};

const getOneUser = (userId) => {
  try {
    const user = User.getOneUser(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const createNewUser = (newUser) => {
  const userToInsert = {
    ...newUser,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  }
  try {
    const createdUser = User.createNewUser(userToInsert);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const updateOneUser = (userId, changes) => {
  try {
    const updatedUser = User.updateOneUser(userId, changes);
    return updatedUser;
  } catch (error) {
    throw error;
  }
  
};

const deleteOneUser = (userId) => {
  try {
    User.deleteOneUser(userId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};