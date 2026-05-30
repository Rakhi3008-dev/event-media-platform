export const likeMedia = async (req, res) => {
    const { mediaId } = req.params;
  
    await pool.query(
      `INSERT INTO likes(media_id,user_id)
       VALUES($1,$2)
       ON CONFLICT DO NOTHING`,
      [mediaId, req.user.id]
    );
  
    res.json({
      success: true,
    });
  };

  export const addComment = async (req, res) => {
    const { mediaId } = req.params;
    const { comment } = req.body;
  
    await pool.query(
      `INSERT INTO comments
      (media_id,user_id,comment_text)
      VALUES($1,$2,$3)`,
      [mediaId, req.user.id, comment]
    );
  
    res.json({
      success: true,
    });
  };

  export const getComments = async (req, res) => {
    const { mediaId } = req.params;
  
    const result = await pool.query(
      `SELECT comments.*, users.name
       FROM comments
       JOIN users
       ON comments.user_id=users.id
       WHERE media_id=$1
       ORDER BY created_at DESC`,
      [mediaId]
    );
  
    res.json(result.rows);
  };