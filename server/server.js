const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const authRoutes = require('./routes/authRoutes')


const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}

app.use(cors(corsOptions))



app.use(express.json())
app.use(cookieParser())

// routes
app.use('/auth', authRoutes)

app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from Node!" });
});

mongoose.connect(process.env.MONGO_URI)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));