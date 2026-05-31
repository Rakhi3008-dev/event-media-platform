import pool from "../config/db.js";

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