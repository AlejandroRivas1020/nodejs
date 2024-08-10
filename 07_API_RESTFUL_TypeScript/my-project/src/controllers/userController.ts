import { Request, Response } from 'express';
import { User } from '../interfaces/user';
import pool from '../data-access/db'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const createUser = async (req: Request, res: Response) => {
  const newUser: User = req.body;
  try {
    const [result] = await pool.query('INSERT INTO users SET ?', [newUser]);
    res.status(201).json({ id: (result as any).insertId, ...newUser });
  } catch (error) {
    res.status(500).send('Server error');
  }
};  