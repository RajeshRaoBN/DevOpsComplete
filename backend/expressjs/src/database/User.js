// In src/database/User.js
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");


const getAllUsers = () => {
  try {
    return DB.users;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneUser = (userId) => {
  try {
    const user = DB.users.find((user) => user.id === userId);
    if (!user) {
      throw {
        status: 400,
        message: `Can't find user with the id '${userId}'`,
      };
    }
    return user;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};


const createNewUser = (newUser) => {
  const isAlreadyAdded =
    DB.users.findIndex((user) => user.name === newUser.name) > -1;
  if (isAlreadyAdded) {
     throw {
      status: 400,
      message: `User with the name '${newUser.name}' already exists`,
    };
  }
  try {
    DB.users.push(newUser);
    saveToDatabase(DB);
    return newUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneUser = (userId, changes) => {
  try {
    const isAlreadyAdded =
      DB.users.findIndex((user) => user.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `User with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.users.findIndex(
      (user) => user.id === userId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find user with the id '${userId}'`,
      };
    }
    const updatedUser = {
      ...DB.users[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.users[indexForUpdate] = updatedUser;
    saveToDatabase(DB);
    return updatedUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneUser = (userId) => {
  try {
    const indexForDeletion = DB.users.findIndex(
      (user) => user.id === userId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find user with the id '${userId}'`,
      };
    }
    DB.users.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = { 
    getAllUsers,
    createNewUser,
    getOneUser,
    updateOneUser,
    deleteOneUser,
 };