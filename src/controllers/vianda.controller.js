const viandas = require('../../data/viandas.json');
const httpStatusCodes = require('http2').constants;

const getViandas = (_, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(viandas)
};
const getViandasCodigo = (req, res) => {
    const {codigo} = req.params;
    const vianda = viandas.find(v => v.codigo === codigo);
    if (vianda) {
        res.json(vianda); 
       
      } else {
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'vianda no encontrado' });
      }
};
 const putViandasCodigo =  (req, res) => {
    const codigo = req.params.codigo;
    const { aptoCeliaco, stock, descripcion } = req.body;

    const vianda = viandas.find(v => v.codigo === codigo);

    if (vianda){

        vianda.aptoCeliaco =aptoCeliaco;
        if (isNaN(stock) || stock < 0) {
            return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'El stock debe ser un número mayor o igual a 0' });
          }
          vianda.stock = stock;
        vianda.stock = stock;
        vianda.descripcion = descripcion;
        res.json(vianda);

    } else{
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'vianda no encontrada' });
    }
 };
 const postViandas = (req, res) => {
    const { codigo, tipo, aptoCeliaco = false, stock, descripcion } = req.body;
  
    if (!codigo || codigo.length !== 5 || !codigo.startsWith('V')) {
      return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'El código de vianda debe tener 5 caracteres y comenzar con la letra "V"' });
    }
  
    const codigoExistente = viandas.find((vianda) => vianda.codigo === codigo);
    if (codigoExistente) {
      return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'La vianda ya está registrada' });
    }
  
    const tiposPermitidos = ['TARTA', 'POLLO', 'PASTA', 'PIZZA', 'EMPANADAS'];
    if (!tiposPermitidos.includes(tipo)) {
      return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'Tipo de vianda incorrecta' });
    }
  
    if (stock !== undefined) {
      if (isNaN(stock) || stock < 0) {
        return res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ error: 'El stock debe ser un número mayor o igual a 0' });
      }
    }
  
    const nuevaVianda = {
      codigo,
      tipo,
      aptoCeliaco,
      stock,
      descripcion
    };
  
    viandas.push(nuevaVianda);
  
    return res.status(httpStatusCodes.HTTP_STATUS_OK).json(nuevaVianda);
  };
  
 
  

module.exports = {
    getViandas,
    getViandasCodigo,
    putViandasCodigo,
    postViandas
};