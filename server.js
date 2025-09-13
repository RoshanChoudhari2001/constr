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
  const csp = [
    "default-src 'self'",             // everything falls back to self
    "connect-src 'self'",             // API calls only to same origin
    "img-src 'self' data:",           // allow images from same origin + data URIs
    "script-src 'self' 'unsafe-inline'", // allow inline scripts
    "style-src 'self' 'unsafe-inline'",  // allow inline styles
    "font-src 'self'"                 // fonts only from same origin
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);
  next();
});

app.use(express.json());


app.use('/uploads', express.static('public/uploads'));

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
// Catch-all route for React SPA
const frontendDistPath = path.join(__dirname, 'dist');
app.use(express.static(frontendDistPath));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(frontendDistPath, 'index.html'));
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
