import {connectDB} from "../utils/db.js"

export const getUsers = async (req, res) => {
    const client = await connectDB()
    const texto = 'SELECT * FROM users'
    const resultado = await client.query(texto)
    res.json(resultado.rows)
    await client.end()
}

export const getUserById = async (req, res) => {
    const client = await connectDB()
    const id = req.params.id
    const texto = 'SELECT * FROM users WHERE id = $1'
    const values = [id]
    const resultado = await client.query(texto, values)
    res.json(resultado.rows)
    await client.end()
}

export const createUser = async (req, res) => {
    const client = await connectDB()
    const {nombre, email, password} = req.body
    const texto = 'INSERT INTO users (nombre, email, password) VALUES ($1, $2, $3) RETURNING *'
    const values = [nombre, email, password]
    const resultado = await client.query(texto, values)
    res.json(resultado.rows)
    await client.end()
}

export const updateUser = async (req, res) => {
    const client = await connectDB()
    const id = req.params.id
    const {nombre, email, password} = req.body
    const texto = 'UPDATE users SET nombre=$1, email=$2, password=$3 WHERE id=$4 RETURNING *'
    const values = [nombre, email, password, id]
    const resultado = await client.query(texto, values)
    res.json(resultado.rows)
    await client.end()
}

export const deleteUser = async (req, res) => {
    const client = await connectDB()
    const id = req.params.id
    const texto = 'DELETE FROM users WHERE id=$1 RETURNING *'
    const values = [id]
    const resultado = await client.query(texto, values)
    res.json(resultado.rows)
    await client.end()
}