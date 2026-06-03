import { connectDB } from "../utils/db.js";

export const getUsers = async (req, res) => {
    const client = await connectDB();
    const resultado = await client.query(
        "SELECT * FROM users"
    );
    res.json(resultado.rows);
    await client.end();
};

export const getUserById = async (req, res) => {
    const client = await connectDB();
    const { id } = req.params;
    const resultado = await client.query(
        "SELECT * FROM users WHERE id=$1",
        [id]
    );
    res.json(resultado.rows[0]);
    await client.end();
};

export const createUser = async (req, res) => {
    const client = await connectDB();
    const {
        nombre,
        email,
        password,
        puntos
    } = req.body;
    const resultado = await client.query(
        `INSERT INTO users
        (nombre,email,password,puntos)
        VALUES($1,$2,$3,$4)
        RETURNING *`,
        [
            nombre,
            email,
            password,
            puntos || 0
        ]
    );
    res.json(resultado.rows);
    await client.end();
};

export const updateUser = async (req, res) => {
    const client = await connectDB();
    const { id } = req.params;
    const {
        nombre,
        email,
        password,
        puntos
    } = req.body;
    const resultado = await client.query(
        `UPDATE users
         SET nombre=$1,
             email=$2,
             password=$3,
             puntos=$4
         WHERE id=$5
         RETURNING *`,
        [
            nombre,
            email,
            password,
            puntos,
            id
        ]
    );
    res.json(resultado.rows);
    await client.end();
};

export const deleteUser = async (req, res) => {
    const client = await connectDB();
    const { id } = req.params;
    const resultado = await client.query(
        "DELETE FROM users WHERE id=$1 RETURNING *",
        [id]
    );
    res.json(resultado.rows);
    await client.end();
};