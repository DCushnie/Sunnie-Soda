const jwt = require('jsonwebtoken');

function getToken(req) {
  if (req.cookies?.token) return req.cookies.token; //if cookies exist in the request itself return cookies

  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7); //if cookies exist in req header and starts with bearer the give me the cookie data

  return null; //else return nothing
}

function requireAuth(req, res, next) {
  const token = getToken(req); //get cookies
  if (!token) return res.status(401).json({ error: "Not authenticated" }); //if token not given not an authorised user

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid/expired token" });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
