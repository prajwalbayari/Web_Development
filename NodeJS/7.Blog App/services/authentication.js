const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "your-super-secret-jwt-key-for-blogify-2024";

function createTokenForUser(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    profileImageURL: user.profileImageURL,
  };
  const token = JWT.sign(payload, secret, { expiresIn: "1d" });
  return token;
}

function validateToken(token) {
  try {
    const decoded = JWT.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};
