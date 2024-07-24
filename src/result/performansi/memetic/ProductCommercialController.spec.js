import ProductCommercialController from '../controllers/ProductCommercialController';

jest.mock('../services/productCommercialService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getTransactionHistory: jest.fn(async (userId, productCommercialId) => {
        if (userId === 'ID-001' && productCommercialId === 'ProductCommercialID-001') return [{ productId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 }, { productId: 'ProductCommercialID-002', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 }]
        if (userId === 'ID-002' && productCommercialId === 'ProductCommercialID-002') return [{ productId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 }, { productId: 'ProductCommercialID-003', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 }]
        if (userId === 'ID-003' && productCommercialId === 'ProductCommercialID-003') return [{ productId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 }, { productId: 'ProductCommercialID-004', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 }]
        if (userId === 'ID-004' && productCommercialId === 'ProductCommercialID-004') return [{ productId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 }, { productId: 'ProductCommercialID-005', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 }]
        if (userId === 'ID-005' && productCommercialId === 'ProductCommercialID-005') return [{ productId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 }, { productId: 'ProductCommercialID-006', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 }]
        if (userId === 'ID-006' && productCommercialId === 'ProductCommercialID-006') return [{ productId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 }, { productId: 'ProductCommercialID-007', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 }]
        if (userId === 'ID-007' && productCommercialId === 'ProductCommercialID-007') return [{ productId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 }, { productId: 'ProductCommercialID-008', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 }]
        if (userId === 'ID-008' && productCommercialId === 'ProductCommercialID-008') return [{ productId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 }, { productId: 'ProductCommercialID-009', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 }]
        if (userId === 'ID-009' && productCommercialId === 'ProductCommercialID-009') return [{ productId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 }, { productId: 'ProductCommercialID-010', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 }]
        if (userId === 'ID-010' && productCommercialId === 'ProductCommercialID-010') return [{ productId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 }, { productId: 'ProductCommercialID-011', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 }]
        return null
      }), 
      getAllProducts: jest.fn((userId) => {
        if (userId === 'ID-001') return [{ productId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 }, { productId: 'ProductCommercialID-002', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 }]
        if (userId === 'ID-002') return [{ productId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 }, { productId: 'ProductCommercialID-003', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 }]
        if (userId === 'ID-003') return [{ productId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 }, { productId: 'ProductCommercialID-004', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 }]
        if (userId === 'ID-004') return [{ productId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 }, { productId: 'ProductCommercialID-005', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 }]
        if (userId === 'ID-005') return [{ productId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 }, { productId: 'ProductCommercialID-006', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 }]
        if (userId === 'ID-006') return [{ productId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 }, { productId: 'ProductCommercialID-007', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 }]
        if (userId === 'ID-007') return [{ productId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 }, { productId: 'ProductCommercialID-008', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 }]
        if (userId === 'ID-008') return [{ productId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 }, { productId: 'ProductCommercialID-009', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 }]
        if (userId === 'ID-009') return [{ productId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 }, { productId: 'ProductCommercialID-010', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 }]
        if (userId === 'ID-010') return [{ productId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 }, { productId: 'ProductCommercialID-011', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 }]
        return null
      }), 
      getProductByIdNoAuth: jest.fn((productCommercialId) => {
        if (productCommercialId === 'ProductCommercialID-001') return { productId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 }
        if (productCommercialId === 'ProductCommercialID-002') return { productId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 }
        if (productCommercialId === 'ProductCommercialID-003') return { productId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 }
        if (productCommercialId === 'ProductCommercialID-004') return { productId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 }
        if (productCommercialId === 'ProductCommercialID-005') return { productId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 }
        if (productCommercialId === 'ProductCommercialID-006') return { productId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 }
        if (productCommercialId === 'ProductCommercialID-007') return { productId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 }
        if (productCommercialId === 'ProductCommercialID-008') return { productId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 }
        if (productCommercialId === 'ProductCommercialID-009') return { productId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 }
        if (productCommercialId === 'ProductCommercialID-010') return { productId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 }
        return null
      }), 
      getProductById: jest.fn((user, productId) => {
        if (user.userId === 'ID-001' && productId === 'ProductCommercialID-001') return { productId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 }
        if (user.userId === 'ID-002' && productId === 'ProductCommercialID-002') return { productId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 }
        if (user.userId === 'ID-003' && productId === 'ProductCommercialID-003') return { productId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 }
        if (user.userId === 'ID-004' && productId === 'ProductCommercialID-004') return { productId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 }
        if (user.userId === 'ID-005' && productId === 'ProductCommercialID-005') return { productId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 }
        if (user.userId === 'ID-006' && productId === 'ProductCommercialID-006') return { productId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 }
        if (user.userId === 'ID-007' && productId === 'ProductCommercialID-007') return { productId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 }
        if (user.userId === 'ID-008' && productId === 'ProductCommercialID-008') return { productId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 }
        if (user.userId === 'ID-009' && productId === 'ProductCommercialID-009') return { productId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 }
        if (user.userId === 'ID-010' && productId === 'ProductCommercialID-010') return { productId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 }
        return null
      }), 
      updateProductDB: jest.fn((products) => {
        if (((products.productId === 'ProductCommercialID-001' && products.productType === 'Laptop' && products.status === 'manufactured' && products.quantity === 10 && products.price === 1000) && (products.productId === 'ProductCommercialID-002' && products.productType === 'Laptop' && products.status === 'manufactured' && products.quantity === 10 && products.price === 1000))) return null
        if (((products.productId === 'ProductCommercialID-002' && products.productType === 'Smartphone' && products.status === 'exported' && products.quantity === 20 && products.price === 2000) && (products.productId === 'ProductCommercialID-003' && products.productType === 'Smartphone' && products.status === 'exported' && products.quantity === 20 && products.price === 2000))) return null
        if (((products.productId === 'ProductCommercialID-003' && products.productType === 'Tablet' && products.status === 'manufactured' && products.quantity === 30 && products.price === 3000) && (products.productId === 'ProductCommercialID-004' && products.productType === 'Tablet' && products.status === 'manufactured' && products.quantity === 30 && products.price === 3000))) return null
        if (((products.productId === 'ProductCommercialID-004' && products.productType === 'Smartwatch' && products.status === 'exported' && products.quantity === 40 && products.price === 4000) && (products.productId === 'ProductCommercialID-005' && products.productType === 'Smartwatch' && products.status === 'exported' && products.quantity === 40 && products.price === 4000))) return null
        if (((products.productId === 'ProductCommercialID-005' && products.productType === 'Headphone' && products.status === 'exported' && products.quantity === 50 && products.price === 5000) && (products.productId === 'ProductCommercialID-006' && products.productType === 'Headphone' && products.status === 'exported' && products.quantity === 50 && products.price === 5000))) return null
        if (((products.productId === 'ProductCommercialID-006' && products.productType === 'Earphone' && products.status === 'distributing' && products.quantity === 60 && products.price === 6000) && (products.productId === 'ProductCommercialID-007' && products.productType === 'Earphone' && products.status === 'distributing' && products.quantity === 60 && products.price === 6000))) return null
        if (((products.productId === 'ProductCommercialID-007' && products.productType === 'Speaker' && products.status === 'retailing' && products.quantity === 70 && products.price === 7000) && (products.productId === 'ProductCommercialID-008' && products.productType === 'Speaker' && products.status === 'retailing' && products.quantity === 70 && products.price === 7000))) return null
        if (((products.productId === 'ProductCommercialID-008' && products.productType === 'Monitor' && products.status === 'distributing' && products.quantity === 80 && products.price === 8000) && (products.productId === 'ProductCommercialID-009' && products.productType === 'Monitor' && products.status === 'distributing' && products.quantity === 80 && products.price === 8000))) return null
        if (((products.productId === 'ProductCommercialID-009' && products.productType === 'Keyboard' && products.status === 'distributing' && products.quantity === 90 && products.price === 9000) && (products.productId === 'ProductCommercialID-010' && products.productType === 'Keyboard' && products.status === 'distributing' && products.quantity === 90 && products.price === 9000))) return null
        if (((products.productId === 'ProductCommercialID-010' && products.productType === 'Mouse' && products.status === 'retailing' && products.quantity === 100 && products.price === 10000) && (products.productId === 'ProductCommercialID-011' && products.productType === 'Mouse' && products.status === 'retailing' && products.quantity === 100 && products.price === 10000))) return null
        return null
      })
    };
  });
});

