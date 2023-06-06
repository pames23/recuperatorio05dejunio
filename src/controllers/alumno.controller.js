const alumnos = require('../../data/alumnos.json');
const httpStatusCodes = require('http2').constants;

const getAlumnos = (req, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(alumnos)
};

const getAlumnosByDni = (req, res) => {
    const { dni } = req.params;
    const alumno = alumnos.find(a => a.dni == dni);
  
    if (alumno) {
      res.json(alumno); 
     
    } else {
      res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Alumno no encontrado' });
    }
  };
const putAlumnoDni = (req, res) => {
    const dni = req.params.dni
    const { habilitado, celiaco, edad } = req.body;
  
    const alumno = alumnos.find(a => a.dni === dni);

  if (alumno) {
    alumno.habilitado = habilitado;
    alumno.celiaco = celiaco;
    alumno.edad = edad;
    res.json(alumno);
   
    
  } else {
     res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Alumno no encontrado' });

  }
};
const postAlumnos = (req, res) => {
    const { dni, nombre, celiaco = false, edad } = req.body;
  
    if (!dni || isNaN(dni) || dni.toString().length !== 8) {
      return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'El DNI debe tener 8 dígitos numéricos' });
    }
  
    const dniExistente = alumnos.find((alumno) => alumno.dni === dni);
    if (dniExistente) {
      return res.status(400).json({ error: 'El alumno ya está registrado' });
    }
  
    if (!edad || isNaN(edad) || edad < 18 || edad >= 99) {
      return res.status(400).json({ error: 'La edad debe ser mayor a 18 y menor a 99 años' });
    }
  
    const nuevoAlumno = {
      dni: parseInt(dni),
      nombre,
      habilitado: true,
      celiaco,
      edad
    };
  
    alumnos.push(nuevoAlumno);
  
    return res.json(nuevoAlumno);
  };
   
  
  module.exports = {
    getAlumnos,
    getAlumnosByDni,
    putAlumnoDni,
    postAlumnos
  } ;