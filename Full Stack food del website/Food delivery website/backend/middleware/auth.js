import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Extract the 'Authorization' header
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header:", authHeader); // Debugging: Log the full Authorization header

  // Check if the 'Authorization' header is present
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
  }

  // Extract the token from 'Bearer <token>'
  const token = authHeader.split(' ')[1];
  console.log("Extracted Token:", token); // Debugging: Log the extracted token

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    // Log the JWT secret to ensure it's being loaded correctly
    console.log("JWT Secret:", process.env.JWT_SECRET); 

    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'your-hardcoded-secret'); // Temporarily hardcode the secret for testing
    console.log("Decoded Token:", decoded); // Debugging: Log the decoded token

    // Attach userId to the request body for later use
    req.body.userId = decoded.id;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(403).json({ success: false, message: "Invalid or Expired Token" });
  }
};

export default authMiddleware;
