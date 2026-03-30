import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'kamivault-secret-key';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        // Fallback to session for EJS
        // @ts-ignore
        if (req.session && req.session.userId) {
            // @ts-ignore
            const is2FAVerified = req.session.twoFactorVerified;
            // @ts-ignore
            const is2FAEnabled = req.session.is2FAEnabled; // We should set this during login

            // Mandatory 2FA check for Vault
            if (req.path === '/vault' || req.baseUrl === '/api/documents') {
                if (!is2FAEnabled && req.path !== '/setup-2fa') {
                    return res.redirect('/setup-2fa');
                }
                if (is2FAEnabled && !is2FAVerified && req.path !== '/verify-2fa') {
                    return res.redirect('/verify-2fa');
                }
            }
            
            // @ts-ignore
            req.user = { id: req.session.userId };
            return next();
        }
        
        if (req.path.startsWith('/api')) {
            return res.status(401).json({ error: 'No token provided' });
        }
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; twoFactorVerified: boolean };
        // @ts-ignore
        req.user = decoded;
        
        if ((req.path === '/vault' || req.baseUrl === '/api/documents') && !decoded.twoFactorVerified) {
            return res.status(403).json({ error: '2FA verification required', requires2FA: true });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};
