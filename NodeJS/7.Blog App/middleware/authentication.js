const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const cookieValue = req.cookies[cookieName];
    if (!cookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(cookieValue);
      req.user = userPayload;
    } catch (error) {
      // If token validation fails, continue without setting req.user
    }
    next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
