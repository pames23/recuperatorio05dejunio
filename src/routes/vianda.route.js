const {Router} = require('express')
const controller = require('../controllers/vianda.controller')
const viandasRouter = Router()

viandasRouter.get("/", controller.getViandas);
viandasRouter.get("/:codigo", controller.getViandasCodigo);
viandasRouter.put("/:codigo", controller.putViandasCodigo);
viandasRouter.post("/", controller.postViandas);

module.exports = viandasRouter