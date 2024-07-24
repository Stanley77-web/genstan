import ManufacturerController from '../controllers/ManufacturerController';

jest.mock('../services/userService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUserObjByUserId: jest.fn(async (userId) => {
        if (userId === 'ID-001') return { userId: 'ID-001', role: 'admin', address: 'West Street, No 1', userName: 'User 01', phoneNumber: '085200471481', password: 'lab*nz!*$jfue_p%u', status: 'active' }
        if (userId === 'ID-002') return { userId: 'ID-002', role: 'user', address: 'West Street, No 2', userName: 'User 02', phoneNumber: '085200178467', password: 'opv^srosztx!klt', status: 'inactive' }
        if (userId === 'ID-003') return { userId: 'ID-003', role: 'user', address: 'West Street, No 3', userName: 'User 03', phoneNumber: '087580887998', password: '+hib#+%$(@%+i)%^@s&w&po)', status: 'inactive' }
        if (userId === 'ID-004') return { userId: 'ID-004', role: 'user', address: 'West Street, No 4', userName: 'User 04', phoneNumber: '084541894816', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' }
        if (userId === 'ID-005') return { userId: 'ID-005', role: 'user', address: 'West Street, No 5', userName: 'User 05', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'inactive' }
        if (userId === 'ID-011') return { userId: 'ID-011', role: 'user', address: 'East Street, No 1', userName: 'User 06', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'inactive' }
        if (userId === 'ID-012') return { userId: 'ID-012', role: 'admin', address: 'East Street, No 2', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'active' }
        if (userId === 'ID-013') return { userId: 'ID-013', role: 'admin', address: 'East Street, No 3', userName: 'User 08', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'active' }
        if (userId === 'ID-014') return { userId: 'ID-014', role: 'admin', address: 'East Street, No 4', userName: 'User 09', phoneNumber: '083008460868', password: 'fuopizod)bbjc+^t', status: 'inactive' }
        if (userId === 'ID-015') return { userId: 'ID-015', role: 'admin', address: 'East Street, No 5', userName: 'User 10', phoneNumber: '082186254770', password: '+j)*jakuv(ellf', status: 'active' }
        return null
      })
    };
  });
});