jest.mock('../services/userService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUserObjByUserId: jest.fn(async (userId) => {
        if (userId === 'ID-001') return { userId: 'ID-001' }
        if (userId === 'ID-002') return { userId: 'ID-002' }
        if (userId === 'ID-003') return { userId: 'ID-003' }
        if (userId === 'ID-004') return { userId: 'ID-004' }
        if (userId === 'ID-005') return { userId: 'ID-005' }
        if (userId === 'ID-011') return { userId: 'ID-011' }
        if (userId === 'ID-012') return { userId: 'ID-012' }
        if (userId === 'ID-013') return { userId: 'ID-013' }
        if (userId === 'ID-014') return { userId: 'ID-014' }
        if (userId === 'ID-015') return { userId: 'ID-015' }
        return null
      })
    };
  });
});

jest.mock('../appService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      submitTransaction: jest.fn(async (productType, user, product) => {
        if (productType === 'ExportProduct' && user.userId === 'ID-001' && product.productId === 'ProductCommercialID-001' && product.productType === 'Laptop' && product.status === 'manufactured' && product.quantity === 10 && product.price === 1000) return { productId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 }
        if (productType === 'DistributeProduct' && user.userId === 'ID-002' && product.productId === 'ProductCommercialID-002' && product.productType === 'Smartphone' && product.status === 'exported' && product.quantity === 20 && product.price === 2000) return { productId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 }
        if (productType === 'DistributeProduct' && user.userId === 'ID-003' && product.productId === 'ProductCommercialID-003' && product.productType === 'Tablet' && product.status === 'manufactured' && product.quantity === 30 && product.price === 3000) return { productId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 }
        if (productType === 'ImportRetailerProduct' && user.userId === 'ID-004' && product.productId === 'ProductCommercialID-004' && product.productType === 'Smartwatch' && product.status === 'exported' && product.quantity === 40 && product.price === 4000) return { productId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 }
        if (productType === 'DistributeProduct' && user.userId === 'ID-005' && product.productId === 'ProductCommercialID-005' && product.productType === 'Headphone' && product.status === 'exported' && product.quantity === 50 && product.price === 5000) return { productId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 }
        if (productType === 'ImportRetailerProduct' && user.userId === 'ID-006' && product.productId === 'ProductCommercialID-006' && product.productType === 'Earphone' && product.status === 'distributing' && product.quantity === 60 && product.price === 6000) return { productId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 }
        if (productType === 'SellProduct' && user.userId === 'ID-007' && product.productId === 'ProductCommercialID-007' && product.productType === 'Speaker' && product.status === 'retailing' && product.quantity === 70 && product.price === 7000) return { productId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 }
        if (productType === 'ExportProduct' && user.userId === 'ID-008' && product.productId === 'ProductCommercialID-008' && product.productType === 'Monitor' && product.status === 'distributing' && product.quantity === 80 && product.price === 8000) return { productId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 }
        if (productType === 'SellProduct' && user.userId === 'ID-009' && product.productId === 'ProductCommercialID-009' && product.productType === 'Keyboard' && product.status === 'distributing' && product.quantity === 90 && product.price === 9000) return { productId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 }
        if (productType === 'SellProduct' && user.userId === 'ID-010' && product.productId === 'ProductCommercialID-010' && product.productType === 'Mouse' && product.status === 'retailing' && product.quantity === 100 && product.price === 10000) return { productId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 }
        return null
      })
    };
  });
});

