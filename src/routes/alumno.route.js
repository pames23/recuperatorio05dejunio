const {Router} = require('express')
const controller = require('../controllers/alumno.controller')
const route = Router()

route.get("/", controller.getAlumnos);
route.get("/:dni", controller.getAlumnosByDni);
route.put("/:dni", controller.putAlumnoDni);
route.post("/", controller.postAlumnos)

module.exports = route