import DistributorController from '../controllers/DistributorController';

jest.mock('../services/userService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUserObjByUserId: jest.fn(async (userId) => {
        if (userId === 'ID-001') return { userId: 'ID-001', role: 'admin', address: 'West Street, No 1', userName: 'User 01', phoneNumber: '085200471481', password: 'lab*nz!*$jfue_p%u', status: 'active' }
        if (userId === 'ID-002') return { userId: 'ID-002', role: 'user', address: 'West Street, No 2', userName: 'User 02', phoneNumber: '085200178467', password: 'opv^srosztx!klt', status: 'inactive' }
        if (userId === 'ID-003') return { userId: 'ID-003', role: 'user', address: 'West Street, No 3', userName: 'User 03', phoneNumber: '087580887998', password: '+hib#+%$(@%+i)%^@s&w&po)', status: 'inactive' }
        if (userId === 'ID-004') return { userId: 'ID-004', role: 'user', address: 'West Street, No 4', userName: 'User 04', phoneNumber: '084541894816', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' }
        if (userId === 'ID-005') return { userId: 'ID-005', role: 'user', address: 'West Street, No 5', userName: 'User 05', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'inactive' }
        if (userId === 'ID-006') return { userId: 'ID-006', role: 'user', address: 'East Street, No 1', userName: 'User 06', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'inactive' }
        if (userId === 'ID-007') return { userId: 'ID-007', role: 'admin', address: 'East Street, No 2', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'active' }
        if (userId === 'ID-008') return { userId: 'ID-008', role: 'admin', address: 'East Street, No 3', userName: 'User 08', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'active' }
        if (userId === 'ID-009') return { userId: 'ID-009', role: 'admin', address: 'East Street, No 4', userName: 'User 09', phoneNumber: '083008460868', password: 'fuopizod)bbjc+^t', status: 'inactive' }
        if (userId === 'ID-010') return { userId: 'ID-010', role: 'admin', address: 'East Street, No 5', userName: 'User 10', phoneNumber: '082186254770', password: '+j)*jakuv(ellf', status: 'active' }
        return null
      })
    };
  });
});