jest.mock('../services/manufacturerService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      approveOrderRequest: jest.fn(async (user, orderId) => {
        if (user.userId === 'ID-001' && user.role === 'admin' && user.address === 'West Street, No 1' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active' && orderId === 'OrderID-001') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', quantity: 10, price: 1000 } }, { product: { productCommercialId: 'ProductCommercialID-011', productType: 'Laptop', quantity: 10, price: 1000 } }] }
        if (user.userId === 'ID-002' && user.role === 'user' && user.address === 'West Street, No 2' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive' && orderId === 'OrderID-002') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-002', productType: 'Smartphone', quantity: 20, price: 2000 } }, { product: { productCommercialId: 'ProductCommercialID-012', productType: 'Smartphone', quantity: 20, price: 2000 } }] }
        if (user.userId === 'ID-003' && user.role === 'user' && user.address === 'West Street, No 3' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive' && orderId === 'OrderID-003') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', quantity: 30, price: 3000 } }, { product: { productCommercialId: 'ProductCommercialID-013', productType: 'Tablet', quantity: 30, price: 3000 } }] }
        if (user.userId === 'ID-004' && user.role === 'user' && user.address === 'West Street, No 4' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active' && orderId === 'OrderID-004') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-004', productType: 'Smartwatch', quantity: 40, price: 4000 } }, { product: { productCommercialId: 'ProductCommercialID-014', productType: 'Smartwatch', quantity: 40, price: 4000 } }] }
        if (user.userId === 'ID-005' && user.role === 'user' && user.address === 'West Street, No 5' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive' && orderId === 'OrderID-005') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', quantity: 50, price: 5000 } }, { product: { productCommercialId: 'ProductCommercialID-015', productType: 'Headphone', quantity: 50, price: 5000 } }] }
        if (user.userId === 'ID-006' && user.role === 'user' && user.address === 'East Street, No 1' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive' && orderId === 'OrderID-006') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', quantity: 60, price: 6000 } }, { product: { productCommercialId: 'ProductCommercialID-016', productType: 'Earphone', quantity: 60, price: 6000 } }] }
        if (user.userId === 'ID-007' && user.role === 'admin' && user.address === 'East Street, No 2' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active' && orderId === 'OrderID-007') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-007', productType: 'Speaker', quantity: 70, price: 7000 } }, { product: { productCommercialId: 'ProductCommercialID-017', productType: 'Speaker', quantity: 70, price: 7000 } }] }
        if (user.userId === 'ID-008' && user.role === 'admin' && user.address === 'East Street, No 3' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active' && orderId === 'OrderID-008') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-008', productType: 'Monitor', quantity: 80, price: 8000 } }, { product: { productCommercialId: 'ProductCommercialID-018', productType: 'Monitor', quantity: 80, price: 8000 } }] }
        if (user.userId === 'ID-009' && user.role === 'admin' && user.address === 'East Street, No 4' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive' && orderId === 'OrderID-009') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-009', productType: 'Keyboard', quantity: 90, price: 9000 } }, { product: { productCommercialId: 'ProductCommercialID-019', productType: 'Keyboard', quantity: 90, price: 9000 } }] }
        if (user.userId === 'ID-010' && user.role === 'admin' && user.address === 'East Street, No 5' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active' && orderId === 'OrderID-010') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-010', productType: 'Mouse', quantity: 100, price: 10000 } }, { product: { productCommercialId: 'ProductCommercialID-020', productType: 'Mouse', quantity: 100, price: 10000 } }] }
        return null
      }), 
      rejectOrderRequest: jest.fn((user, orderId) => {
        if (user.userId === 'ID-001' && user.role === 'admin' && user.address === 'West Street, No 1' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active' && orderId === 'OrderID-001') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', quantity: 10, price: 1000 } }, { product: { productCommercialId: 'ProductCommercialID-011', productType: 'Laptop', quantity: 10, price: 1000 } }] }
        if (user.userId === 'ID-002' && user.role === 'user' && user.address === 'West Street, No 2' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive' && orderId === 'OrderID-002') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-002', productType: 'Smartphone', quantity: 20, price: 2000 } }, { product: { productCommercialId: 'ProductCommercialID-012', productType: 'Smartphone', quantity: 20, price: 2000 } }] }
        if (user.userId === 'ID-003' && user.role === 'user' && user.address === 'West Street, No 3' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive' && orderId === 'OrderID-003') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', quantity: 30, price: 3000 } }, { product: { productCommercialId: 'ProductCommercialID-013', productType: 'Tablet', quantity: 30, price: 3000 } }] }
        if (user.userId === 'ID-004' && user.role === 'user' && user.address === 'West Street, No 4' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active' && orderId === 'OrderID-004') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-004', productType: 'Smartwatch', quantity: 40, price: 4000 } }, { product: { productCommercialId: 'ProductCommercialID-014', productType: 'Smartwatch', quantity: 40, price: 4000 } }] }
        if (user.userId === 'ID-005' && user.role === 'user' && user.address === 'West Street, No 5' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive' && orderId === 'OrderID-005') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', quantity: 50, price: 5000 } }, { product: { productCommercialId: 'ProductCommercialID-015', productType: 'Headphone', quantity: 50, price: 5000 } }] }
        if (user.userId === 'ID-006' && user.role === 'user' && user.address === 'East Street, No 1' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive' && orderId === 'OrderID-006') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', quantity: 60, price: 6000 } }, { product: { productCommercialId: 'ProductCommercialID-016', productType: 'Earphone', quantity: 60, price: 6000 } }] }
        if (user.userId === 'ID-007' && user.role === 'admin' && user.address === 'East Street, No 2' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active' && orderId === 'OrderID-007') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-007', productType: 'Speaker', quantity: 70, price: 7000 } }, { product: { productCommercialId: 'ProductCommercialID-017', productType: 'Speaker', quantity: 70, price: 7000 } }] }
        if (user.userId === 'ID-008' && user.role === 'admin' && user.address === 'East Street, No 3' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active' && orderId === 'OrderID-008') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-008', productType: 'Monitor', quantity: 80, price: 8000 } }, { product: { productCommercialId: 'ProductCommercialID-018', productType: 'Monitor', quantity: 80, price: 8000 } }] }
        if (user.userId === 'ID-009' && user.role === 'admin' && user.address === 'East Street, No 4' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive' && orderId === 'OrderID-009') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-009', productType: 'Keyboard', quantity: 90, price: 9000 } }, { product: { productCommercialId: 'ProductCommercialID-019', productType: 'Keyboard', quantity: 90, price: 9000 } }] }
        if (user.userId === 'ID-010' && user.role === 'admin' && user.address === 'East Street, No 5' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active' && orderId === 'OrderID-010') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-010', productType: 'Mouse', quantity: 100, price: 10000 } }, { product: { productCommercialId: 'ProductCommercialID-020', productType: 'Mouse', quantity: 100, price: 10000 } }] }
        return null
      })
    };
  });
});

