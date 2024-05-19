const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //Extract jwt token from req header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    //Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user info to req obj
    req.userPayload = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid Tokoen" });
  }
};

//Function to generate token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleware, generateToken };
