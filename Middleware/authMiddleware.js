import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Please log in to continue.'
            });
        }

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decodedToken;
            next();
            
        } catch (error) {
        return res.status(500).json({
                success: false,
                message: 'Access denied. Please log in to continue.'
            }); 
        }
        
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;