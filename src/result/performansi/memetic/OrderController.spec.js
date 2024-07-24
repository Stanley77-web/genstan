import OrderController from '../controllers/OrderController';

jest.mock('../services/orderService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getTransactionHistory: jest.fn(async (userId, orderId) => {
        if (userId === 'ID-001' && orderId === 'OrderID-001') return { userId: 'ID-001', orderId: 'OrderID-001', date: '29-06-2024', amount: 1000 }
        if (userId === 'ID-002' && orderId === 'OrderID-002') return { userId: 'ID-002', orderId: 'OrderID-002', date: '30-06-2024', amount: 2000 }
        if (userId === 'ID-003' && orderId === 'OrderID-003') return { userId: 'ID-003', orderId: 'OrderID-003', date: '31-06-2024', amount: 3000 }
        if (userId === 'ID-004' && orderId === 'OrderID-004') return { userId: 'ID-004', orderId: 'OrderID-004', date: '01-07-2024', amount: 4000 }
        if (userId === 'ID-005' && orderId === 'OrderID-005') return { userId: 'ID-005', orderId: 'OrderID-005', date: '02-07-2024', amount: 5000 }
        if (userId === 'ID-006' && orderId === 'OrderID-006') return { userId: 'ID-006', orderId: 'OrderID-006', date: '03-07-2024', amount: 6000 }
        if (userId === 'ID-007' && orderId === 'OrderID-007') return { userId: 'ID-007', orderId: 'OrderID-007', date: '04-07-2024', amount: 7000 }
        if (userId === 'ID-008' && orderId === 'OrderID-008') return { userId: 'ID-008', orderId: 'OrderID-008', date: '05-07-2024', amount: 8000 }
        if (userId === 'ID-009' && orderId === 'OrderID-009') return { userId: 'ID-009', orderId: 'OrderID-009', date: '06-07-2024', amount: 9000 }
        if (userId === 'ID-010' && orderId === 'OrderID-010') return { userId: 'ID-010', orderId: 'OrderID-010', date: '07-07-2024', amount: 10000 }
        return null
      }), 
      getAllOrders: jest.fn((user, statusValue) => {
        if (user.userId === 'ID-001' && statusValue === '') return [{ orderId: 'OrderID-001', orderDate: '29-06-2024' }, { orderId: 'OrderID-011', orderDate: '29-06-2024' }]
        if (user.userId === 'ID-002' && statusValue === 'True') return [{ orderId: 'OrderID-002', orderDate: '30-06-2024' }, { orderId: 'OrderID-012', orderDate: '30-06-2024' }]
        if (user.userId === 'ID-003' && statusValue === '') return [{ orderId: 'OrderID-003', orderDate: '31-06-2024' }, { orderId: 'OrderID-013', orderDate: '31-06-2024' }]
        if (user.userId === 'ID-004' && statusValue === 'True') return [{ orderId: 'OrderID-004', orderDate: '01-07-2024' }, { orderId: 'OrderID-014', orderDate: '01-07-2024' }]
        if (user.userId === 'ID-005' && statusValue === '') return [{ orderId: 'OrderID-005', orderDate: '02-07-2024' }, { orderId: 'OrderID-015', orderDate: '02-07-2024' }]
        if (user.userId === 'ID-006' && statusValue === 'True') return [{ orderId: 'OrderID-006', orderDate: '03-07-2024' }, { orderId: 'OrderID-016', orderDate: '03-07-2024' }]
        if (user.userId === 'ID-007' && statusValue === '') return [{ orderId: 'OrderID-007', orderDate: '04-07-2024' }, { orderId: 'OrderID-017', orderDate: '04-07-2024' }]
        if (user.userId === 'ID-008' && statusValue === '') return [{ orderId: 'OrderID-008', orderDate: '05-07-2024' }, { orderId: 'OrderID-018', orderDate: '05-07-2024' }]
        if (user.userId === 'ID-009' && statusValue === 'True') return [{ orderId: 'OrderID-009', orderDate: '06-07-2024' }, { orderId: 'OrderID-019', orderDate: '06-07-2024' }]
        if (user.userId === 'ID-010' && statusValue === 'True') return [{ orderId: 'OrderID-010', orderDate: '07-07-2024' }, { orderId: 'OrderID-020', orderDate: '07-07-2024' }]
        return null
      }), 
      getAllOrdersByAddress: jest.fn((user, address) => {
        if (user.userId === 'ID-001' && address === 'West Street, No 1') return [{ orderId: 'OrderID-001', orderDate: '29-06-2024' }, { orderId: 'OrderID-011', orderDate: '29-06-2024' }]
        if (user.userId === 'ID-002' && address === 'West Street, No 2') return [{ orderId: 'OrderID-002', orderDate: '30-06-2024' }, { orderId: 'OrderID-012', orderDate: '30-06-2024' }]
        if (user.userId === 'ID-003' && address === 'West Street, No 3') return [{ orderId: 'OrderID-003', orderDate: '31-06-2024' }, { orderId: 'OrderID-013', orderDate: '31-06-2024' }]
        if (user.userId === 'ID-004' && address === 'West Street, No 4') return [{ orderId: 'OrderID-004', orderDate: '01-07-2024' }, { orderId: 'OrderID-014', orderDate: '01-07-2024' }]
        if (user.userId === 'ID-005' && address === 'West Street, No 5') return [{ orderId: 'OrderID-005', orderDate: '02-07-2024' }, { orderId: 'OrderID-015', orderDate: '02-07-2024' }]
        if (user.userId === 'ID-006' && address === 'East Street, No 1') return [{ orderId: 'OrderID-006', orderDate: '03-07-2024' }, { orderId: 'OrderID-016', orderDate: '03-07-2024' }]
        if (user.userId === 'ID-007' && address === 'East Street, No 2') return [{ orderId: 'OrderID-007', orderDate: '04-07-2024' }, { orderId: 'OrderID-017', orderDate: '04-07-2024' }]
        if (user.userId === 'ID-008' && address === 'East Street, No 3') return [{ orderId: 'OrderID-008', orderDate: '05-07-2024' }, { orderId: 'OrderID-018', orderDate: '05-07-2024' }]
        if (user.userId === 'ID-009' && address === 'East Street, No 4') return [{ orderId: 'OrderID-009', orderDate: '06-07-2024' }, { orderId: 'OrderID-019', orderDate: '06-07-2024' }]
        if (user.userId === 'ID-010' && address === 'East Street, No 5') return [{ orderId: 'OrderID-010', orderDate: '07-07-2024' }, { orderId: 'OrderID-020', orderDate: '07-07-2024' }]
        return null
      }), 
      getAllOrdersOfManufacturer: jest.fn((user, userId, statusValue) => {
        if (user.userId === 'ID-001' && userId === 'ID-001' && statusValue === '') return [{ orderId: 'OrderID-001', orderDate: '29-06-2024' }, { orderId: 'OrderID-011', orderDate: '29-06-2024' }]
        if (user.userId === 'ID-002' && userId === 'ID-002' && statusValue === 'True') return [{ orderId: 'OrderID-002', orderDate: '30-06-2024' }, { orderId: 'OrderID-012', orderDate: '30-06-2024' }]
        if (user.userId === 'ID-003' && userId === 'ID-003' && statusValue === '') return [{ orderId: 'OrderID-003', orderDate: '31-06-2024' }, { orderId: 'OrderID-013', orderDate: '31-06-2024' }]
        if (user.userId === 'ID-004' && userId === 'ID-004' && statusValue === 'True') return [{ orderId: 'OrderID-004', orderDate: '01-07-2024' }, { orderId: 'OrderID-014', orderDate: '01-07-2024' }]
        if (user.userId === 'ID-005' && userId === 'ID-005' && statusValue === '') return [{ orderId: 'OrderID-005', orderDate: '02-07-2024' }, { orderId: 'OrderID-015', orderDate: '02-07-2024' }]
        if (user.userId === 'ID-006' && userId === 'ID-006' && statusValue === 'True') return [{ orderId: 'OrderID-006', orderDate: '03-07-2024' }, { orderId: 'OrderID-016', orderDate: '03-07-2024' }]
        if (user.userId === 'ID-007' && userId === 'ID-007' && statusValue === '') return [{ orderId: 'OrderID-007', orderDate: '04-07-2024' }, { orderId: 'OrderID-017', orderDate: '04-07-2024' }]
        if (user.userId === 'ID-008' && userId === 'ID-008' && statusValue === '') return [{ orderId: 'OrderID-008', orderDate: '05-07-2024' }, { orderId: 'OrderID-018', orderDate: '05-07-2024' }]
        if (user.userId === 'ID-009' && userId === 'ID-009' && statusValue === 'True') return [{ orderId: 'OrderID-009', orderDate: '06-07-2024' }, { orderId: 'OrderID-019', orderDate: '06-07-2024' }]
        if (user.userId === 'ID-010' && userId === 'ID-010' && statusValue === 'True') return [{ orderId: 'OrderID-010', orderDate: '07-07-2024' }, { orderId: 'OrderID-020', orderDate: '07-07-2024' }]
        return null
      }), 
      getAllOrdersOfDistributor: jest.fn((user, userId, statusValue) => {
        if (user.userId === 'ID-001' && userId === 'ID-001' && statusValue === '') return [{ orderId: 'OrderID-001', orderDate: '29-06-2024' }, { orderId: 'OrderID-011', orderDate: '29-06-2024' }]
        if (user.userId === 'ID-002' && userId === 'ID-002' && statusValue === 'True') return [{ orderId: 'OrderID-002', orderDate: '30-06-2024' }, { orderId: 'OrderID-012', orderDate: '30-06-2024' }]
        if (user.userId === 'ID-003' && userId === 'ID-003' && statusValue === '') return [{ orderId: 'OrderID-003', orderDate: '31-06-2024' }, { orderId: 'OrderID-013', orderDate: '31-06-2024' }]
        if (user.userId === 'ID-004' && userId === 'ID-004' && statusValue === 'True') return [{ orderId: 'OrderID-004', orderDate: '01-07-2024' }, { orderId: 'OrderID-014', orderDate: '01-07-2024' }]
        if (user.userId === 'ID-005' && userId === 'ID-005' && statusValue === '') return [{ orderId: 'OrderID-005', orderDate: '02-07-2024' }, { orderId: 'OrderID-015', orderDate: '02-07-2024' }]
        if (user.userId === 'ID-006' && userId === 'ID-006' && statusValue === 'True') return [{ orderId: 'OrderID-006', orderDate: '03-07-2024' }, { orderId: 'OrderID-016', orderDate: '03-07-2024' }]
        if (user.userId === 'ID-007' && userId === 'ID-007' && statusValue === '') return [{ orderId: 'OrderID-007', orderDate: '04-07-2024' }, { orderId: 'OrderID-017', orderDate: '04-07-2024' }]
        if (user.userId === 'ID-008' && userId === 'ID-008' && statusValue === '') return [{ orderId: 'OrderID-008', orderDate: '05-07-2024' }, { orderId: 'OrderID-018', orderDate: '05-07-2024' }]
        if (user.userId === 'ID-009' && userId === 'ID-009' && statusValue === 'True') return [{ orderId: 'OrderID-009', orderDate: '06-07-2024' }, { orderId: 'OrderID-019', orderDate: '06-07-2024' }]
        if (user.userId === 'ID-010' && userId === 'ID-010' && statusValue === 'True') return [{ orderId: 'OrderID-010', orderDate: '07-07-2024' }, { orderId: 'OrderID-020', orderDate: '07-07-2024' }]
        return null
      }), 
      getAllOrdersOfRetailer: jest.fn((user, userId, statusValue) => {
        if (user.userId === 'ID-001' && userId === 'ID-001' && statusValue === '') return [{ orderId: 'OrderID-001', orderDate: '29-06-2024' }, { orderId: 'OrderID-011', orderDate: '29-06-2024' }]
        if (user.userId === 'ID-002' && userId === 'ID-002' && statusValue === 'True') return [{ orderId: 'OrderID-002', orderDate: '30-06-2024' }, { orderId: 'OrderID-012', orderDate: '30-06-2024' }]
        if (user.userId === 'ID-003' && userId === 'ID-003' && statusValue === '') return [{ orderId: 'OrderID-003', orderDate: '31-06-2024' }, { orderId: 'OrderID-013', orderDate: '31-06-2024' }]
        if (user.userId === 'ID-004' && userId === 'ID-004' && statusValue === 'True') return [{ orderId: 'OrderID-004', orderDate: '01-07-2024' }, { orderId: 'OrderID-014', orderDate: '01-07-2024' }]
        if (user.userId === 'ID-005' && userId === 'ID-005' && statusValue === '') return [{ orderId: 'OrderID-005', orderDate: '02-07-2024' }, { orderId: 'OrderID-015', orderDate: '02-07-2024' }]
        if (user.userId === 'ID-006' && userId === 'ID-006' && statusValue === 'True') return [{ orderId: 'OrderID-006', orderDate: '03-07-2024' }, { orderId: 'OrderID-016', orderDate: '03-07-2024' }]
        if (user.userId === 'ID-007' && userId === 'ID-007' && statusValue === '') return [{ orderId: 'OrderID-007', orderDate: '04-07-2024' }, { orderId: 'OrderID-017', orderDate: '04-07-2024' }]
        if (user.userId === 'ID-008' && userId === 'ID-008' && statusValue === '') return [{ orderId: 'OrderID-008', orderDate: '05-07-2024' }, { orderId: 'OrderID-018', orderDate: '05-07-2024' }]
        if (user.userId === 'ID-009' && userId === 'ID-009' && statusValue === 'True') return [{ orderId: 'OrderID-009', orderDate: '06-07-2024' }, { orderId: 'OrderID-019', orderDate: '06-07-2024' }]
        if (user.userId === 'ID-010' && userId === 'ID-010' && statusValue === 'True') return [{ orderId: 'OrderID-010', orderDate: '07-07-2024' }, { orderId: 'OrderID-020', orderDate: '07-07-2024' }]
        return null
      }), 
      getDetailOrder: jest.fn((user, orderId) => {
        if (user.userId === 'ID-001' && orderId === 'OrderID-001') return { orderId: 'OrderID-001', orderDate: '29-06-2024' }
        if (user.userId === 'ID-002' && orderId === 'OrderID-002') return { orderId: 'OrderID-002', orderDate: '30-06-2024' }
        if (user.userId === 'ID-003' && orderId === 'OrderID-003') return { orderId: 'OrderID-003', orderDate: '31-06-2024' }
        if (user.userId === 'ID-004' && orderId === 'OrderID-004') return { orderId: 'OrderID-004', orderDate: '01-07-2024' }
        if (user.userId === 'ID-005' && orderId === 'OrderID-005') return { orderId: 'OrderID-005', orderDate: '02-07-2024' }
        if (user.userId === 'ID-006' && orderId === 'OrderID-006') return { orderId: 'OrderID-006', orderDate: '03-07-2024' }
        if (user.userId === 'ID-007' && orderId === 'OrderID-007') return { orderId: 'OrderID-007', orderDate: '04-07-2024' }
        if (user.userId === 'ID-008' && orderId === 'OrderID-008') return { orderId: 'OrderID-008', orderDate: '05-07-2024' }
        if (user.userId === 'ID-009' && orderId === 'OrderID-009') return { orderId: 'OrderID-009', orderDate: '06-07-2024' }
        if (user.userId === 'ID-010' && orderId === 'OrderID-010') return { orderId: 'OrderID-010', orderDate: '07-07-2024' }
        return null
      }), 
      OrderPayloadForCreateToOrderForCreate: jest.fn((user, order) => {
        if (user.userId === 'ID-001' && order.orderId === 'OrderID-001' && order.orderDate === '29-06-2024') return { orderId: 'OrderID-001', orderDate: '29-06-2024', qrCode: null }
        if (user.userId === 'ID-002' && order.orderId === 'OrderID-002' && order.orderDate === '30-06-2024') return { orderId: 'OrderID-002', orderDate: '30-06-2024', qrCode: null }
        if (user.userId === 'ID-003' && order.orderId === 'OrderID-003' && order.orderDate === '31-06-2024') return { orderId: 'OrderID-003', orderDate: '31-06-2024', qrCode: null }
        if (user.userId === 'ID-004' && order.orderId === 'OrderID-004' && order.orderDate === '01-07-2024') return { orderId: 'OrderID-004', orderDate: '01-07-2024', qrCode: null }
        if (user.userId === 'ID-005' && order.orderId === 'OrderID-005' && order.orderDate === '02-07-2024') return { orderId: 'OrderID-005', orderDate: '02-07-2024', qrCode: null }
        if (user.userId === 'ID-006' && order.orderId === 'OrderID-006' && order.orderDate === '03-07-2024') return { orderId: 'OrderID-006', orderDate: '03-07-2024', qrCode: null }
        if (user.userId === 'ID-007' && order.orderId === 'OrderID-007' && order.orderDate === '04-07-2024') return { orderId: 'OrderID-007', orderDate: '04-07-2024', qrCode: null }
        if (user.userId === 'ID-008' && order.orderId === 'OrderID-008' && order.orderDate === '05-07-2024') return { orderId: 'OrderID-008', orderDate: '05-07-2024', qrCode: null }
        if (user.userId === 'ID-009' && order.orderId === 'OrderID-009' && order.orderDate === '06-07-2024') return { orderId: 'OrderID-009', orderDate: '06-07-2024', qrCode: null }
        if (user.userId === 'ID-010' && order.orderId === 'OrderID-010' && order.orderDate === '07-07-2024') return { orderId: 'OrderID-010', orderDate: '07-07-2024', qrCode: null }
        return null
      }), 
      generateOrderQRCode: jest.fn((user) => {
        if (user.userId === 'ID-001') return 'QRCode-001'
        if (user.userId === 'ID-002') return 'QRCode-002'
        if (user.userId === 'ID-003') return 'QRCode-003'
        if (user.userId === 'ID-004') return 'QRCode-004'
        if (user.userId === 'ID-005') return 'QRCode-005'
        if (user.userId === 'ID-006') return 'QRCode-006'
        if (user.userId === 'ID-007') return 'QRCode-007'
        if (user.userId === 'ID-008') return 'QRCode-008'
        if (user.userId === 'ID-009') return 'QRCode-009'
        if (user.userId === 'ID-010') return 'QRCode-010'
        return null
      }), 
      createOrder: jest.fn((user, order) => {
        if (user.userId === 'ID-001' && order.orderId === 'OrderID-001' && order.orderDate === '29-06-2024' && order.qrCode === 'QRCode-001') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', quantity: 10, price: 1000 } }, { product: { productCommercialId: 'ProductCommercialID-011', productType: 'Laptop', quantity: 10, price: 1000 } }] }
        if (user.userId === 'ID-002' && order.orderId === 'OrderID-002' && order.orderDate === '30-06-2024' && order.qrCode === 'QRCode-002') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-002', productType: 'Smartphone', quantity: 20, price: 2000 } }, { product: { productCommercialId: 'ProductCommercialID-012', productType: 'Smartphone', quantity: 20, price: 2000 } }] }
        if (user.userId === 'ID-003' && order.orderId === 'OrderID-003' && order.orderDate === '31-06-2024' && order.qrCode === 'QRCode-003') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', quantity: 30, price: 3000 } }, { product: { productCommercialId: 'ProductCommercialID-013', productType: 'Tablet', quantity: 30, price: 3000 } }] }
        if (user.userId === 'ID-004' && order.orderId === 'OrderID-004' && order.orderDate === '01-07-2024' && order.qrCode === 'QRCode-004') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-004', productType: 'Smartwatch', quantity: 40, price: 4000 } }, { product: { productCommercialId: 'ProductCommercialID-014', productType: 'Smartwatch', quantity: 40, price: 4000 } }] }
        if (user.userId === 'ID-005' && order.orderId === 'OrderID-005' && order.orderDate === '02-07-2024' && order.qrCode === 'QRCode-005') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', quantity: 50, price: 5000 } }, { product: { productCommercialId: 'ProductCommercialID-015', productType: 'Headphone', quantity: 50, price: 5000 } }] }
        if (user.userId === 'ID-006' && order.orderId === 'OrderID-006' && order.orderDate === '03-07-2024' && order.qrCode === 'QRCode-006') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', quantity: 60, price: 6000 } }, { product: { productCommercialId: 'ProductCommercialID-016', productType: 'Earphone', quantity: 60, price: 6000 } }] }
        if (user.userId === 'ID-007' && order.orderId === 'OrderID-007' && order.orderDate === '04-07-2024' && order.qrCode === 'QRCode-007') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-007', productType: 'Speaker', quantity: 70, price: 7000 } }, { product: { productCommercialId: 'ProductCommercialID-017', productType: 'Speaker', quantity: 70, price: 7000 } }] }
        if (user.userId === 'ID-008' && order.orderId === 'OrderID-008' && order.orderDate === '05-07-2024' && order.qrCode === 'QRCode-008') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-008', productType: 'Monitor', quantity: 80, price: 8000 } }, { product: { productCommercialId: 'ProductCommercialID-018', productType: 'Monitor', quantity: 80, price: 8000 } }] }
        if (user.userId === 'ID-009' && order.orderId === 'OrderID-009' && order.orderDate === '06-07-2024' && order.qrCode === 'QRCode-009') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-009', productType: 'Keyboard', quantity: 90, price: 9000 } }, { product: { productCommercialId: 'ProductCommercialID-019', productType: 'Keyboard', quantity: 90, price: 9000 } }] }
        if (user.userId === 'ID-010' && order.orderId === 'OrderID-010' && order.orderDate === '07-07-2024' && order.qrCode === 'QRCode-010') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-010', productType: 'Mouse', quantity: 100, price: 10000 } }, { product: { productCommercialId: 'ProductCommercialID-020', productType: 'Mouse', quantity: 100, price: 10000 } }] }
        return null
      }), 
      createOrderDB: jest.fn((createdOrder) => {
        if (((createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-001' && createdOrder.productItemList.product.productType === 'Laptop' && createdOrder.productItemList.product.quantity === 10 && createdOrder.productItemList.product.price === 1000) && (createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-011' && createdOrder.productItemList.product.productType === 'Laptop' && createdOrder.productItemList.product.quantity === 10 && createdOrder.productItemList.product.price === 1000))) return null
        if (((createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-002' && createdOrder.productItemList.product.productType === 'Smartphone' && createdOrder.productItemList.product.quantity === 20 && createdOrder.productItemList.product.price === 2000) && (createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-012' && createdOrder.productItemList.product.productType === 'Smartphone' && createdOrder.productItemList.product.quantity === 20 && createdOrder.productItemList.product.price === 2000))) return null
        if (((createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-003' && createdOrder.productItemList.product.productType === 'Tablet' && createdOrder.productItemList.product.quantity === 30 && createdOrder.productItemList.product.price === 3000) && (createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-013' && createdOrder.productItemList.product.productType === 'Tablet' && createdOrder.productItemList.product.quantity === 30 && createdOrder.productItemList.product.price === 3000))) return null
        if (((createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-004' && createdOrder.productItemList.product.productType === 'Smartwatch' && createdOrder.productItemList.product.quantity === 40 && createdOrder.productItemList.product.price === 4000) && (createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-014' && createdOrder.productItemList.product.productType === 'Smartwatch' && createdOrder.productItemList.product.quantity === 40 && createdOrder.productItemList.product.price === 4000))) return null
        if (((createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-005' && createdOrder.productItemList.product.productType === 'Headphone' && createdOrder.productItemList.product.quantity === 50 && createdOrder.productItemList.product.price === 5000) && (createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-015' && createdOrder.productItemList.product.productType === 'Headphone' && createdOrder.productItemList.product.quantity === 50 && createdOrder.productItemList.product.price === 5000))) return null
        if (((createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-006' && createdOrder.productItemList.product.productType === 'Earphone' && createdOrder.productItemList.product.quantity === 60 && createdOrder.productItemList.product.price === 6000) && (createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-016' && createdOrder.productItemList.product.productType === 'Earphone' && createdOrder.productItemList.product.quantity === 60 && createdOrder.productItemList.product.price === 6000))) return null
        if (((createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-007' && createdOrder.productItemList.product.productType === 'Speaker' && createdOrder.productItemList.product.quantity === 70 && createdOrder.productItemList.product.price === 7000) && (createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-017' && createdOrder.productItemList.product.productType === 'Speaker' && createdOrder.productItemList.product.quantity === 70 && createdOrder.productItemList.product.price === 7000))) return null
        if (((createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-008' && createdOrder.productItemList.product.productType === 'Monitor' && createdOrder.productItemList.product.quantity === 80 && createdOrder.productItemList.product.price === 8000) && (createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-018' && createdOrder.productItemList.product.productType === 'Monitor' && createdOrder.productItemList.product.quantity === 80 && createdOrder.productItemList.product.price === 8000))) return null
        if (((createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-009' && createdOrder.productItemList.product.productType === 'Keyboard' && createdOrder.productItemList.product.quantity === 90 && createdOrder.productItemList.product.price === 9000) && (createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-019' && createdOrder.productItemList.product.productType === 'Keyboard' && createdOrder.productItemList.product.quantity === 90 && createdOrder.productItemList.product.price === 9000))) return null
        if (((createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-010' && createdOrder.productItemList.product.productType === 'Mouse' && createdOrder.productItemList.product.quantity === 100 && createdOrder.productItemList.product.price === 10000) && (createdOrder.productItemList.product.productCommercialId === 'ProductCommercialID-020' && createdOrder.productItemList.product.productType === 'Mouse' && createdOrder.productItemList.product.quantity === 100 && createdOrder.productItemList.product.price === 10000))) return null
        return null
      }), 
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

jest.mock('../services/productCommercialService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      createProductDB: jest.fn((product) => {
        if (product.productCommercialId === 'ProductCommercialID-001' && product.productType === 'Laptop' && product.quantity === 10 && product.price === 1000) return null
        if (product.productCommercialId === 'ProductCommercialID-002' && product.productType === 'Smartphone' && product.quantity === 20 && product.price === 2000) return null
        if (product.productCommercialId === 'ProductCommercialID-003' && product.productType === 'Tablet' && product.quantity === 30 && product.price === 3000) return null
        if (product.productCommercialId === 'ProductCommercialID-004' && product.productType === 'Smartwatch' && product.quantity === 40 && product.price === 4000) return null
        if (product.productCommercialId === 'ProductCommercialID-005' && product.productType === 'Headphone' && product.quantity === 50 && product.price === 5000) return null
        if (product.productCommercialId === 'ProductCommercialID-006' && product.productType === 'Earphone' && product.quantity === 60 && product.price === 6000) return null
        if (product.productCommercialId === 'ProductCommercialID-007' && product.productType === 'Speaker' && product.quantity === 70 && product.price === 7000) return null
        if (product.productCommercialId === 'ProductCommercialID-008' && product.productType === 'Monitor' && product.quantity === 80 && product.price === 8000) return null
        if (product.productCommercialId === 'ProductCommercialID-009' && product.productType === 'Keyboard' && product.quantity === 90 && product.price === 9000) return null
        if (product.productCommercialId === 'ProductCommercialID-010' && product.productType === 'Mouse' && product.quantity === 100 && product.price === 10000) return null
        return null
      }), 
      updateProductDB: jest.fn((orderId, updatedOrder) => {
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

jest.mock('../appService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      submitTransactionOrderObj: jest.fn(async (statusOrder, user, order) => {
        if (statusOrder === 'UpdateOrder' && user.userId === 'ID-001' && order.orderId === 'OrderID-001' && order.orderDate === '29-06-2024' && order.qrCode === 'QRCode-001') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-001', productType: 'Laptop', quantity: 10, price: 1000 } }, { product: { productCommercialId: 'ProductCommercialID-011', productType: 'Laptop', quantity: 10, price: 1000 } }] }
        if (statusOrder === 'UpdateOrder' && user.userId === 'ID-002' && order.orderId === 'OrderID-002' && order.orderDate === '30-06-2024' && order.qrCode === 'QRCode-002') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-002', productType: 'Smartphone', quantity: 20, price: 2000 } }, { product: { productCommercialId: 'ProductCommercialID-012', productType: 'Smartphone', quantity: 20, price: 2000 } }] }
        if (statusOrder === 'UpdateOrder' && user.userId === 'ID-003' && order.orderId === 'OrderID-003' && order.orderDate === '31-06-2024' && order.qrCode === 'QRCode-003') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-003', productType: 'Tablet', quantity: 30, price: 3000 } }, { product: { productCommercialId: 'ProductCommercialID-013', productType: 'Tablet', quantity: 30, price: 3000 } }] }
        if (statusOrder === 'UpdateOrder' && user.userId === 'ID-004' && order.orderId === 'OrderID-004' && order.orderDate === '01-07-2024' && order.qrCode === 'QRCode-004') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-004', productType: 'Smartwatch', quantity: 40, price: 4000 } }, { product: { productCommercialId: 'ProductCommercialID-014', productType: 'Smartwatch', quantity: 40, price: 4000 } }] }
        if (statusOrder === 'UpdateOrder' && user.userId === 'ID-005' && order.orderId === 'OrderID-005' && order.orderDate === '02-07-2024' && order.qrCode === 'QRCode-005') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-005', productType: 'Headphone', quantity: 50, price: 5000 } }, { product: { productCommercialId: 'ProductCommercialID-015', productType: 'Headphone', quantity: 50, price: 5000 } }] }
        if (statusOrder === 'UpdateOrder' && user.userId === 'ID-006' && order.orderId === 'OrderID-006' && order.orderDate === '03-07-2024' && order.qrCode === 'QRCode-006') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-006', productType: 'Earphone', quantity: 60, price: 6000 } }, { product: { productCommercialId: 'ProductCommercialID-016', productType: 'Earphone', quantity: 60, price: 6000 } }] }
        if (statusOrder === 'UpdateOrder' && user.userId === 'ID-007' && order.orderId === 'OrderID-007' && order.orderDate === '04-07-2024' && order.qrCode === 'QRCode-007') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-007', productType: 'Speaker', quantity: 70, price: 7000 } }, { product: { productCommercialId: 'ProductCommercialID-017', productType: 'Speaker', quantity: 70, price: 7000 } }] }
        if (statusOrder === 'UpdateOrder' && user.userId === 'ID-008' && order.orderId === 'OrderID-008' && order.orderDate === '05-07-2024' && order.qrCode === 'QRCode-008') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-008', productType: 'Monitor', quantity: 80, price: 8000 } }, { product: { productCommercialId: 'ProductCommercialID-018', productType: 'Monitor', quantity: 80, price: 8000 } }] }
        if (statusOrder === 'UpdateOrder' && user.userId === 'ID-009' && order.orderId === 'OrderID-009' && order.orderDate === '06-07-2024' && order.qrCode === 'QRCode-009') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-009', productType: 'Keyboard', quantity: 90, price: 9000 } }, { product: { productCommercialId: 'ProductCommercialID-019', productType: 'Keyboard', quantity: 90, price: 9000 } }] }
        if (statusOrder === 'UpdateOrder' && user.userId === 'ID-010' && order.orderId === 'OrderID-010' && order.orderDate === '07-07-2024' && order.qrCode === 'QRCode-010') return { productItemList: [{ product: { productCommercialId: 'ProductCommercialID-010', productType: 'Mouse', quantity: 100, price: 10000 } }, { product: { productCommercialId: 'ProductCommercialID-020', productType: 'Mouse', quantity: 100, price: 10000 } }] }
        return null
      })
    };
  });
});

