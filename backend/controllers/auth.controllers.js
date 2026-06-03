import { connectDB } from "../utils/db.js";
import CryptoJS from "crypto-js";

export const login = async (req, res) => {
    const client = await connectDB();

    const { email, password } = req.body;

    const resultado = await client.query(
        "SELECT * FROM users WHERE email=$1",
        [email]
    );

    if (resultado.rows.length === 0) {
        return res.status(401).json({
            ok: false,
            mensaje: "Credenciales incorrectas"
        });
    }

    const usuario = resultado.rows[0];

    const hashInput =
        CryptoJS.MD5(password).toString();

    if (hashInput !== usuario.password) {
        return res.status(401).json({
            ok: false,
            mensaje: "Credenciales incorrectas"
        });
    }

    res.json({
        ok: true,
        mensaje: "Login exitoso",
        usuario
    });

    await client.end();
};