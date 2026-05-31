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
      const { search } = req.query;
  
      let result;
  
      if (search) {
        result = await pool.query(
          `SELECT *
           FROM media
           WHERE event_id = $1
           AND (
             LOWER(media_type) LIKE LOWER($2)
             OR EXISTS (
               SELECT 1
               FROM unnest(tags) tag
               WHERE LOWER(tag) LIKE LOWER($2)
             )
           )
           ORDER BY created_at DESC`,
          [eventId, `%${search}%`]
        );
      } else {
        result = await pool.query(
          `SELECT *
           FROM media
           WHERE event_id = $1
           ORDER BY created_at DESC`,
          [eventId]
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
 
export const downloadMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const mediaResult = await pool.query(
      `SELECT * FROM media WHERE id=$1`,
      [id]
    );

    if (mediaResult.rows.length === 0) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    const media = mediaResult.rows[0];

    const imageResponse = await axios.get(
      media.media_url,
      {
        responseType: "arraybuffer",
      }
    );

    const watermarkSvg = `
      <svg width="800" height="100">
        <text
          x="20"
          y="60"
          font-size="32"
          fill="white"
          opacity="0.7"
        >
          EventHub Watermark
        </text>
      </svg>
    `;

    const watermarkedImage = await sharp(
      imageResponse.data
    )
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
      "Content-Disposition":
        "attachment; filename=watermarked.jpg",
    });

    res.send(watermarkedImage);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};