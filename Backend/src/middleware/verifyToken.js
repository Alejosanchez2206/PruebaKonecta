const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Prefer Authorization header with Bearer token, fall back to cookies if needed
    let token;

    const authHeader = req.headers && req.headers.authorization;
    if (authHeader && typeof authHeader === 'string') {
        // Expected format: 'Bearer <token>'
        const parts = authHeader.split(' ');
        if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
            token = parts[1];
        } else {
            return res.status(401).json({ error: 'Invalid authorization format. Expected: Bearer <token>' });
        }
    }

    // Fallback to cookies (legacy behavior)
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;