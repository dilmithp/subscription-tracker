import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const dicision = await aj.protect(req,{requested:1});
        if (dicision.isDenied()) {
            if (dicision.reason.isRateLimit()) {
                return res.status(429).json({message: "Rate limit exceeded. Please try again later."});
            }
            if (dicision.reason.isBot()) {
                return res.status(403).json({message: "Access denied for bots."});
            }

            return res.status(403).json({message: "Access denied."});
        }
        next();
    } catch (err) {
        console.error("Arcjet middleware error:", err);
        next(err);
    }
}

export default arcjetMiddleware;