const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Sin token, acceso denegado' });
        }
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Sin token, acceso denegado' });
        }

        // Intentar verificar el token usando la clave secreta de admin
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        } catch (err) {
            return res.status(401).json({ message: 'El token no es válido' });
        }

        // Establecer el rol de admin en la solicitud
        req.user = { email: decoded.email, role: 'admin' };

        // Continuar con la siguiente función en el middleware
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ message: 'El token no es válido' });
    }
};

module.exports = authMiddleware;
