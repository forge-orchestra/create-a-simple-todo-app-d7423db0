import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type User = {
  id: string;
  email: string;
};

type AuthToken = {
  userId: string;
  iat: number;
  exp: number;
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Generates a JWT token for a user.
 * @param {User} user - The user object.
 * @returns {string} The generated JWT token.
 * @throws Will throw an error if token generation fails.
 */
export function generateToken(user: User): string {
  try {
    return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  } catch (error) {
    throw new Error('Token generation failed');
  }
}

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param {string} token - The JWT token to verify.
 * @returns {AuthToken} The decoded token payload.
 * @throws Will throw an error if token verification fails.
 */
export function verifyToken(token: string): AuthToken {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthToken;
  } catch (error) {
    throw new Error('Token verification failed');
  }
}

/**
 * Middleware to protect API routes.
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse} res - The API response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: Function): void {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}