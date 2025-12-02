import { NextApiRequest, NextApiResponse } from 'next';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { connectToDatabase } from '@/utils/mongodb';
import { User } from '@/models/User';
import { validateEmail, validatePassword } from '@/utils/validation';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({ error: 'Invalid email or password format.' });
    }

    try {
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists.' });
      }

      const hashedPassword = await hash(password, 10);
      const newUser = await db.collection('users').insertOne({
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      const token = sign({ userId: newUser.insertedId }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  if (req.method === 'GET') {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'Authorization header missing.' });
    }

    const token = authorization.split(' ')[1];
    try {
      const decoded = verify(token, process.env.JWT_SECRET!);
      const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      return res.status(200).json({ user: { email: user.email } });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
};

export default handler;