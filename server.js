const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Import cors
const connectDB = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/ProjectRoutes');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // ✅ Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
  );
  next();
});


app.use(express.json());


app.use('/uploads', express.static('public/uploads'));

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
// Catch-all route for React SPA
const frontendDistPath = path.join(__dirname, 'dist');
app.use(express.static(frontendDistPath));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
