const cron = require('node-cron');
const Token = require('../models/Token');

// Tarea para limpiar tokens expirados cada día a medianoche
cron.schedule('0 0 * * *', async () => {  // Cambié "O" por "0"
  await Token.deleteMany({ expiryDate: { $lt: new Date() } });
  console.log('Tokens expirados eliminados');
});
