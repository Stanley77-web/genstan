import UserService from "../services/userServices";
import { Request, Response } from "express";

const userService = new UserService();

class UserController {
  async create(req: Request, res: Response) {
    // Create a new user
    try {
      const body = req.body;

      const user = await userService.create(body);
    
      if (!user) {
        return res.status(400).send('User not created');
      } else {
        return res.status(201).send(user);
      }
    } catch (error) {
      return res.status(500).send('Internal server error');
    }
  }

  async list(req: Request, res: Response) {
    // Get all users
    try {
      const users = await userService.list();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send('Internal server error');
    }
  }

  async findById (req: Request, res: Response) {
    // Get user by ID
    try {
      const userId = req.params.id;
      const user = await userService.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      } else {
        return res.status(200).send(user);
      }
    } catch (error) {
      return res.status(500).send('Internal server error');
    }
  }

  async findUserAccount (req: Request, res: Response) {
    // Get user account
    try {
      const { email, password } = req.body;
      const user = await userService.findUserAccount(email, password);

      if (!user) {
        return res.status(404).send('User not found');
      } else {
        return res.status(200).send(user);
      }
    } catch (error) {
      return res.status(500).send('Internal server error');
    }
  }
}

export default UserController;