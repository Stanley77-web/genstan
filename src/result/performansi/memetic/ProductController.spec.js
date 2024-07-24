import ProductController from '../controllers/ProductController';

jest.mock('../services/productService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getTransactionHistory: jest.fn(async (userId, productId) => {
        if (userId === 'ID-001' && productId === 'ProductID-001') return [{ productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }, { productId: 'ProductID-011', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }]
        if (userId === 'ID-002' && productId === 'ProductID-002') return [{ productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }, { productId: 'ProductID-012', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }]
        if (userId === 'ID-003' && productId === 'ProductID-003') return [{ productId: 'ProductID-003', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }, { productId: 'ProductID-013', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }]
        if (userId === 'ID-004' && productId === 'ProductID-004') return [{ productId: 'ProductID-004', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }, { productId: 'ProductID-014', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }]
        if (userId === 'ID-005' && productId === 'ProductID-005') return [{ productId: 'ProductID-005', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }, { productId: 'ProductID-015', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }]
        if (userId === 'ID-006' && productId === 'ProductID-006') return [{ productId: 'ProductID-006', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }, { productId: 'ProductID-016', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }]
        if (userId === 'ID-007' && productId === 'ProductID-007') return [{ productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }, { productId: 'ProductID-017', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }]
        if (userId === 'ID-008' && productId === 'ProductID-008') return [{ productId: 'ProductID-008', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }, { productId: 'ProductID-018', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }]
        if (userId === 'ID-009' && productId === 'ProductID-009') return [{ productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }, { productId: 'ProductID-019', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }]
        if (userId === 'ID-010' && productId === 'ProductID-010') return [{ productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }, { productId: 'ProductID-020', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }]
        return null
      }), 
      getAllProducts: jest.fn((userId) => {
        if (userId === 'ID-001') return [{ productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }, { productId: 'ProductID-011', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }]
        if (userId === 'ID-002') return [{ productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }, { productId: 'ProductID-012', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }]
        if (userId === 'ID-003') return [{ productId: 'ProductID-003', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }, { productId: 'ProductID-013', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }]
        if (userId === 'ID-004') return [{ productId: 'ProductID-004', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }, { productId: 'ProductID-014', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }]
        if (userId === 'ID-005') return [{ productId: 'ProductID-005', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }, { productId: 'ProductID-015', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }]
        if (userId === 'ID-006') return [{ productId: 'ProductID-006', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }, { productId: 'ProductID-016', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }]
        if (userId === 'ID-007') return [{ productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }, { productId: 'ProductID-017', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }]
        if (userId === 'ID-008') return [{ productId: 'ProductID-008', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }, { productId: 'ProductID-018', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }]
        if (userId === 'ID-009') return [{ productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }, { productId: 'ProductID-019', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }]
        if (userId === 'ID-010') return [{ productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }, { productId: 'ProductID-020', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }]
        return null
      }), 
      getProductByIdNoAuth: jest.fn((productId) => {
        if (productId === 'ProductID-001') return { productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }
        if (productId === 'ProductID-002') return { productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }
        if (productId === 'ProductID-003') return { productId: 'ProductID-003', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }
        if (productId === 'ProductID-004') return { productId: 'ProductID-004', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }
        if (productId === 'ProductID-005') return { productId: 'ProductID-005', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }
        if (productId === 'ProductID-006') return { productId: 'ProductID-006', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }
        if (productId === 'ProductID-007') return { productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }
        if (productId === 'ProductID-008') return { productId: 'ProductID-008', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }
        if (productId === 'ProductID-009') return { productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }
        if (productId === 'ProductID-010') return { productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }
        return null
      }), 
      getProductById: jest.fn((user, productId) => {
        if (user.userId === 'ID-001' && user.role === 'admin' && user.address === 'West Street, No 1' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active' && productId === 'ProductID-001') return { productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }
        if (user.userId === 'ID-002' && user.role === 'user' && user.address === 'West Street, No 2' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive' && productId === 'ProductID-002') return { productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }
        if (user.userId === 'ID-003' && user.role === 'user' && user.address === 'West Street, No 3' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive' && productId === 'ProductID-003') return { productId: 'ProductID-003', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }
        if (user.userId === 'ID-004' && user.role === 'user' && user.address === 'West Street, No 4' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active' && productId === 'ProductID-004') return { productId: 'ProductID-004', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }
        if (user.userId === 'ID-005' && user.role === 'user' && user.address === 'West Street, No 5' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive' && productId === 'ProductID-005') return { productId: 'ProductID-005', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }
        if (user.userId === 'ID-006' && user.role === 'user' && user.address === 'East Street, No 1' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive' && productId === 'ProductID-006') return { productId: 'ProductID-006', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }
        if (user.userId === 'ID-007' && user.role === 'admin' && user.address === 'East Street, No 2' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active' && productId === 'ProductID-007') return { productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }
        if (user.userId === 'ID-008' && user.role === 'admin' && user.address === 'East Street, No 3' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active' && productId === 'ProductID-008') return { productId: 'ProductID-008', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }
        if (user.userId === 'ID-009' && user.role === 'admin' && user.address === 'East Street, No 4' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive' && productId === 'ProductID-009') return { productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }
        if (user.userId === 'ID-010' && user.role === 'admin' && user.address === 'East Street, No 5' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active' && productId === 'ProductID-010') return { productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }
        return null
      }), 
      createProductDB: jest.fn((product) => {
        if (product.productId === 'ProductID-001' && product.productType === 'Laptop' && product.status === 'harvested' && product.quantity === 10 && product.price === 1000 && product.qrCode === 'QrCode-001' && product.expireTime === '29-07-2024' && product.image === 'Image-001') return null
        if (product.productId === 'ProductID-002' && product.productType === 'Smartphone' && product.status === 'cultivated' && product.quantity === 20 && product.price === 2000 && product.qrCode === 'QrCode-002' && product.expireTime === '30-07-2024' && product.image === 'Image-002') return null
        if (product.productId === 'ProductID-003' && product.productType === 'Tablet' && product.status === 'imported' && product.quantity === 30 && product.price === 3000 && product.qrCode === 'QrCode-003' && product.expireTime === '01-08-2024' && product.image === 'Image-003') return null
        if (product.productId === 'ProductID-004' && product.productType === 'Smartwatch' && product.status === 'imported' && product.quantity === 40 && product.price === 4000 && product.qrCode === 'QrCode-004' && product.expireTime === '02-08-2024' && product.image === 'Image-004') return null
        if (product.productId === 'ProductID-005' && product.productType === 'Headphone' && product.status === 'cultivated' && product.quantity === 50 && product.price === 5000 && product.qrCode === 'QrCode-005' && product.expireTime === '03-08-2024' && product.image === 'Image-005') return null
        if (product.productId === 'ProductID-006' && product.productType === 'Earphone' && product.status === 'harvested' && product.quantity === 60 && product.price === 6000 && product.qrCode === 'QrCode-006' && product.expireTime === '04-08-2024' && product.image === 'Image-006') return null
        if (product.productId === 'ProductID-007' && product.productType === 'Speaker' && product.status === 'cultivated' && product.quantity === 70 && product.price === 7000 && product.qrCode === 'QrCode-007' && product.expireTime === '05-08-2024' && product.image === 'Image-007') return null
        if (product.productId === 'ProductID-008' && product.productType === 'Monitor' && product.status === 'imported' && product.quantity === 80 && product.price === 8000 && product.qrCode === 'QrCode-008' && product.expireTime === '06-08-2024' && product.image === 'Image-008') return null
        if (product.productId === 'ProductID-009' && product.productType === 'Keyboard' && product.status === 'imported' && product.quantity === 90 && product.price === 9000 && product.qrCode === 'QrCode-009' && product.expireTime === '07-08-2024' && product.image === 'Image-009') return null
        if (product.productId === 'ProductID-010' && product.productType === 'Mouse' && product.status === 'harvested' && product.quantity === 100 && product.price === 10000 && product.qrCode === 'QrCode-010' && product.expireTime === '08-08-2024' && product.image === 'Image-010') return null
        return null
      }), 
      updateProductDB: jest.fn((productId, product) => {
        if (productId === 'ProductID-001' && product.productId === 'ProductID-001' && product.productType === 'Laptop' && product.status === 'harvested' && product.quantity === 10 && product.price === 1000 && product.qrCode === 'QrCode-001' && product.expireTime === '29-07-2024' && product.image === 'Image-001') return null
        if (productId === 'ProductID-002' && product.productId === 'ProductID-002' && product.productType === 'Smartphone' && product.status === 'cultivated' && product.quantity === 20 && product.price === 2000 && product.qrCode === 'QrCode-002' && product.expireTime === '30-07-2024' && product.image === 'Image-002') return null
        if (productId === 'ProductID-003' && product.productId === 'ProductID-003' && product.productType === 'Tablet' && product.status === 'imported' && product.quantity === 30 && product.price === 3000 && product.qrCode === 'QrCode-003' && product.expireTime === '01-08-2024' && product.image === 'Image-003') return null
        if (productId === 'ProductID-004' && product.productId === 'ProductID-004' && product.productType === 'Smartwatch' && product.status === 'imported' && product.quantity === 40 && product.price === 4000 && product.qrCode === 'QrCode-004' && product.expireTime === '02-08-2024' && product.image === 'Image-004') return null
        if (productId === 'ProductID-005' && product.productId === 'ProductID-005' && product.productType === 'Headphone' && product.status === 'cultivated' && product.quantity === 50 && product.price === 5000 && product.qrCode === 'QrCode-005' && product.expireTime === '03-08-2024' && product.image === 'Image-005') return null
        if (productId === 'ProductID-006' && product.productId === 'ProductID-006' && product.productType === 'Earphone' && product.status === 'harvested' && product.quantity === 60 && product.price === 6000 && product.qrCode === 'QrCode-006' && product.expireTime === '04-08-2024' && product.image === 'Image-006') return null
        if (productId === 'ProductID-007' && product.productId === 'ProductID-007' && product.productType === 'Speaker' && product.status === 'cultivated' && product.quantity === 70 && product.price === 7000 && product.qrCode === 'QrCode-007' && product.expireTime === '05-08-2024' && product.image === 'Image-007') return null
        if (productId === 'ProductID-008' && product.productId === 'ProductID-008' && product.productType === 'Monitor' && product.status === 'imported' && product.quantity === 80 && product.price === 8000 && product.qrCode === 'QrCode-008' && product.expireTime === '06-08-2024' && product.image === 'Image-008') return null
        if (productId === 'ProductID-009' && product.productId === 'ProductID-009' && product.productType === 'Keyboard' && product.status === 'imported' && product.quantity === 90 && product.price === 9000 && product.qrCode === 'QrCode-009' && product.expireTime === '07-08-2024' && product.image === 'Image-009') return null
        if (productId === 'ProductID-010' && product.productId === 'ProductID-010' && product.productType === 'Mouse' && product.status === 'harvested' && product.quantity === 100 && product.price === 10000 && product.qrCode === 'QrCode-010' && product.expireTime === '08-08-2024' && product.image === 'Image-010') return null
        return null
      }), 
      handleProductForUpdate: jest.fn((user, product) => {
        if (user.userId === 'ID-001' && user.role === 'admin' && user.address === 'West Street, No 1' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active' && product.productId === 'ProductID-001' && product.productType === 'Laptop' && product.status === 'harvested' && product.quantity === 10 && product.price === 1000 && product.qrCode === 'QrCode-001' && product.expireTime === '29-07-2024' && product.image === 'Image-001') return { productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }
        if (user.userId === 'ID-002' && user.role === 'user' && user.address === 'West Street, No 2' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive' && product.productId === 'ProductID-002' && product.productType === 'Smartphone' && product.status === 'cultivated' && product.quantity === 20 && product.price === 2000 && product.qrCode === 'QrCode-002' && product.expireTime === '30-07-2024' && product.image === 'Image-002') return { productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }
        if (user.userId === 'ID-003' && user.role === 'user' && user.address === 'West Street, No 3' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive' && product.productId === 'ProductID-003' && product.productType === 'Tablet' && product.status === 'imported' && product.quantity === 30 && product.price === 3000 && product.qrCode === 'QrCode-003' && product.expireTime === '01-08-2024' && product.image === 'Image-003') return { productId: 'ProductID-003', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }
        if (user.userId === 'ID-004' && user.role === 'user' && user.address === 'West Street, No 4' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active' && product.productId === 'ProductID-004' && product.productType === 'Smartwatch' && product.status === 'imported' && product.quantity === 40 && product.price === 4000 && product.qrCode === 'QrCode-004' && product.expireTime === '02-08-2024' && product.image === 'Image-004') return { productId: 'ProductID-004', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }
        if (user.userId === 'ID-005' && user.role === 'user' && user.address === 'West Street, No 5' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive' && product.productId === 'ProductID-005' && product.productType === 'Headphone' && product.status === 'cultivated' && product.quantity === 50 && product.price === 5000 && product.qrCode === 'QrCode-005' && product.expireTime === '03-08-2024' && product.image === 'Image-005') return { productId: 'ProductID-005', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }
        if (user.userId === 'ID-006' && user.role === 'user' && user.address === 'East Street, No 1' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive' && product.productId === 'ProductID-006' && product.productType === 'Earphone' && product.status === 'harvested' && product.quantity === 60 && product.price === 6000 && product.qrCode === 'QrCode-006' && product.expireTime === '04-08-2024' && product.image === 'Image-006') return { productId: 'ProductID-006', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }
        if (user.userId === 'ID-007' && user.role === 'admin' && user.address === 'East Street, No 2' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active' && product.productId === 'ProductID-007' && product.productType === 'Speaker' && product.status === 'cultivated' && product.quantity === 70 && product.price === 7000 && product.qrCode === 'QrCode-007' && product.expireTime === '05-08-2024' && product.image === 'Image-007') return { productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }
        if (user.userId === 'ID-008' && user.role === 'admin' && user.address === 'East Street, No 3' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active' && product.productId === 'ProductID-008' && product.productType === 'Monitor' && product.status === 'imported' && product.quantity === 80 && product.price === 8000 && product.qrCode === 'QrCode-008' && product.expireTime === '06-08-2024' && product.image === 'Image-008') return { productId: 'ProductID-008', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }
        if (user.userId === 'ID-009' && user.role === 'admin' && user.address === 'East Street, No 4' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive' && product.productId === 'ProductID-009' && product.productType === 'Keyboard' && product.status === 'imported' && product.quantity === 90 && product.price === 9000 && product.qrCode === 'QrCode-009' && product.expireTime === '07-08-2024' && product.image === 'Image-009') return { productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }
        if (user.userId === 'ID-010' && user.role === 'admin' && user.address === 'East Street, No 5' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active' && product.productId === 'ProductID-010' && product.productType === 'Mouse' && product.status === 'harvested' && product.quantity === 100 && product.price === 10000 && product.qrCode === 'QrCode-010' && product.expireTime === '08-08-2024' && product.image === 'Image-010') return { productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }
        return null
      })
    };
  });
});

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

jest.mock('../appService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      evaluateTransaction: jest.fn(async (transactionType, user, product) => {
        if (transactionType === 'GetProductTransactionHistory' && user.userId === 'ID-001' && user.role === 'admin' && user.address === 'West Street, No 1' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active' && product.productId === 'ProductID-001' && product.productType === 'Laptop' && product.status === 'harvested' && product.quantity === 10 && product.price === 1000 && product.qrCode === 'QrCode-001' && product.expireTime === '29-07-2024' && product.image === 'Image-001') return [{ productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }, { productId: 'ProductID-011', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }]
        if (transactionType === 'GetProductTransactionHistory' && user.userId === 'ID-002' && user.role === 'user' && user.address === 'West Street, No 2' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive' && product.productId === 'ProductID-002' && product.productType === 'Smartphone' && product.status === 'cultivated' && product.quantity === 20 && product.price === 2000 && product.qrCode === 'QrCode-002' && product.expireTime === '30-07-2024' && product.image === 'Image-002') return [{ productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }, { productId: 'ProductID-012', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }]
        if (transactionType === 'GetProductTransactionHistory' && user.userId === 'ID-003' && user.role === 'user' && user.address === 'West Street, No 3' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive' && product.productId === 'ProductID-003' && product.productType === 'Tablet' && product.status === 'imported' && product.quantity === 30 && product.price === 3000 && product.qrCode === 'QrCode-003' && product.expireTime === '01-08-2024' && product.image === 'Image-003') return [{ productId: 'ProductID-003', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }, { productId: 'ProductID-013', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }]
        if (transactionType === 'GetProductTransactionHistory' && user.userId === 'ID-004' && user.role === 'user' && user.address === 'West Street, No 4' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active' && product.productId === 'ProductID-004' && product.productType === 'Smartwatch' && product.status === 'imported' && product.quantity === 40 && product.price === 4000 && product.qrCode === 'QrCode-004' && product.expireTime === '02-08-2024' && product.image === 'Image-004') return [{ productId: 'ProductID-004', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }, { productId: 'ProductID-014', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }]
        if (transactionType === 'GetProductTransactionHistory' && user.userId === 'ID-005' && user.role === 'user' && user.address === 'West Street, No 5' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive' && product.productId === 'ProductID-005' && product.productType === 'Headphone' && product.status === 'cultivated' && product.quantity === 50 && product.price === 5000 && product.qrCode === 'QrCode-005' && product.expireTime === '03-08-2024' && product.image === 'Image-005') return [{ productId: 'ProductID-005', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }, { productId: 'ProductID-015', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }]
        if (transactionType === 'GetProductTransactionHistory' && user.userId === 'ID-006' && user.role === 'user' && user.address === 'East Street, No 1' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive' && product.productId === 'ProductID-006' && product.productType === 'Earphone' && product.status === 'harvested' && product.quantity === 60 && product.price === 6000 && product.qrCode === 'QrCode-006' && product.expireTime === '04-08-2024' && product.image === 'Image-006') return [{ productId: 'ProductID-006', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }, { productId: 'ProductID-016', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }]
        if (transactionType === 'GetProductTransactionHistory' && user.userId === 'ID-007' && user.role === 'admin' && user.address === 'East Street, No 2' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active' && product.productId === 'ProductID-007' && product.productType === 'Speaker' && product.status === 'cultivated' && product.quantity === 70 && product.price === 7000 && product.qrCode === 'QrCode-007' && product.expireTime === '05-08-2024' && product.image === 'Image-007') return [{ productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }, { productId: 'ProductID-017', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }]
        if (transactionType === 'GetProductTransactionHistory' && user.userId === 'ID-008' && user.role === 'admin' && user.address === 'East Street, No 3' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active' && product.productId === 'ProductID-008' && product.productType === 'Monitor' && product.status === 'imported' && product.quantity === 80 && product.price === 8000 && product.qrCode === 'QrCode-008' && product.expireTime === '06-08-2024' && product.image === 'Image-008') return [{ productId: 'ProductID-008', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }, { productId: 'ProductID-018', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }]
        if (transactionType === 'GetProductTransactionHistory' && user.userId === 'ID-009' && user.role === 'admin' && user.address === 'East Street, No 4' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive' && product.productId === 'ProductID-009' && product.productType === 'Keyboard' && product.status === 'imported' && product.quantity === 90 && product.price === 9000 && product.qrCode === 'QrCode-009' && product.expireTime === '07-08-2024' && product.image === 'Image-009') return [{ productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }, { productId: 'ProductID-019', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }]
        if (transactionType === 'GetProductTransactionHistory' && user.userId === 'ID-010' && user.role === 'admin' && user.address === 'East Street, No 5' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active' && product.productId === 'ProductID-010' && product.productType === 'Mouse' && product.status === 'harvested' && product.quantity === 100 && product.price === 10000 && product.qrCode === 'QrCode-010' && product.expireTime === '08-08-2024' && product.image === 'Image-010') return [{ productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }, { productId: 'ProductID-020', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }]
        return null
      }), 
      submitTransactionCultivateProduct: jest.fn((transactionType, user, product) => {
        if (transactionType === 'CultivateProduct' && user.userId === 'ID-001' && user.role === 'admin' && user.address === 'West Street, No 1' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active' && product.productId === 'ProductID-001' && product.productType === 'Laptop' && product.status === 'harvested' && product.quantity === 10 && product.price === 1000 && product.qrCode === 'QrCode-001' && product.expireTime === '29-07-2024' && product.image === 'Image-001') return { productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }
        if (transactionType === 'CultivateProduct' && user.userId === 'ID-002' && user.role === 'user' && user.address === 'West Street, No 2' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive' && product.productId === 'ProductID-002' && product.productType === 'Smartphone' && product.status === 'cultivated' && product.quantity === 20 && product.price === 2000 && product.qrCode === 'QrCode-002' && product.expireTime === '30-07-2024' && product.image === 'Image-002') return { productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }
        if (transactionType === 'CultivateProduct' && user.userId === 'ID-003' && user.role === 'user' && user.address === 'West Street, No 3' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive' && product.productId === 'ProductID-003' && product.productType === 'Tablet' && product.status === 'imported' && product.quantity === 30 && product.price === 3000 && product.qrCode === 'QrCode-003' && product.expireTime === '01-08-2024' && product.image === 'Image-003') return { productId: 'ProductID-003', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }
        if (transactionType === 'CultivateProduct' && user.userId === 'ID-004' && user.role === 'user' && user.address === 'West Street, No 4' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active' && product.productId === 'ProductID-004' && product.productType === 'Smartwatch' && product.status === 'imported' && product.quantity === 40 && product.price === 4000 && product.qrCode === 'QrCode-004' && product.expireTime === '02-08-2024' && product.image === 'Image-004') return { productId: 'ProductID-004', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }
        if (transactionType === 'CultivateProduct' && user.userId === 'ID-005' && user.role === 'user' && user.address === 'West Street, No 5' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive' && product.productId === 'ProductID-005' && product.productType === 'Headphone' && product.status === 'cultivated' && product.quantity === 50 && product.price === 5000 && product.qrCode === 'QrCode-005' && product.expireTime === '03-08-2024' && product.image === 'Image-005') return { productId: 'ProductID-005', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }
        if (transactionType === 'CultivateProduct' && user.userId === 'ID-006' && user.role === 'user' && user.address === 'East Street, No 1' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive' && product.productId === 'ProductID-006' && product.productType === 'Earphone' && product.status === 'harvested' && product.quantity === 60 && product.price === 6000 && product.qrCode === 'QrCode-006' && product.expireTime === '04-08-2024' && product.image === 'Image-006') return { productId: 'ProductID-006', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }
        if (transactionType === 'CultivateProduct' && user.userId === 'ID-007' && user.role === 'admin' && user.address === 'East Street, No 2' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active' && product.productId === 'ProductID-007' && product.productType === 'Speaker' && product.status === 'cultivated' && product.quantity === 70 && product.price === 7000 && product.qrCode === 'QrCode-007' && product.expireTime === '05-08-2024' && product.image === 'Image-007') return { productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }
        if (transactionType === 'CultivateProduct' && user.userId === 'ID-008' && user.role === 'admin' && user.address === 'East Street, No 3' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active' && product.productId === 'ProductID-008' && product.productType === 'Monitor' && product.status === 'imported' && product.quantity === 80 && product.price === 8000 && product.qrCode === 'QrCode-008' && product.expireTime === '06-08-2024' && product.image === 'Image-008') return { productId: 'ProductID-008', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }
        if (transactionType === 'CultivateProduct' && user.userId === 'ID-009' && user.role === 'admin' && user.address === 'East Street, No 4' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive' && product.productId === 'ProductID-009' && product.productType === 'Keyboard' && product.status === 'imported' && product.quantity === 90 && product.price === 9000 && product.qrCode === 'QrCode-009' && product.expireTime === '07-08-2024' && product.image === 'Image-009') return { productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }
        if (transactionType === 'CultivateProduct' && user.userId === 'ID-010' && user.role === 'admin' && user.address === 'East Street, No 5' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active' && product.productId === 'ProductID-010' && product.productType === 'Mouse' && product.status === 'harvested' && product.quantity === 100 && product.price === 10000 && product.qrCode === 'QrCode-010' && product.expireTime === '08-08-2024' && product.image === 'Image-010') return { productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }
        return null
      }), 
      submitTransaction: jest.fn((transactionType, user, product) => {
        if (transactionType === 'HarvestProduct' && user.userId === 'ID-001' && user.role === 'admin' && user.address === 'West Street, No 1' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active' && product.productId === 'ProductID-001' && product.productType === 'Laptop' && product.status === 'harvested' && product.quantity === 10 && product.price === 1000 && product.qrCode === 'QrCode-001' && product.expireTime === '29-07-2024' && product.image === 'Image-001') return { productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' }
        if (transactionType === 'HarvestProduct' && user.userId === 'ID-002' && user.role === 'user' && user.address === 'West Street, No 2' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive' && product.productId === 'ProductID-002' && product.productType === 'Smartphone' && product.status === 'cultivated' && product.quantity === 20 && product.price === 2000 && product.qrCode === 'QrCode-002' && product.expireTime === '30-07-2024' && product.image === 'Image-002') return { productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' }
        if (transactionType === 'ImportProduct' && user.userId === 'ID-003' && user.role === 'user' && user.address === 'West Street, No 3' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive' && product.productId === 'ProductID-003' && product.productType === 'Tablet' && product.status === 'imported' && product.quantity === 30 && product.price === 3000 && product.qrCode === 'QrCode-003' && product.expireTime === '01-08-2024' && product.image === 'Image-003') return { productId: 'ProductID-003', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003' }
        if (transactionType === 'ImportProduct' && user.userId === 'ID-004' && user.role === 'user' && user.address === 'West Street, No 4' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active' && product.productId === 'ProductID-004' && product.productType === 'Smartwatch' && product.status === 'imported' && product.quantity === 40 && product.price === 4000 && product.qrCode === 'QrCode-004' && product.expireTime === '02-08-2024' && product.image === 'Image-004') return { productId: 'ProductID-004', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004' }
        if (transactionType === 'HarvestProduct' && user.userId === 'ID-005' && user.role === 'user' && user.address === 'West Street, No 5' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive' && product.productId === 'ProductID-005' && product.productType === 'Headphone' && product.status === 'cultivated' && product.quantity === 50 && product.price === 5000 && product.qrCode === 'QrCode-005' && product.expireTime === '03-08-2024' && product.image === 'Image-005') return { productId: 'ProductID-005', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005' }
        if (transactionType === 'ImportProduct' && user.userId === 'ID-006' && user.role === 'user' && user.address === 'East Street, No 1' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive' && product.productId === 'ProductID-006' && product.productType === 'Earphone' && product.status === 'harvested' && product.quantity === 60 && product.price === 6000 && product.qrCode === 'QrCode-006' && product.expireTime === '04-08-2024' && product.image === 'Image-006') return { productId: 'ProductID-006', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006' }
        if (transactionType === 'ManufactureProduct' && user.userId === 'ID-007' && user.role === 'admin' && user.address === 'East Street, No 2' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active' && product.productId === 'ProductID-007' && product.productType === 'Speaker' && product.status === 'cultivated' && product.quantity === 70 && product.price === 7000 && product.qrCode === 'QrCode-007' && product.expireTime === '05-08-2024' && product.image === 'Image-007') return { productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' }
        if (transactionType === 'UpdateProduct' && user.userId === 'ID-008' && user.role === 'admin' && user.address === 'East Street, No 3' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active' && product.productId === 'ProductID-008' && product.productType === 'Monitor' && product.status === 'imported' && product.quantity === 80 && product.price === 8000 && product.qrCode === 'QrCode-008' && product.expireTime === '06-08-2024' && product.image === 'Image-008') return { productId: 'ProductID-008', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008' }
        if (transactionType === 'ManufactureProduct' && user.userId === 'ID-009' && user.role === 'admin' && user.address === 'East Street, No 4' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive' && product.productId === 'ProductID-009' && product.productType === 'Keyboard' && product.status === 'imported' && product.quantity === 90 && product.price === 9000 && product.qrCode === 'QrCode-009' && product.expireTime === '07-08-2024' && product.image === 'Image-009') return { productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' }
        if (transactionType === 'UpdateProduct' && user.userId === 'ID-010' && user.role === 'admin' && user.address === 'East Street, No 5' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active' && product.productId === 'ProductID-010' && product.productType === 'Mouse' && product.status === 'harvested' && product.quantity === 100 && product.price === 10000 && product.qrCode === 'QrCode-010' && product.expireTime === '08-08-2024' && product.image === 'Image-010') return { productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' }
        return null
      })
    };
  });
});

jest.mock('../services/imageService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      generateAndPublishQRCode: jest.fn(async (productData, qrcodeProductPath) => {
        if (productData === 'product/ProductID-001' && qrcodeProductPath === 'qrcode/products/ProductID-001.jpg') return 'QrCode-001'
        if (productData === 'product/ProductID-002' && qrcodeProductPath === 'qrcode/products/ProductID-002.jpg') return 'QrCode-002'
        if (productData === 'product/ProductID-003' && qrcodeProductPath === 'qrcode/products/ProductID-003.jpg') return 'QrCode-003'
        if (productData === 'product/ProductID-004' && qrcodeProductPath === 'qrcode/products/ProductID-004.jpg') return 'QrCode-004'
        if (productData === 'product/ProductID-005' && qrcodeProductPath === 'qrcode/products/ProductID-005.jpg') return 'QrCode-005'
        if (productData === 'product/ProductID-006' && qrcodeProductPath === 'qrcode/products/ProductID-006.jpg') return 'QrCode-006'
        if (productData === 'product/ProductID-007' && qrcodeProductPath === 'qrcode/products/ProductID-007.jpg') return 'QrCode-007'
        if (productData === 'product/ProductID-008' && qrcodeProductPath === 'qrcode/products/ProductID-008.jpg') return 'QrCode-008'
        if (productData === 'product/ProductID-009' && qrcodeProductPath === 'qrcode/products/ProductID-009.jpg') return 'QrCode-009'
        if (productData === 'product/ProductID-010' && qrcodeProductPath === 'qrcode/products/ProductID-010.jpg') return 'QrCode-010'
        return null
      })
    };
  });
});

describe('# ProductController', () => {
    describe('## getTransactionHistory method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  }, params: { productId: 'ProductID-016' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.getTransactionHistory(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  }, params: { productId: 'ProductID-020' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.getTransactionHistory(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
    })
    describe('## getAllProducts method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-005', role: 'admin', address: 'East Street, No 2', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'imported' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.getAllProducts(request, response)
            expect(ret).toEqual({"json":{"data":[{"productId":"ProductID-005","productType":"Headphone","status":"cultivated","quantity":50,"price":5000,"qrCode":"QrCode-005","expireTime":"03-08-2024","image":"Image-005"},{"productId":"ProductID-015","productType":"Headphone","status":"cultivated","quantity":50,"price":5000,"qrCode":"QrCode-005","expireTime":"03-08-2024","image":"Image-005"}],"message":"successfully","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-015', role: 'user', address: 'East Street, No 3', userName: 'User 08', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'active' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.getAllProducts(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'sort')"}})
        })
    })
    describe('## getProduct method', () => {
        it('Scenario 1', async () => {
            const request = { params: { productId: 'ProductID-009' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.getProduct(request, response)
            expect(ret).toEqual({"json":{"data":{"productId":"ProductID-009","productType":"Keyboard","status":"imported","quantity":90,"price":9000,"qrCode":"QrCode-009","expireTime":"07-08-2024","image":"Image-009"},"message":"successfully","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { params: { productId: 'ProductID-018' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.getProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
    })
    describe('## getTransactionsHistory method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-011', role: 'admin', address: 'East Street, No 1', userName: 'User 06', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'imported' }, query: { productId: 'ProductID-002' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.getTransactionsHistory(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"successfully","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-009', role: 'user', address: 'West Street, No 3', userName: 'User 03', phoneNumber: '087580887998', password: '+hib#+%$(@%+i)%^@s&w&po)', status: 'inactive' }, query: { productId: 'ProductID-006' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.getTransactionsHistory(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'userId')"}})
        })
    })
    describe('## cultivateProduct method', () => {
        it('Scenario 1', async () => {
            const request = { user: {  }, body: { productObj: { productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.cultivateProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'userCode')"}})
        })
        it('Scenario 2', async () => {
            const request = { user: {  }, body: { productObj: { productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.cultivateProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'userCode')"}})
        })
        it('Scenario 3', async () => {
            const request = { user: {  }, body: { productObj: { productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.cultivateProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'userCode')"}})
        })
    })
    describe('## harvestProduct method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-006', role: 'user', address: 'East Street, No 1', userName: 'User 06', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'harvested' }, body: { productId: 'ProductID-011' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.harvestProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-007', role: 'user', address: 'East Street, No 2', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'cultivated' }, body: { productId: 'ProductID-020' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.harvestProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-008', role: 'admin', address: 'East Street, No 3', userName: 'User 08', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'active' }, body: { productId: 'ProductID-005' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.harvestProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 4', async () => {
            const request = { user: { userId: 'ID-015', role: 'admin', address: 'East Street, No 5', userName: 'User 10', phoneNumber: '082186254770', password: '+j)*jakuv(ellf', status: 'active' }, body: { productId: 'ProductID-007' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.harvestProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 5', async () => {
            const request = { user: { userId: 'ID-004', role: 'user', address: 'West Street, No 4', userName: 'User 04', phoneNumber: '084541894816', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' }, body: { productId: 'ProductID-019' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.harvestProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
    })
    describe('## importProduct method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-002', role: 'user', address: 'West Street, No 3', userName: 'User 02', phoneNumber: '085200178467', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' }, body: { productId: 'ProductID-015', price: 6000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.importProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-011', role: 'user', address: 'East Street, No 4', userName: 'User 06', phoneNumber: '087580887998', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'harvested' }, body: { productId: 'ProductID-013', price: 8000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.importProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-006', role: 'user', address: 'East Street, No 2', userName: 'User 08', phoneNumber: '084541894816', password: 'lab*nz!*$jfue_p%u', status: 'inactive' }, body: { productId: 'ProductID-014', price: 7000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.importProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 4', async () => {
            const request = { user: { userId: 'ID-012', role: 'admin', address: 'East Street, No 1', userName: 'User 09', phoneNumber: '086657778155', password: 'fuopizod)bbjc+^t', status: 'cultivated' }, body: { productId: 'ProductID-003', price: 10000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.importProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 5', async () => {
            const request = { user: { userId: 'ID-015', role: 'admin', address: 'East Street, No 3', userName: 'User 01', phoneNumber: '082186254770', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'inactive' }, body: { productId: 'ProductID-016', price: 3000 } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.importProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
    })
    describe('## manufactureProduct method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-014', role: 'admin', address: 'West Street, No 3', userName: 'User 10', phoneNumber: '083008460868', password: 'c$z%zx@iol(mq@', status: 'active' }, body: { productId: 'ProductID-011', imageUrl: 'Image-007', expireTime: '02-08-2024' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.manufactureProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-008', role: 'user', address: 'East Street, No 3', userName: 'User 06', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'cultivated' }, body: { productId: 'ProductID-020', imageUrl: 'Image-010', expireTime: '04-08-2024' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.manufactureProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-004', role: 'admin', address: 'West Street, No 4', userName: 'User 02', phoneNumber: '084541894816', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' }, body: { productId: 'ProductID-010', imageUrl: 'Image-008', expireTime: '08-08-2024' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.manufactureProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
        it('Scenario 4', async () => {
            const request = { user: { userId: 'ID-009', role: 'user', address: 'East Street, No 4', userName: 'User 08', phoneNumber: '086657778155', password: 'lab*nz!*$jfue_p%u', status: 'harvested' }, body: { productId: 'ProductID-015', imageUrl: 'Image-001', expireTime: '30-07-2024' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.manufactureProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 5', async () => {
            const request = { user: { userId: 'ID-005', role: 'user', address: 'West Street, No 5', userName: 'User 01', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'imported' }, body: { productId: 'ProductID-018', imageUrl: 'Image-005', expireTime: '29-07-2024' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.manufactureProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Product not found!","error":"product-notfound"}})
        })
    })
    describe('## updateProduct method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-009', role: 'admin', address: 'East Street, No 4', userName: 'User 09', phoneNumber: '083008460868', password: 'fuopizod)bbjc+^t', status: 'cultivated' }, body: { productObj: { productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.updateProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-006', role: 'admin', address: 'East Street, No 1', userName: 'User 06', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'inactive' }, body: { productObj: { productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.updateProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { user: { userId: 'ID-007', role: 'admin', address: 'East Street, No 2', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'active' }, body: { productObj: { productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ProductController.updateProduct(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
})
