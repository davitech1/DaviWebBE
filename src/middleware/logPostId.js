const logPostId = (req, res, next) => {
    const postId = req.params.post_id;
    console.log(`Requested post_id: ${postId}`);
    next();
};

module.exports = logPostId;
