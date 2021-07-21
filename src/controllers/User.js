import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  registerValidation, loginValidation, profileValidate
} from "../validations/userValidation";
import User from "../services/user";
import jwtHelper from "../utilities/jwt";

dotenv.config();
const { generateToken } = jwtHelper;
const {
  emailExist, usernameExist, createUser, updateUserProfile, getAllUsers, updateUserProfilePicture
} = User;
/**
 * @class UserController
 * @description create, verify and log in user
 * @exports UserController
 */
export default class UserController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async registerUser(req, res) {
    try {
      const { error } = registerValidation(req.body);
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const { email, username, password } = req.body;
      const Email = email.toLowerCase();
      const Username = username.toLowerCase();
      const EmailExist = await emailExist(Email);
      const accountNo = await Math.floor((Math.random() * 2000000000) + 2000000000);
      if (EmailExist) return res.status(409).json({ status: 409, error: "Email already used by another user." });
      const UsernameExist = await usernameExist(Username);
      if (UsernameExist) return res.status(409).json({ status: 409, error: `Sorry, ${username} is not available. Please pick another username` });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        email: Email, username: Username, password: hashedPassword, accountNo
      };
      const createdUser = await createUser(newUser);
      return res.status(201).json({
        status: 201,
        message: "User created Successfuly, Kindly log in!",
        createdUser
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async loginUser(req, res) {
    try {
      const { error } = loginValidation(req.body);
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const { email, password } = req.body;
      const Email = email.toLowerCase();
      const user = await emailExist(Email);
      if (!user) return res.status(404).json({ status: 404, error: "Email does not exist." });
      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) return res.status(404).json({ status: 400, error: "Password is not correct!." });
      let { username, id } = user;
      const token = await generateToken({
        id,
        username,
        email
      });
      return res.status(200).json({
        status: 200,
        message: "User Logged in Successfully.",
        data: token
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updateUserProfile(req, res) {
    try {
      const { id } = req.decoded;
      const { error } = profileValidate(req.body);
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const updatedProfile = await updateUserProfile(id, req.body);
      return res.status(200).json({
        status: 200,
        message: "User profile updated.",
        data: updatedProfile[1]
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Resource not found." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updateUserPicture(req, res) {
    try {
      const { id } = req.decoded;
      if (!req.file) return res.status(401).json({ error: true, message: "Please provide an image." });
      const updatedProfile = await updateUserProfilePicture(id, req.file.path);
      return res.status(200).json({
        status: 200,
        message: "User profile picture updated.",
        data: updatedProfile[1]
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Resource not found." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getUsers(req, res) {
    try {
      const users = await getAllUsers();
      return res.status(200).json({ status: 200, message: "Successfully retrived all Users", data: users });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Resource not found." });
    }
  }
}
