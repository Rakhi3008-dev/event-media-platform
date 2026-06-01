import pool from "../config/db.js";

export const getStats = async (req, res) => {
  try {
    const totalEvents = await pool.query(
      "SELECT COUNT(*) FROM events"
    );

    const totalMedia = await pool.query(
      "SELECT COUNT(*) FROM media"
    );

    const totalLikes = await pool.query(
      "SELECT COUNT(*) FROM likes"
    );

    const totalComments = await pool.query(
      "SELECT COUNT(*) FROM comments"
    );

    res.json({
      totalEvents: totalEvents.rows[0].count,
      totalMedia: totalMedia.rows[0].count,
      totalLikes: totalLikes.rows[0].count,
      totalComments: totalComments.rows[0].count,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};