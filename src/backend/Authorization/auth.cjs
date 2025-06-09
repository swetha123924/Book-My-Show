require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJpYXQiOjE3NDg4NDMwMTZ9.o6sleGYi8JbMqCThT0rjIaAA_eF4WYW9J8YscoJtiXM';

function verifyUser(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // { id, role }
    next();
}
// auth.cjs

function verifyAdmin(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];  
      const decoded = jwt.verify(token, secret);
      console.log("Decoded token:", decoded);
  
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }
  
      req.user = decoded; 
      next();  
  }
  


module.exports = { verifyAdmin };

