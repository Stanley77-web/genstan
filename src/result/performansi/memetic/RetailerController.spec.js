import RetailerController from '../controllers/RetailerController';

jest.mock('../services/retailerService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getManufacturedProducts: jest.fn(async (userId) => {
        if (userId === 'ID-001') return { productId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 }
        if (userId === 'ID-002') return { productId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 }
        if (userId === 'ID-003') return { productId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 }
        if (userId === 'ID-004') return { productId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 }
        if (userId === 'ID-005') return { productId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 }
        if (userId === 'ID-006') return { productId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 }
        if (userId === 'ID-007') return { productId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 }
        if (userId === 'ID-008') return { productId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 }
        if (userId === 'ID-009') return { productId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 }
        if (userId === 'ID-010') return { productId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 }
        return null
      }), 
      getAllOrderedProducts: jest.fn((user) => {
        if (user.userId === 'ID-001') return [{ product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 } }]
        if (user.userId === 'ID-002') return [{ product: { productCommercialId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 } }]
        if (user.userId === 'ID-003') return [{ product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 } }]
        if (user.userId === 'ID-004') return [{ product: { productCommercialId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 } }]
        if (user.userId === 'ID-005') return [{ product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 } }]
        if (user.userId === 'ID-006') return [{ product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 } }]
        if (user.userId === 'ID-007') return [{ product: { productCommercialId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 } }]
        if (user.userId === 'ID-008') return [{ product: { productCommercialId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 } }]
        if (user.userId === 'ID-009') return [{ product: { productCommercialId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 } }]
        if (user.userId === 'ID-010') return [{ product: { productCommercialId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 } }]
        return null
      }), 
      getPopularOrderedProducts: jest.fn((user) => {
        if (user.userId === 'ID-001') return [{ product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 } }]
        if (user.userId === 'ID-002') return [{ product: { productCommercialId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 } }]
        if (user.userId === 'ID-003') return [{ product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 } }]
        if (user.userId === 'ID-004') return [{ product: { productCommercialId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 } }]
        if (user.userId === 'ID-005') return [{ product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 } }]
        if (user.userId === 'ID-006') return [{ product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 } }]
        if (user.userId === 'ID-007') return [{ product: { productCommercialId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 } }]
        if (user.userId === 'ID-008') return [{ product: { productCommercialId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 } }]
        if (user.userId === 'ID-009') return [{ product: { productCommercialId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 } }]
        if (user.userId === 'ID-010') return [{ product: { productCommercialId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 } }]
        return null
      }), 
      getCartByRetailerId: jest.fn((userId) => {
        if (userId === 'ID-001') return [{ product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 } }]
        if (userId === 'ID-002') return [{ product: { productCommercialId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 } }]
        if (userId === 'ID-003') return [{ product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 } }]
        if (userId === 'ID-004') return [{ product: { productCommercialId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 } }]
        if (userId === 'ID-005') return [{ product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 } }]
        if (userId === 'ID-011') return [{ product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 } }]
        if (userId === 'ID-012') return [{ product: { productCommercialId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 } }]
        if (userId === 'ID-013') return [{ product: { productCommercialId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 } }]
        if (userId === 'ID-014') return [{ product: { productCommercialId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 } }]
        if (userId === 'ID-015') return [{ product: { productCommercialId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 } }]
        return null
      }), 
      addCartByRetailerId: jest.fn((userId, product) => {
        if (userId === 'ID-001' && product.productCommercialId === 'ProductCommercialID-001' && product.productType === 'Laptop' && product.status === 'manufactured' && product.quantity === 10 && product.price === 1000) return { userId: 'ID-001', products: [{ product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 } }] }
        if (userId === 'ID-002' && product.productCommercialId === 'ProductCommercialID-002' && product.productType === 'Smartphone' && product.status === 'exported' && product.quantity === 20 && product.price === 2000) return { userId: 'ID-002', products: [{ product: { productCommercialId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 } }] }
        if (userId === 'ID-003' && product.productCommercialId === 'ProductCommercialID-003' && product.productType === 'Tablet' && product.status === 'manufactured' && product.quantity === 30 && product.price === 3000) return { userId: 'ID-003', products: [{ product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 } }] }
        if (userId === 'ID-004' && product.productCommercialId === 'ProductCommercialID-004' && product.productType === 'Smartwatch' && product.status === 'exported' && product.quantity === 40 && product.price === 4000) return { userId: 'ID-004', products: [{ product: { productCommercialId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 } }] }
        if (userId === 'ID-005' && product.productCommercialId === 'ProductCommercialID-005' && product.productType === 'Headphone' && product.status === 'exported' && product.quantity === 50 && product.price === 5000) return { userId: 'ID-005', products: [{ product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 } }] }
        if (userId === 'ID-006' && product.productCommercialId === 'ProductCommercialID-006' && product.productType === 'Earphone' && product.status === 'distributing' && product.quantity === 60 && product.price === 6000) return { userId: 'ID-006', products: [{ product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 } }] }
        if (userId === 'ID-007' && product.productCommercialId === 'ProductCommercialID-007' && product.productType === 'Speaker' && product.status === 'retailing' && product.quantity === 70 && product.price === 7000) return { userId: 'ID-007', products: [{ product: { productCommercialId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 } }] }
        if (userId === 'ID-008' && product.productCommercialId === 'ProductCommercialID-008' && product.productType === 'Monitor' && product.status === 'distributing' && product.quantity === 80 && product.price === 8000) return { userId: 'ID-008', products: [{ product: { productCommercialId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 } }] }
        if (userId === 'ID-009' && product.productCommercialId === 'ProductCommercialID-009' && product.productType === 'Keyboard' && product.status === 'distributing' && product.quantity === 90 && product.price === 9000) return { userId: 'ID-009', products: [{ product: { productCommercialId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 } }] }
        if (userId === 'ID-010' && product.productCommercialId === 'ProductCommercialID-010' && product.productType === 'Mouse' && product.status === 'retailing' && product.quantity === 100 && product.price === 10000) return { userId: 'ID-010', products: [{ product: { productCommercialId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 } }] }
        return null
      }), 
      updateCartByRetailerId: jest.fn((userId, cart) => {
        if (userId === 'ID-001' && cart.userId === 'ID-001' && ((cart.products.product.productCommercialId === 'ProductCommercialID-001' && cart.products.product.productType === 'Laptop' && cart.products.product.status === 'manufactured' && cart.products.product.quantity === 10 && cart.products.product.price === 1000))) return { userId: 'ID-001', products: [{ product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 } }] }
        if (userId === 'ID-002' && cart.userId === 'ID-002' && ((cart.products.product.productCommercialId === 'ProductCommercialID-002' && cart.products.product.productType === 'Smartphone' && cart.products.product.status === 'exported' && cart.products.product.quantity === 20 && cart.products.product.price === 2000))) return { userId: 'ID-002', products: [{ product: { productCommercialId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 } }] }
        if (userId === 'ID-003' && cart.userId === 'ID-003' && ((cart.products.product.productCommercialId === 'ProductCommercialID-003' && cart.products.product.productType === 'Tablet' && cart.products.product.status === 'manufactured' && cart.products.product.quantity === 30 && cart.products.product.price === 3000))) return { userId: 'ID-003', products: [{ product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 } }] }
        if (userId === 'ID-004' && cart.userId === 'ID-004' && ((cart.products.product.productCommercialId === 'ProductCommercialID-004' && cart.products.product.productType === 'Smartwatch' && cart.products.product.status === 'exported' && cart.products.product.quantity === 40 && cart.products.product.price === 4000))) return { userId: 'ID-004', products: [{ product: { productCommercialId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 } }] }
        if (userId === 'ID-005' && cart.userId === 'ID-005' && ((cart.products.product.productCommercialId === 'ProductCommercialID-005' && cart.products.product.productType === 'Headphone' && cart.products.product.status === 'exported' && cart.products.product.quantity === 50 && cart.products.product.price === 5000))) return { userId: 'ID-005', products: [{ product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 } }] }
        if (userId === 'ID-006' && cart.userId === 'ID-006' && ((cart.products.product.productCommercialId === 'ProductCommercialID-006' && cart.products.product.productType === 'Earphone' && cart.products.product.status === 'distributing' && cart.products.product.quantity === 60 && cart.products.product.price === 6000))) return { userId: 'ID-006', products: [{ product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 } }] }
        if (userId === 'ID-007' && cart.userId === 'ID-007' && ((cart.products.product.productCommercialId === 'ProductCommercialID-007' && cart.products.product.productType === 'Speaker' && cart.products.product.status === 'retailing' && cart.products.product.quantity === 70 && cart.products.product.price === 7000))) return { userId: 'ID-007', products: [{ product: { productCommercialId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 } }] }
        if (userId === 'ID-008' && cart.userId === 'ID-008' && ((cart.products.product.productCommercialId === 'ProductCommercialID-008' && cart.products.product.productType === 'Monitor' && cart.products.product.status === 'distributing' && cart.products.product.quantity === 80 && cart.products.product.price === 8000))) return { userId: 'ID-008', products: [{ product: { productCommercialId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 } }] }
        if (userId === 'ID-009' && cart.userId === 'ID-009' && ((cart.products.product.productCommercialId === 'ProductCommercialID-009' && cart.products.product.productType === 'Keyboard' && cart.products.product.status === 'distributing' && cart.products.product.quantity === 90 && cart.products.product.price === 9000))) return { userId: 'ID-009', products: [{ product: { productCommercialId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 } }] }
        if (userId === 'ID-010' && cart.userId === 'ID-010' && ((cart.products.product.productCommercialId === 'ProductCommercialID-010' && cart.products.product.productType === 'Mouse' && cart.products.product.status === 'retailing' && cart.products.product.quantity === 100 && cart.products.product.price === 10000))) return { userId: 'ID-010', products: [{ product: { productCommercialId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 } }] }
        return null
      }), 
      deleteCart: jest.fn((userId) => {
        if (userId === 'ID-001') return { userId: 'ID-001', products: [{ product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 } }] }
        if (userId === 'ID-002') return { userId: 'ID-002', products: [{ product: { productCommercialId: 'ProductCommercialID-002', productType: 'Smartphone', status: 'exported', quantity: 20, price: 2000 } }] }
        if (userId === 'ID-003') return { userId: 'ID-003', products: [{ product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 } }] }
        if (userId === 'ID-004') return { userId: 'ID-004', products: [{ product: { productCommercialId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 } }] }
        if (userId === 'ID-005') return { userId: 'ID-005', products: [{ product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 } }] }
        if (userId === 'ID-006') return { userId: 'ID-006', products: [{ product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 } }] }
        if (userId === 'ID-007') return { userId: 'ID-007', products: [{ product: { productCommercialId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 } }] }
        if (userId === 'ID-008') return { userId: 'ID-008', products: [{ product: { productCommercialId: 'ProductCommercialID-008', productType: 'Monitor', status: 'distributing', quantity: 80, price: 8000 } }] }
        if (userId === 'ID-009') return { userId: 'ID-009', products: [{ product: { productCommercialId: 'ProductCommercialID-009', productType: 'Keyboard', status: 'distributing', quantity: 90, price: 9000 } }] }
        if (userId === 'ID-010') return { userId: 'ID-010', products: [{ product: { productCommercialId: 'ProductCommercialID-010', productType: 'Mouse', status: 'retailing', quantity: 100, price: 10000 } }] }
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

