const express = require('express');
const mysql = require('mysql2');
const promClient = require('prom-client');
const app = express();
const port = 3000;

// Cấu hình Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register: promClient.register });

// Kết nối MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'club_user',
  password: process.env.DB_PASSWORD || 'StrongP@ssw0rd!',
  database: process.env.DB_NAME || 'club_db',
  waitForConnections: true,
  connectionLimit: 10,
});

app.get('/', (req, res) => {
  res.send('<h1>Hệ thống Quản lý Câu lạc bộ</h1><p>Trạng thái: Hoạt động bình thường</p>');
});

app.get('/members', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) return res.status(500).send('Database connection error');
    res.send('<h3>Danh sách thành viên sẽ hiển thị ở đây. Kết nối DB thành công!</h3>');
  });
});

// Endpoint cho Prometheus pull metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});