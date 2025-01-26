const jwt = require('jsonwebtoken');

const SECRET_KEY = "da96e13767f0820a7f0e1f418a7584eb237bd4cfb5356b97dcbe76b8d92bad6f87fbd9e07454b9d5653f8f340a49afe70de32ec254e7d632ee5099f727664c175193cd84efdf809db94e564b82f240e75e2383eb52975b84ded1d46f4c36d80b";

exports.verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Check if the user has the admin role
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }

    // Pass the decoded user to the request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};