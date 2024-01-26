require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());

const loginroute = require("./routes/LoginRoute.js")

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(
  console.log("Connected Database")
);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); 
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// });

app.use('/api/auth', loginroute );


app.use('/', createProxyMiddleware({
  target: 'https://www.bseindia.com', 
  changeOrigin: true,
  credentials: true,
  onProxyRes: (proxyRes) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    
  }
}));






app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
