const jwt = require("jsonwebtoken");
// check the user is authnticate or not
module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	try {
		const token = authorization.replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Authentication failed" });
	}
};