const asyncHandler = require("express-async-handler");
  
// ======= verify login token =======
const verifyToken = asyncHandler(async (req, res, next) => {
  
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = await JWT.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    next()
});


module.exports = verifyToken;