describe('# OrderController', () => {
    describe('## getTransactionHistory method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  }, params: { orderId: 'OrderID-002' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getTransactionHistory(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  }, params: { orderId: 'OrderID-011' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getTransactionHistory(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
    })
    describe('## getAllOrders method', () => {
        it('Scenario 1', async () => {
            const request = { query: { status: 'True' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrders(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { query: { status: '' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrders(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { query: { status: 'True' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrders(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## getAllOrdersByAddress method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  }, query: { address: 'East Street, No 1' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersByAddress(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  }, query: { address: 'West Street, No 3' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersByAddress(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: {  }, query: { address: 'East Street, No 2' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersByAddress(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## getAllOrdersOfManufacturer method', () => {
        it('Scenario 1', async () => {
            const request = { query: { status: '' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersOfManufacturer(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { query: { status: 'True' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersOfManufacturer(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { query: { status: '' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersOfManufacturer(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## getAllOrdersOfDistributor method', () => {
        it('Scenario 1', async () => {
            const request = { query: { status: '' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersOfDistributor(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { query: { status: '' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersOfDistributor(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { query: { status: 'True' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersOfDistributor(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## getAllOrdersOfRetailer method', () => {
        it('Scenario 1', async () => {
            const request = { query: { status: '' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersOfRetailer(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { query: { status: '' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersOfRetailer(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { query: { status: 'True' }, user: {  } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getAllOrdersOfRetailer(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## getOrder method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  }, params: { orderId: 'OrderID-004' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  }, params: { orderId: 'OrderID-014' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: {  }, params: { orderId: 'OrderID-015' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.getOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## createOrder method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  }, body: { orderObj: { orderId: 'OrderID-004', orderDate: '01-07-2024', qrCode: 'QRCode-004' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.createOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  }, body: { orderObj: { orderId: 'OrderID-001', orderDate: '29-06-2024', qrCode: 'QRCode-001' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.createOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: {  }, body: { orderObj: [{ orderId: 'OrderID-005', orderDate: '02-07-2024' }, { orderId: 'OrderID-015', orderDate: '02-07-2024' }] } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.createOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## updateOrder method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-011' }, body: { orderObj: [{ orderId: 'OrderID-005', orderDate: '02-07-2024' }, { orderId: 'OrderID-015', orderDate: '02-07-2024' }] } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.updateOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'productItemList')"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-007' }, body: { orderObj: { orderId: 'OrderID-001', orderDate: '29-06-2024' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.updateOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-003' }, body: { orderObj: { orderId: 'OrderID-005', orderDate: '02-07-2024' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.updateOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'productItemList')"}})
        })
    })
    describe('## finishOrder method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  }, body: { orderObj: { orderId: 'OrderID-007', orderDate: '04-07-2024', qrCode: null } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.finishOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  }, body: { orderObj: { orderId: 'OrderID-009', orderDate: '06-07-2024' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await OrderController.finishOrder(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
})
