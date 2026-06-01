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
      
        popularEvent:
          popularEvent.rows[0] || null,
      });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const popularEvent = await pool.query(`
    SELECT
      e.title,
      COUNT(l.id) AS total_likes
    FROM events e
    LEFT JOIN media m ON m.event_id = e.id
    LEFT JOIN likes l ON l.media_id = m.id
    GROUP BY e.id, e.title
    ORDER BY total_likes DESC
    LIMIT 1
  `);
 