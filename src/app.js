const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001

const Route = require('./routes/alumno.route');
const viandasRouter = require('./routes/vianda.route');
const pedidosRouter = require('./routes/pedido.route');

app.use(express.json());

app.use('/api/alumnos', Route);
app.use('/api/viandas', viandasRouter);
app.use('/api/pedidos', pedidosRouter);

app.listen(PORT, () => {
    console.log(`Solución del parcial en el puerto ${PORT}`);
});






