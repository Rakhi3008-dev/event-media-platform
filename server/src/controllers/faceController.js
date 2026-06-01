import pool from "../config/db.js";
import { compareFaces } from "../utils/compareFaces.js";

export const uploadSelfie = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("USER:", req.user);
    const selfie_url = req.file.path;
    const result = await pool.query(
      `INSERT INTO face_profiles
      (user_id, selfie_url)
      VALUES($1,$2)
      RETURNING *`,
      [
        req.user.id,
        selfie_url
      ]
    );
    const allMedia = await pool.query(`
        SELECT *
        FROM media
        WHERE media_url LIKE 'https%'
      `);
      for (const media of allMedia.rows) {

        const matched = await compareFaces(
          selfie_url,
          media.media_url
        );
      
        if (matched) {
      
          await pool.query(
            `INSERT INTO face_matches
            (
              media_id,
              user_id,
              confidence
            )
            VALUES($1,$2,$3)`,
            [
              media.id,
              req.user.id,
              95
            ]
          );
      
        }
      }

    res.json({
      success: true,
      profile: result.rows[0]
    });

  } catch (error) {
    console.error("UPLOAD SELFIE ERROR:", error);
  
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getMySelfie = async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT *
         FROM face_profiles
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT 1`,
        [req.user.id]
      );
  
      res.json(result.rows[0] || null);
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  export const getMyMatches = async (req, res) => {
    try {
  
      const result = await pool.query(
        `
        SELECT m.*
        FROM media m
  
        JOIN face_matches fm
        ON fm.media_id = m.id
  
        WHERE fm.user_id = $1
        `,
        [req.user.id]
      );
  
      res.json(result.rows);
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message,
      });
  
    }
  };