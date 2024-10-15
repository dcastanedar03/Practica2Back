import { sendResponse } from './static/functions.ts';
import { developerJokes } from "./static/types.ts";


const handler = (req: Request): Response => {
  const url = new URL(req.url);
  const path = url.pathname;
  const method = req.method;

  if (method === "GET" && path === '/calcular') {

    const num1 = url.searchParams.get('num1');
    const num2 = url.searchParams.get('num2');
    const operacion = url.searchParams.get('operacion');
    if (!num1 || !num2 || !operacion) {
      return sendResponse(404);
    }

    if (operacion === 'suma') {
      return sendResponse(200, 'El resultado de la suma es: ' + (+num1 + +num2));
    } else if (operacion === 'resta') {
      return sendResponse(200, 'El resultado de la resta es: ' + (+num1 - +num2));
    } else if (operacion === 'multiplicacion') {
      return sendResponse(200, 'El resultado de la multiplicación es: ' + (+num1 * +num2));
    } else if (operacion === 'division') {
      if (+num2 === 0) {
        return sendResponse(400, 'No se puede dividir por 0')
      } else {
        return sendResponse(200, 'El resultado de la división es: ' + (+num1 / +num2))
      }
    }else {
      return sendResponse(400, 'Operación no válida');
    }

  } else if (method === "GET" && path === '/jokes') {
    const index = url.searchParams.get('index');
    if (index && +index >= 0 && +index < developerJokes.length) {
      return sendResponse(200, developerJokes[+index])
    } else {
      return sendResponse(200, developerJokes[Math.floor(Math.random() * developerJokes.length)])
    }
  } else if (method === "GET" && path.startsWith('/reverso/')) {
    const texto = url.pathname.split('reverso/')[1];
    if (url.searchParams.get('detalles') === 'true') {
      return sendResponse(200, 'Palabra: ' + texto.split('').reverse().join('') + ' Longitud: ' + texto.length);
    }
    return sendResponse(200, texto.split('').reverse().join(''));
  }
  else {
    return sendResponse(404, 'Ruta no encontrada');
  }
};
//reverso/ path.startWith('/reverso/')
// Iniciar el servidor en el puerto 3000
Deno.serve({ port: 3000 }, handler);
