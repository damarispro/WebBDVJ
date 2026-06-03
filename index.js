import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import indexRoutes from './routes/index.routes.js'
import usersRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/', indexRoutes)
app.use('/users', usersRoutes)
app.use('/auth', authRoutes)


/* import {connectDB} from "./utils/db.js"
const prueba = async()=>{
    const sql = await connectDB()
    const res = await sql.query("select 1")
    console.log(res) 
}
prueba() */

const PORT = 5000

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

