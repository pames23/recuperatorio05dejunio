const pedidos = require('../../data/pedidos.json');
const httpStatusCodes = require('http2').constants;

const getPedidos = (req, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(pedidos)
};
const getPedidosById = (req, res) => {
    const id = req.params.id;
    const pedido = pedidos.find(p => p.id == id);
  
    if (pedido) {
        res.json(alumno); 
    } else{
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Pedido no encontrado' });
    }
};

const postPedido = (req, res) => {
    const { dni, tipo } = req.body;
  
    const alumno = alumnos.find(a => a.dni == dni);
  
    if (!alumno) {
      return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Alumno no encontrado' });
    }
  
    if (!alumno.habilitado) {
      return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'El alumno no está habilitado para realizar pedidos' });
    }
  
    const vianda = viandas.find((vianda) =>
      vianda.tipo == tipo &&
      vianda.aptoCeliaco == alumno.celiaco &&
      vianda.stock > 0
    );
  
    if (!vianda) {
      return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'No se encontró una vianda disponible para el pedido' });
    }
  
    vianda.stock--;
    alumno.habilitado = false;
  
    const nuevoPedido = {
      id: pedidos.length + 1,
      fecha: new Date().toISOString().slice(0, 10),
      alumno: {
        dni: alumno.dni,
        nombre: alumno.nombre,
        celiaco: alumno.celiaco,
        edad: alumno.edad
      },
      vianda: {
        codigo: vianda.codigo,
        tipo: vianda.tipo,
        aptoCeliaco: vianda.aptoCeliaco,
        descripcion: vianda.descripcion
      }
    };
  
    pedidos.push(nuevoPedido);
  
    return res.status(httpStatusCodes.HTTP_STATUS_OK).json(nuevoPedido);
  };
  
  module.exports = {
    getPedidos,
    getPedidosById,
    postPedido
};