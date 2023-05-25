const jwt = require("jsonwebtoken");

// Function to handle rendering the server page
const renderIndexPage = (req, res) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.render('ServerView', {
            user: user
        });
    } catch (err) {
        res.render('ServerView');
    }
};

module.exports = {
    renderIndexPage
};