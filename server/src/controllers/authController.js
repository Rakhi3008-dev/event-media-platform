import bcrypt from "bcrypt";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users(name,email,password)
       VALUES($1,$2,$3)
       RETURNING id,name,email,role`,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      user: newUser.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const userResult = await pool.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
      );
  
      if (userResult.rows.length === 0) {
        return res.status(400).json({
          message: "Invalid credentials"
        });
      }
  
      const user = userResult.rows[0];
  
      const isMatch = await bcrypt.compare(
        password,
        user.password
      );
  
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials"
        });
      }
  
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d"
        }
      );
  
      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message
      });
    }
  };