import pool from "../config/db.js";

export const uploadMedia = async (req, res) => {
  
    try {
        console.log("FILE:", req.file);
        console.log("BODY:", req.body);
    
        const { event_id } = req.body;


    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const media_url = req.file.path;

    const tags = ["event", "photo"];

const result = await pool.query(
  `INSERT INTO media
  (event_id, uploaded_by, media_url, media_type, tags)
  VALUES($1,$2,$3,$4,$5)
  RETURNING *`,
  [
    event_id,
    req.user.id,
    media_url,
    req.file.mimetype,
    tags
  ]
);
    res.status(201).json({
      success: true,
      media: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};


export const getEventMedia = async (req, res) => {
  try {
    const { eventId } = req.params;

    const result = await pool.query(
      `SELECT * FROM media
       WHERE event_id=$1
       ORDER BY created_at DESC`,
      [eventId]
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};
export const deleteMedia = async (req, res) => {
    try {
      const { id } = req.params;
  
      await pool.query(
        "DELETE FROM media WHERE id=$1",
        [id]
      );
  
      res.json({
        success: true,
        message: "Media deleted",
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };