import pool from "../config/db.js";
import sharp from "sharp";
import axios from "axios";

export const uploadMedia = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    const { event_id } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const media_url = req.file.path;

    const tags = generateTags(req.file.originalname, req.file.mimetype);

    const result = await pool.query(
      `INSERT INTO media
      (event_id, uploaded_by, media_url, media_type, tags)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *`,
      [event_id, req.user.id, media_url, req.file.mimetype, tags]
    );

    res.status(201).json({
      success: true,
      media: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getEventMedia = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { search, user, date } = req.query;

    let query = `
      SELECT
        m.*,
        u.name AS uploaded_by_name
      FROM media m
      JOIN users u
      ON m.uploaded_by = u.id
      WHERE m.event_id = $1
    `;

    const queryParams = [eventId];

    if (search) {
      query += `
        AND EXISTS (
          SELECT 1
          FROM unnest(m.tags) tag
          WHERE LOWER(tag) LIKE LOWER($2)
        )
      `;
      queryParams.push(`%${search}%`);
    }

    if (user) {
      query += ` AND LOWER(u.name) LIKE LOWER($${queryParams.length + 1})`;
      queryParams.push(`%${user}%`);
    }

    if (date) {
      query += ` AND DATE(m.created_at)::TEXT = $${queryParams.length + 1}`;
      queryParams.push(date);
    }

    query += ` ORDER BY m.created_at DESC`;

    const result = await pool.query(query, queryParams);

    res.json({
      success: true,
      media: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM media WHERE id=$1", [id]);

    res.json({
      success: true,
      message: "Media deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const downloadMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const mediaResult = await pool.query(`SELECT * FROM media WHERE id=$1`, [
      id,
    ]);

    if (mediaResult.rows.length === 0) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    const media = mediaResult.rows[0];

    const imageResponse = await axios.get(media.media_url, {
      responseType: "arraybuffer",
    });

    const eventResult = await pool.query(
      `
      SELECT *
      FROM events
      WHERE id = $1
      `,
      [media.event_id]
    );

    const event = eventResult.rows[0];
    const userRole = req.user?.role || "Participant";

    const watermarkText =
      `${event?.category || "Club"} | ` +
      `${event?.title || "Event"} | ` +
      `${userRole}`;

    const watermarkSvg = `
      <svg width="1200" height="100">
        <text
          x="20"
          y="60"
          font-size="28"
          fill="white"
          opacity="0.7"
        >
          ${watermarkText}
        </text>
      </svg>
    `;

    const watermarkedImage = await sharp(imageResponse.data)
      .composite([
        {
          input: Buffer.from(watermarkSvg),
          gravity: "south",
        },
      ])
      .jpeg()
      .toBuffer();

    res.set({
      "Content-Type": "image/jpeg",
      "Content-Disposition": "attachment; filename=watermarked.jpg",
    });

    res.send(watermarkedImage);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const generateTags = (filename, mimetype) => {
  const tags = [];

  const text = filename.toLowerCase();

  if (text.includes("workshop")) tags.push("workshop");
  if (text.includes("hackathon")) tags.push("hackathon");
  if (text.includes("seminar")) tags.push("seminar");
  if (text.includes("event")) tags.push("event");
  if (text.includes("team")) tags.push("team");
  if (text.includes("crowd")) tags.push("crowd");

  if (mimetype.includes("image")) {
    tags.push("photo");
  }

  return tags.length ? tags : ["general"];
};