describe('# ProductCommercialController', () => {
    describe('## getTransactionHistory method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  }, params: { productCommercialId: 'ProductCommercialID-008' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.getTransactionHistory(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  }, params: { productCommercialId: 'ProductCommercialID-003' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.getTransactionHistory(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
    })
    describe('## getAllProducts method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-004' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.getAllProducts(request, response)
            expect(ret).toEqual({"json":{"data":[{"productId":"ProductCommercialID-004","productType":"Smartwatch","status":"exported","quantity":40,"price":4000},{"productId":"ProductCommercialID-005","productType":"Smartwatch","status":"exported","quantity":40,"price":4000}],"message":"successfully","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-004' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.getAllProducts(request, response)
            expect(ret).toEqual({"json":{"data":[{"productId":"ProductCommercialID-004","productType":"Smartwatch","status":"exported","quantity":40,"price":4000},{"productId":"ProductCommercialID-005","productType":"Smartwatch","status":"exported","quantity":40,"price":4000}],"message":"successfully","error":null}})
        })
    })
    describe('## getProduct method', () => {
        it('Scenario 1', async () => {
            const request = { params: { productCommercialId: 'ProductCommercialID-004' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.getProduct(request, response)
            expect(ret).toEqual({"json":{"data":{"productId":"ProductCommercialID-004","productType":"Smartwatch","status":"exported","quantity":40,"price":4000},"message":"successfully","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { params: { productCommercialId: 'ProductCommercialID-007' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.getProduct(request, response)
            expect(ret).toEqual({"json":{"data":{"productId":"ProductCommercialID-007","productType":"Speaker","status":"retailing","quantity":70,"price":7000},"message":"successfully","error":null}})
        })
    })
    describe('## exportProduct method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-004' }, body: { productId: 'ProductCommercialID-004', price: 10000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.exportProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product is not manufactured or was exported","error":"product-is-not-manufactured-or-was-exported"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-007' }, body: { productId: 'ProductCommercialID-005', price: 4000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.exportProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-009' }, body: { productId: 'ProductCommercialID-002', price: 1000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.exportProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 4', async () => {
            const request = { user: { userId: 'ID-006' }, body: { productId: 'ProductCommercialID-006', price: 2000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.exportProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 5', async () => {
            const request = { user: { userId: 'ID-001' }, body: { productId: 'ProductCommercialID-011', price: 5000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.exportProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
    })
    describe('## distributeProduct method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-005' }, body: { productId: 'ProductCommercialID-010' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.distributeProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-001' }, body: { productId: 'ProductCommercialID-009' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.distributeProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-011' }, body: { productId: 'ProductCommercialID-003' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.distributeProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 4', async () => {
            const request = { user: { userId: 'ID-009' }, body: { productId: 'ProductCommercialID-001' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.distributeProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 5', async () => {
            const request = { user: { userId: 'ID-003' }, body: { productId: 'ProductCommercialID-010' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.distributeProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
    })
    describe('## importRetailerProduct method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-001' }, body: { productId: 'ProductCommercialID-009', price: 1000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.importRetailerProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-011' }, body: { productId: 'ProductCommercialID-008', price: 3000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.importRetailerProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-010' }, body: { productId: 'ProductCommercialID-005', price: 7000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.importRetailerProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 4', async () => {
            const request = { user: { userId: 'ID-002' }, body: { productId: 'ProductCommercialID-001', price: 4000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.importRetailerProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 5', async () => {
            const request = { user: { userId: 'ID-005' }, body: { productId: 'ProductCommercialID-004', price: 9000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.importRetailerProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
    })
    describe('## sellProduct method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-006' }, body: { productId: 'ProductCommercialID-009', price: 8000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.sellProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-011' }, body: { productId: 'ProductCommercialID-007', price: 9000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.sellProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-004' }, body: { productId: 'ProductCommercialID-010', price: 6000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.sellProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 4', async () => {
            const request = { user: { userId: 'ID-010' }, body: { productId: 'ProductCommercialID-001', price: 2000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.sellProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 5', async () => {
            const request = { user: { userId: 'ID-011' }, body: { productId: 'ProductCommercialID-011', price: 4000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductCommercialController.sellProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
    })
})
