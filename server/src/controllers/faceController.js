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
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};