jest.mock('../appService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      evaluateTransactionUserObjAnyParam: jest.fn(async (getStatus, user, query) => {
        if (getStatus === 'GetAllProductsByShippingStatus' && user.userId === 'ID-001' && user.role === 'admin' && user.address === 'West Street, No 1' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active' && query.address === 'West Street, No 1' && query.shippingStatus === 'SHIPPED') return { productComercialId: 'ID-001', productType: 'Laptop', quantity: 10, price: 1000 }
        if (getStatus === 'GetAllProductsByShippingStatus' && user.userId === 'ID-002' && user.role === 'user' && user.address === 'West Street, No 2' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive' && query.address === 'West Street, No 2' && query.shippingStatus === 'SENDING') return { productComercialId: 'ID-002', productType: 'Smartphone', quantity: 20, price: 500 }
        if (getStatus === 'GetAllProductsByShippingStatus' && user.userId === 'ID-003' && user.role === 'user' && user.address === 'West Street, No 3' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive' && query.address === 'West Street, No 3' && query.shippingStatus === 'SHIPPED') return { productComercialId: 'ID-003', productType: 'Tablet', quantity: 30, price: 300 }
        if (getStatus === 'GetAllProductsByShippingStatus' && user.userId === 'ID-004' && user.role === 'user' && user.address === 'West Street, No 4' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active' && query.address === 'West Street, No 4' && query.shippingStatus === 'SENDING') return { productComercialId: 'ID-004', productType: 'Smartwatch', quantity: 40, price: 200 }
        if (getStatus === 'GetAllProductsByShippingStatus' && user.userId === 'ID-005' && user.role === 'user' && user.address === 'West Street, No 5' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive' && query.address === 'West Street, No 5' && query.shippingStatus === 'SENDING') return { productComercialId: 'ID-005', productType: 'Headphone', quantity: 50, price: 100 }
        if (getStatus === 'GetAllProductsByShippingStatus' && user.userId === 'ID-006' && user.role === 'user' && user.address === 'East Street, No 1' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive' && query.address === 'East Street, No 1' && query.shippingStatus === 'SENDING') return { productComercialId: 'ID-006', productType: 'Laptop', quantity: 60, price: 1000 }
        if (getStatus === 'GetAllProductsByShippingStatus' && user.userId === 'ID-007' && user.role === 'admin' && user.address === 'East Street, No 2' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active' && query.address === 'East Street, No 2' && query.shippingStatus === 'SHIPPED') return { productComercialId: 'ID-007', productType: 'Smartphone', quantity: 70, price: 500 }
        if (getStatus === 'GetAllProductsByShippingStatus' && user.userId === 'ID-008' && user.role === 'admin' && user.address === 'East Street, No 3' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active' && query.address === 'East Street, No 3' && query.shippingStatus === 'SENDING') return { productComercialId: 'ID-008', productType: 'Tablet', quantity: 80, price: 300 }
        if (getStatus === 'GetAllProductsByShippingStatus' && user.userId === 'ID-009' && user.role === 'admin' && user.address === 'East Street, No 4' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive' && query.address === 'East Street, No 4' && query.shippingStatus === 'SHIPPED') return { productComercialId: 'ID-009', productType: 'Smartwatch', quantity: 90, price: 200 }
        if (getStatus === 'GetAllProductsByShippingStatus' && user.userId === 'ID-010' && user.role === 'admin' && user.address === 'East Street, No 5' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active' && query.address === 'East Street, No 5' && query.shippingStatus === 'SHIPPED') return { productComercialId: 'ID-010', productType: 'Headphone', quantity: 100, price: 100 }
        return null
      }), 
      submitTransaction: jest.fn((productStatus, user, product) => {
        if (productStatus === 'UpdateProduct' && user.userId === 'ID-001' && user.role === 'admin' && user.address === 'West Street, No 1' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active' && product.productCommercialId === 'ProductCommercialID-001' && product.productType === 'Laptop' && product.quantity === 10 && product.price === 1000) return { userId: 'ID-001', role: 'admin', address: 'West Street, No 1', userName: 'User 01', phoneNumber: '085200471481', password: 'lab*nz!*$jfue_p%u', status: 'active' }
        if (productStatus === 'UpdateProduct' && user.userId === 'ID-002' && user.role === 'user' && user.address === 'West Street, No 2' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive' && product.productCommercialId === 'ProductCommercialID-002' && product.productType === 'Smartphone' && product.quantity === 20 && product.price === 500) return { userId: 'ID-002', role: 'user', address: 'West Street, No 2', userName: 'User 02', phoneNumber: '085200178467', password: 'opv^srosztx!klt', status: 'inactive' }
        if (productStatus === 'UpdateProduct' && user.userId === 'ID-003' && user.role === 'user' && user.address === 'West Street, No 3' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive' && product.productCommercialId === 'ProductCommercialID-003' && product.productType === 'Tablet' && product.quantity === 30 && product.price === 300) return { userId: 'ID-003', role: 'user', address: 'West Street, No 3', userName: 'User 03', phoneNumber: '087580887998', password: '+hib#+%$(@%+i)%^@s&w&po)', status: 'inactive' }
        if (productStatus === 'UpdateProduct' && user.userId === 'ID-004' && user.role === 'user' && user.address === 'West Street, No 4' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active' && product.productCommercialId === 'ProductCommercialID-004' && product.productType === 'Smartwatch' && product.quantity === 40 && product.price === 200) return { userId: 'ID-004', role: 'user', address: 'West Street, No 4', userName: 'User 04', phoneNumber: '084541894816', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' }
        if (productStatus === 'UpdateProduct' && user.userId === 'ID-005' && user.role === 'user' && user.address === 'West Street, No 5' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive' && product.productCommercialId === 'ProductCommercialID-005' && product.productType === 'Headphone' && product.quantity === 50 && product.price === 100) return { userId: 'ID-005', role: 'user', address: 'West Street, No 5', userName: 'User 05', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'inactive' }
        if (productStatus === 'UpdateProduct' && user.userId === 'ID-006' && user.role === 'user' && user.address === 'East Street, No 1' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive' && product.productCommercialId === 'ProductCommercialID-006' && product.productType === 'Laptop' && product.quantity === 60 && product.price === 1000) return { userId: 'ID-006', role: 'user', address: 'East Street, No 1', userName: 'User 06', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'inactive' }
        if (productStatus === 'UpdateProduct' && user.userId === 'ID-007' && user.role === 'admin' && user.address === 'East Street, No 2' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active' && product.productCommercialId === 'ProductCommercialID-007' && product.productType === 'Smartphone' && product.quantity === 70 && product.price === 500) return { userId: 'ID-007', role: 'admin', address: 'East Street, No 2', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'active' }
        if (productStatus === 'UpdateProduct' && user.userId === 'ID-008' && user.role === 'admin' && user.address === 'East Street, No 3' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active' && product.productCommercialId === 'ProductCommercialID-008' && product.productType === 'Tablet' && product.quantity === 80 && product.price === 300) return { userId: 'ID-008', role: 'admin', address: 'East Street, No 3', userName: 'User 08', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'active' }
        if (productStatus === 'UpdateProduct' && user.userId === 'ID-009' && user.role === 'admin' && user.address === 'East Street, No 4' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive' && product.productCommercialId === 'ProductCommercialID-009' && product.productType === 'Smartwatch' && product.quantity === 90 && product.price === 200) return { userId: 'ID-009', role: 'admin', address: 'East Street, No 4', userName: 'User 09', phoneNumber: '083008460868', password: 'fuopizod)bbjc+^t', status: 'inactive' }
        if (productStatus === 'UpdateProduct' && user.userId === 'ID-010' && user.role === 'admin' && user.address === 'East Street, No 5' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active' && product.productCommercialId === 'ProductCommercialID-010' && product.productType === 'Headphone' && product.quantity === 100 && product.price === 100) return { userId: 'ID-010', role: 'admin', address: 'East Street, No 5', userName: 'User 10', phoneNumber: '082186254770', password: '+j)*jakuv(ellf', status: 'active' }
        return null
      })
    };
  });
});

describe('# DistributorController', () => {
    describe('## getAllProducts method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  }, query: { shippingStatus: 'SHIPPED' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await DistributorController.getAllProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'address')"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  }, query: { shippingStatus: 'SENDING' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await DistributorController.getAllProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'address')"}})
        })
    })
    describe('## updateProduct method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  }, body: { productObj: { productComercialId: 'ID-009', productType: 'Smartwatch', quantity: 90, price: 200 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await DistributorController.updateProduct(request, response)
            expect(ret).toEqual({"json":{"message":"User not found!","status":"notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  }, body: { productObj: { productComercialId: 'ID-010', productType: 'Headphone', quantity: 100, price: 100 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await DistributorController.updateProduct(request, response)
            expect(ret).toEqual({"json":{"message":"User not found!","status":"notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: {  }, body: { productObj: { productCommercialId: 'ProductCommercialID-006', productType: 'Laptop', quantity: 60, price: 1000 } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await DistributorController.updateProduct(request, response)
            expect(ret).toEqual({"json":{"message":"User not found!","status":"notfound"}})
        })
    })
})
