const {Router} = require('express')
const controller = require('../controllers/pedido.controller')
const pedidosRouter = Router()

pedidosRouter.get("/", controller.getPedidos);
pedidosRouter.get("/:id", controller.getPedidosById);
pedidosRouter.post("/", controller.postPedido);

module.exports = pedidosRouter
