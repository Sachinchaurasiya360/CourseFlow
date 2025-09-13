const jwt = require("jsonwebtoken");
const { user } = require("../../Database/index");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.Cookies;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorize:No token found",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const verifiedUser = await user.findById(decode.userId).select("-password");
    console.log("from the middleware",verifiedUser);
    if (!verifiedUser) {
      return res.status(401).json({
        message: "user does not exist",
      });
    }
    req.user = verifiedUser;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error ",
    });
  }
};

module.exports = {isAuthenticated};
