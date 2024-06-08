import { expect } from 'chai';
import requester from './requester.js';

describe('Products Router Tests', () => {
  it('Se muestra correctamente todos los productos, ', async () => {
    try {
      const {statusCode, ok} = await requester.get('/products');

      console.log(statusCode);
      console.log(ok);

      expect(statusCode).to.have.equal(200);


    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  });
});


