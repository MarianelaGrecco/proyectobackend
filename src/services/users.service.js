import { response } from "express";
import { usersMongo } from "../persistencia/DAOs/MongoDAOs/usersMongo.js";
import { hashData } from "../utils/bcrypt.js";

class UsersService {
  async findAllUsers() {
    try {
      const users = await usersMongo.findAll();
      return users;
    } catch (error) {
      return error;
    }
  }

  async finOneUser(id) {
    try {
      const response = await usersMongo.findOneById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createOneUser(user) {
    try {
      const hashPassword = await hashData(user.password);
      const newUser = { ...user, password: hashPassword };

      console.log("User Object:", newUser);
      const response = await usersMongo.createOne(newUser);
  
      if (response) {
        const createdUser = response; 
      return createdUser;
      } else {
        console.error('Response from createOneUser:', response);
        return response; 
      }
    } catch (error) {
      console.error('Error in createOneUser:', error);
      return error;
    }
  }
  

  async userProfileData(id) {
    try {
      const logout = await usersMongo.findOneById(id);
      return logout;
    } catch (error) {
      throw error;
    }
  }
  
  async logoutUser() {
    try {
      return { message: 'Logout successful' };
    } catch (error) {
      throw error;
    }
  }


  async deleteOneUser(id) {
    try {
      const response = await usersMongo.deleteOne(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async cleanInactiveUsers() {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const result = await usersMongo.deleteMany({ lastConnection: { $lt: twoDaysAgo } });

  return result;
    } catch (error) {
      return error;
    }
  }
}


export const usersService = new UsersService ()