jest.mock('../services/orderService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      updateOrderDB: jest.fn((orderId, updatedOrder) => {
        if (orderId === 'OrderID-001' && ((updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-001' && updatedOrder.productItemList.product.productType === 'Laptop' && updatedOrder.productItemList.product.quantity === 10 && updatedOrder.productItemList.product.price === 1000) && (updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-011' && updatedOrder.productItemList.product.productType === 'Laptop' && updatedOrder.productItemList.product.quantity === 10 && updatedOrder.productItemList.product.price === 1000))) return null
        if (orderId === 'OrderID-002' && ((updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-002' && updatedOrder.productItemList.product.productType === 'Smartphone' && updatedOrder.productItemList.product.quantity === 20 && updatedOrder.productItemList.product.price === 2000) && (updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-012' && updatedOrder.productItemList.product.productType === 'Smartphone' && updatedOrder.productItemList.product.quantity === 20 && updatedOrder.productItemList.product.price === 2000))) return null
        if (orderId === 'OrderID-003' && ((updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-003' && updatedOrder.productItemList.product.productType === 'Tablet' && updatedOrder.productItemList.product.quantity === 30 && updatedOrder.productItemList.product.price === 3000) && (updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-013' && updatedOrder.productItemList.product.productType === 'Tablet' && updatedOrder.productItemList.product.quantity === 30 && updatedOrder.productItemList.product.price === 3000))) return null
        if (orderId === 'OrderID-004' && ((updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-004' && updatedOrder.productItemList.product.productType === 'Smartwatch' && updatedOrder.productItemList.product.quantity === 40 && updatedOrder.productItemList.product.price === 4000) && (updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-014' && updatedOrder.productItemList.product.productType === 'Smartwatch' && updatedOrder.productItemList.product.quantity === 40 && updatedOrder.productItemList.product.price === 4000))) return null
        if (orderId === 'OrderID-005' && ((updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-005' && updatedOrder.productItemList.product.productType === 'Headphone' && updatedOrder.productItemList.product.quantity === 50 && updatedOrder.productItemList.product.price === 5000) && (updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-015' && updatedOrder.productItemList.product.productType === 'Headphone' && updatedOrder.productItemList.product.quantity === 50 && updatedOrder.productItemList.product.price === 5000))) return null
        if (orderId === 'OrderID-006' && ((updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-006' && updatedOrder.productItemList.product.productType === 'Earphone' && updatedOrder.productItemList.product.quantity === 60 && updatedOrder.productItemList.product.price === 6000) && (updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-016' && updatedOrder.productItemList.product.productType === 'Earphone' && updatedOrder.productItemList.product.quantity === 60 && updatedOrder.productItemList.product.price === 6000))) return null
        if (orderId === 'OrderID-007' && ((updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-007' && updatedOrder.productItemList.product.productType === 'Speaker' && updatedOrder.productItemList.product.quantity === 70 && updatedOrder.productItemList.product.price === 7000) && (updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-017' && updatedOrder.productItemList.product.productType === 'Speaker' && updatedOrder.productItemList.product.quantity === 70 && updatedOrder.productItemList.product.price === 7000))) return null
        if (orderId === 'OrderID-008' && ((updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-008' && updatedOrder.productItemList.product.productType === 'Monitor' && updatedOrder.productItemList.product.quantity === 80 && updatedOrder.productItemList.product.price === 8000) && (updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-018' && updatedOrder.productItemList.product.productType === 'Monitor' && updatedOrder.productItemList.product.quantity === 80 && updatedOrder.productItemList.product.price === 8000))) return null
        if (orderId === 'OrderID-009' && ((updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-009' && updatedOrder.productItemList.product.productType === 'Keyboard' && updatedOrder.productItemList.product.quantity === 90 && updatedOrder.productItemList.product.price === 9000) && (updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-019' && updatedOrder.productItemList.product.productType === 'Keyboard' && updatedOrder.productItemList.product.quantity === 90 && updatedOrder.productItemList.product.price === 9000))) return null
        if (orderId === 'OrderID-010' && ((updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-010' && updatedOrder.productItemList.product.productType === 'Mouse' && updatedOrder.productItemList.product.quantity === 100 && updatedOrder.productItemList.product.price === 10000) && (updatedOrder.productItemList.product.productCommercialId === 'ProductCommercialID-020' && updatedOrder.productItemList.product.productType === 'Mouse' && updatedOrder.productItemList.product.quantity === 100 && updatedOrder.productItemList.product.price === 10000))) return null
        return null
      })
    };
  });
});

