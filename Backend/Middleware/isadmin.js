const isadmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    console.log("' admin hit");
    next();
  } else {
    return res.status(403).json({
      message: "Route is protected only for admin",
    });
  }
};
module.exports = { isadmin };
