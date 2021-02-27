import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import { JWT } from "../services/JWT";

import { Password } from "../services/Password";

class UserController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const usersRepository = getRepository(User);

    var user = await usersRepository.findOne({
      where: {
        password: new Password().encrypt(password),
        email,
      },
    });

    if (!user)
      return response.status(400).json({
        error: "User not found or does not exists!",
      });

    delete user.password;

    response.json({
      data: {
        ...user,
        token: new JWT().generateToken(user.id),
      },
    });
  }

  async create(request: Request, response: Response) {
    const { name, password, email } = request.body;

    if (!name || !password || !email)
      return response.status(400).json({
        error: "Incorrect params or does not exists!",
      });

    const usersRepository = getRepository(User);

    var userExists = await usersRepository.findOne({ email });
    if (userExists)
      return response.status(400).json({
        error: "User already exist!",
      });

    var user = usersRepository.create({
      password: new Password().encrypt(password),
      email,
      name,
    });
    await usersRepository.save(user);

    delete user.password;

    return response.json(user);
  }

  async getAll(request: Request, response: Response) {
    const usersRepository = getRepository(User);
    var users = await usersRepository.find();

    response.json({
      data: users,
    });
  }
}

export { UserController };
