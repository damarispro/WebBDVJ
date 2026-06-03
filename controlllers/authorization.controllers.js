import {connectDB} from '../utils/db.js'
import CryptoJS from 'crypto-js'

export const login = async (req, res) => {
    const client = await connectDB()
    const {email, password} = req.body
    const texto = 'SELECT * FROM users WHERE email = $1'
    const values = [email]
    const resultado = await client.query(texto, values)

    if (resultado.rows.length === 0) {
        res.status(401).json({ok: false, mensaje: 'Credenciales incorrectas'})
        await client.end()
        return
    }

    const usuario = resultado.rows[0]
    const hashInput = CryptoJS.MD5(password).toString()

    if (hashInput !== usuario.password) {
        res.status(401).json({ok: false, mensaje: 'Credenciales incorrectas'})
        await client.end()
        return
    }

    res.json({ok: true, mensaje: 'Login exitoso', usuario})
    await client.end()
}