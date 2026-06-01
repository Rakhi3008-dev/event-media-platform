import pool from "../config/db.js";

export const createEvent = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log("USER:", req.user);
      const {
        title,
        description,
        category,
        event_date,
        visibility,
      } = req.body;
  
      const created_by = req.user.id;
  
      const cover_image = req.file
        ? req.file.path
        : null;
  
      const result = await pool.query(
        `INSERT INTO events
        (
          title,
          description,
          category,
          event_date,
          visibility,
          cover_image,
          created_by
        )
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
        [
          title,
          description,
          category,
          event_date,
          visibility,
          cover_image,
          created_by,
        ]
      );
  
      res.status(201).json({
        success: true,
        event: result.rows[0],
      });
    } catch (error) {
        console.error("CREATE EVENT ERROR:", error);
        console.error(error.stack);
      
        res.status(500).json({
          message: error.message,
        });
      }
  };

export const getEvents = async (req, res) => {
  try {
    const { search } = req.query;

    let result;

    if (search) {
      result = await pool.query(
        `SELECT * FROM events
         WHERE LOWER(title) LIKE LOWER($1)
         ORDER BY created_at DESC`,
        [`%${search}%`]
      );
    } else {
      result = await pool.query(
        `SELECT * FROM events
         ORDER BY created_at DESC`
      );
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};