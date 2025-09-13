const isadmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Route is protected only for admin",
    });
  }
};
module.exports = { isadmin };
