const isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    return res.status(403).json({
      message: "Route is protected only for user",
    });
  }
};
module.exports = { isUser };
 