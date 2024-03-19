import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {createAccesToken} from '../libs/jwt.js'
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {

    const userFound = await User.findOne({email})
    if (userFound) {
      return res.status(400).json({error: ["El email ya está en uso"]})
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccesToken({id: userSaved._id})

    res.cookie('token', token) 
    res.json({
        message: "Usuario creado exitosamente",
        id: userSaved.id,
        email: userSaved.email,
        username: userSaved.username,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
    })
     
  } catch (error) {
   res.status(500).json({message: error.message})
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const userFound = await User.findOne({email})

    if (!userFound) return res.status(400).json({error : ["Usuario no encontrado"]})

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json({error: ["Contraseña incorrecta"]})

    const token = await createAccesToken({id: userFound._id})

    res.cookie('token', token)
     res.json({
      message: "Bienvenido al sistema",
      id: userFound.id,
      email: userFound.email,
      username: userFound.username,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    }); 
  } catch (error) {
   res.status(500).json({message: error.message})
  }
};

export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound =  await User.findById(req.user.id)

  if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})
  
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })

};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if(!token) return res.status(401).json({message: "Unauthorized"})

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({message: "Unauthorized"})

    const userFound = await User.findById(user.id)
    if(!userFound) return res.status(401).json({message: "Unauthorized"})

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}