jest.mock('../services/productCommercialService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      updateProductDB: jest.fn((productCommercialId, product) => {
        if (productCommercialId === 'ProductCommercialID-001' && product.productCommercialId === 'ProductCommercialID-001' && product.productType === 'Laptop' && product.quantity === 10 && product.price === 1000) return null
        if (productCommercialId === 'ProductCommercialID-002' && product.productCommercialId === 'ProductCommercialID-002' && product.productType === 'Smartphone' && product.quantity === 20 && product.price === 2000) return null
        if (productCommercialId === 'ProductCommercialID-003' && product.productCommercialId === 'ProductCommercialID-003' && product.productType === 'Tablet' && product.quantity === 30 && product.price === 3000) return null
        if (productCommercialId === 'ProductCommercialID-004' && product.productCommercialId === 'ProductCommercialID-004' && product.productType === 'Smartwatch' && product.quantity === 40 && product.price === 4000) return null
        if (productCommercialId === 'ProductCommercialID-005' && product.productCommercialId === 'ProductCommercialID-005' && product.productType === 'Headphone' && product.quantity === 50 && product.price === 5000) return null
        if (productCommercialId === 'ProductCommercialID-006' && product.productCommercialId === 'ProductCommercialID-011' && product.productType === 'Laptop' && product.quantity === 60 && product.price === 6000) return null
        if (productCommercialId === 'ProductCommercialID-007' && product.productCommercialId === 'ProductCommercialID-012' && product.productType === 'Smartphone' && product.quantity === 70 && product.price === 7000) return null
        if (productCommercialId === 'ProductCommercialID-008' && product.productCommercialId === 'ProductCommercialID-013' && product.productType === 'Tablet' && product.quantity === 80 && product.price === 8000) return null
        if (productCommercialId === 'ProductCommercialID-009' && product.productCommercialId === 'ProductCommercialID-014' && product.productType === 'Smartphone' && product.quantity === 90 && product.price === 9000) return null
        if (productCommercialId === 'ProductCommercialID-010' && product.productCommercialId === 'ProductCommercialID-015' && product.productType === 'Laptop' && product.quantity === 100 && product.price === 10000) return null
        return null
      })
    };
  });
});

describe('# ManufacturerController', () => {
    describe('## approveOrderRequest method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-011', role: 'user', address: 'East Street, No 1', userName: 'User 07', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'active' }, body: { orderId: 'OrderID-002' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ManufacturerController.approveOrderRequest(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'productItemList')"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-012', role: 'user', address: 'East Street, No 5', userName: 'User 04', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'active' }, body: { orderId: 'OrderID-001' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ManufacturerController.approveOrderRequest(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'productItemList')"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-007', role: 'user', address: 'West Street, No 3', userName: 'User 03', phoneNumber: '086657778155', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'inactive' }, body: { orderId: 'OrderID-003' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ManufacturerController.approveOrderRequest(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## rejectOrderRequest method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-002', role: 'user', address: 'West Street, No 2', userName: 'User 02', phoneNumber: '085200178467', password: 'opv^srosztx!klt', status: 'active' }, body: { orderId: 'OrderID-001' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ManufacturerController.rejectOrderRequest(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'productItemList')"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-012', role: 'user', address: 'East Street, No 2', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'active' }, body: { orderId: 'OrderID-004' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ManufacturerController.rejectOrderRequest(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'productItemList')"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-010', role: 'admin', address: 'East Street, No 5', userName: 'User 10', phoneNumber: '082186254770', password: '+j)*jakuv(ellf', status: 'inactive' }, body: { orderId: 'OrderID-007' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ManufacturerController.rejectOrderRequest(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
})