describe('# RetailerController', () => {
    describe('## getManufacturedProducts method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getManufacturedProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"This retailer don't have any product!","error":"empty-product"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getManufacturedProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"This retailer don't have any product!","error":"empty-product"}})
        })
        it('Scenario 3', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getManufacturedProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"This retailer don't have any product!","error":"empty-product"}})
        })
    })
    describe('## getAllOrderedProducts method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getAllOrderedProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'userId')"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getAllOrderedProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'userId')"}})
        })
        it('Scenario 3', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getAllOrderedProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'userId')"}})
        })
    })
    describe('## getPopularOrderedProducts method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-007' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getPopularOrderedProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'userId')"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-014' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getPopularOrderedProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"This retailer don't have any product!","error":"empty-product"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-014' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getPopularOrderedProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"This retailer don't have any product!","error":"empty-product"}})
        })
    })
    describe('## getCart method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 4', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.getCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## addCart method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-009' }, body: { product: { productId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.addCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-014' }, body: { product: { productId: 'ProductCommercialID-004', productType: 'Smartwatch', status: 'exported', quantity: 40, price: 4000 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.addCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-004' }, body: { product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', status: 'distributing', quantity: 60, price: 6000 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.addCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
        it('Scenario 4', async () => {
            const request = { user: { userId: 'ID-006' }, body: { product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.addCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## deteleCart method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.deteleCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.deteleCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.deteleCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## deteleProductInCart method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-010' }, body: { product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', status: 'exported', quantity: 50, price: 5000 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.deteleProductInCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-013' }, body: { product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', status: 'manufactured', quantity: 30, price: 3000 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.deteleProductInCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-002' }, body: { product: { productId: 'ProductCommercialID-007', productType: 'Speaker', status: 'retailing', quantity: 70, price: 7000 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.deteleProductInCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
        it('Scenario 4', async () => {
            const request = { user: { userId: 'ID-011' }, body: { product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', status: 'manufactured', quantity: 10, price: 1000 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await RetailerController.deteleProductInCart(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
    })
})
