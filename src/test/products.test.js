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
   it('Se muestra el producto por el ID', async () => {
    try {
      const existingProductId = '6618460d8bcee8890d57e448';

      const {statusCode, ok, _body} = await requester.get(`/products/${existingProductId}`);

      console.log(statusCode); 
      console.log(ok); 
      console.log(_body)

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('title');
      expect(res.body).to.have.property('description');
      expect(res.body).to.have.property('price');

    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
    }
  });
  
});


