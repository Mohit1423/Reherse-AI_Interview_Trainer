import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "Please fill all required fields.",
        sucess: false
       });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        message: "User already exists with this email.",
        sucess: false
    });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: " Signed up successfully!",sucess: false });
  } catch (err) {
    res.status(500).json({ 
        message: "An error occurred while registering the user.",
        sucess: false
       });
  }
};


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    // Successful login
    res.status(200).json({
      message: 'Login Successful',
      user
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addInterview = async (req, res) => {
  try {
    const { userId, interview } = req.body;

    // Validate input
    if (!userId || !interview) {
      return res.status(400).json({ message: "Missing userId or interview data" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { interviews: interview } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Interview added successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
