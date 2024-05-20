const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // First check req header has authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  //Extract jwt token from req header
  const token = authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    //Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user info to req obj
    req.userPayload = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

//Function to generate token
const generateToken = (userData) => {
  return jwt.sign(
    { id: userData._id, data: userData },
    process.env.JWT_SECRET,
    {
      expiresIn: "90000s",
    }
  );
};

module.exports = { jwtAuthMiddleware, generateToken };
