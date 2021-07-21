import database from "../models";

/**
 * @class User
 * @description User services
 * @exports User
 */
export default class User {
  /**
   * @param {string} username - The user name
   * @returns {object} - An instance of the Users model class
   */
  static async usernameExist(username) {
    try {
      const usernameExist = await database.Users.findOne({
        where: {
          username
        }
      });
      return usernameExist;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @returns {object} An instance of the comment class
   */
  static async getAllUsers() {
    try {
      //
      return await database.Users.findAll({
        include: [
          { model: database.Profiles, as: "profiles" },
          { model: database.Credits, as: "credits" },
          { model: database.Debits, as: "debits" },
        ]
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} email  - The user email
   * @returns {object} - An instance of the Users model class
   */
  static async emailExist(email) {
    try {
      return await database.Users.findOne({
        where: {
          email
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {object} newUser - The user details
   * @returns {object} - An instance of the Users model class
   */
  static async createUser(newUser) {
    try {
      const createUser = await database.Users.create(newUser);
      const userToUpdate = await database.Users.findOne({
        where: {
          id: createUser.id
        }
      });
      if (userToUpdate) {
        const newProfile = {
          userId: userToUpdate.id
        };
        await database.Profiles.create(newProfile);
        return createUser;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} id - The user id
   * @param {string} profile - The user profile details
   * @returns {object} - An instance of the Profile model class
   */
  static async updateUserProfile(id, profile) {
    try {
      return await database.Profiles.update(profile, {
        where: { userId: id },
        returning: true,
        plain: true
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} id - The user id
   * @param {string} profile - The user profile picture details
   * @returns {object} - An instance of the Profile model class
   */
  static async updateUserProfilePicture(id, profile) {
    try {
      return await database.Profiles.update({ profilePicture: profile }, {
        where: { userId: id },
        returning: true,
        plain: true
      });
    } catch (error) {
      throw error;
    }
  }
}
