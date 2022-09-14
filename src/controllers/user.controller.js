import jwt from "jsonwebtoken";
import User from "../models/Users";

export const findAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const findUserById = async (req, res) => {
  const userById = await User.findById(req.params.id);
  res.json(userById);
};

export const createUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  const newUser = new User({
    name,
    lastname: lastname ? lastname : "",
    email,
    password,
  });

  const userSaved = await newUser.save();
  res.json(userSaved);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfull" });
};

export const updateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id);
  res.json({ message: "User updated successfull" });
};

// Register users
export const registerUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  const newUser = new User({ name, lastname, email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, process.env.SECRETKEY);
  res.status(200).json({ token });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send("The email doesn't exists");
  const match = await user.matchPassword(password);
  console.log(match, password);
  if (!match) return res.status(401).send("Wrong password");

  const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY);
  return res.status(200).json({ token });
};

export function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unathorize request");
  }

  const token = req.headers.authorization.split(" ")[1];

  if (token === "null") {
    return res.status(401).send("Unathorize request");
  }

  const payload = jwt.verify(token, process.env.SECRETKEY);
  req.userId = payload._id;
  next();
}
