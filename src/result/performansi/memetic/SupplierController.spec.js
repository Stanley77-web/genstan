import SupplierController from '../controllers/SupplierController';

jest.mock('../services/productService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAllProducts: jest.fn((userId) => {
        if (userId === 'ID-001') return [{ productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001', supplier: { userId: 'ID-001' } }, { productId: 'ProductID-001', productType: 'Laptop', status: 'harvested', quantity: 10, price: 1000, qrCode: 'QrCode-001', expireTime: '29-07-2024', image: 'Image-001', supplier: { userId: 'ID-001' } }]
        if (userId === 'ID-002') return [{ productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002', supplier: { userId: 'ID-002' } }, { productId: 'ProductID-002', productType: 'Smartphone', status: 'cultivated', quantity: 20, price: 2000, qrCode: 'QrCode-002', expireTime: '30-07-2024', image: 'Image-002', supplier: { userId: 'ID-002' } }]
        if (userId === 'ID-003') return [{ productId: 'ProductID-003', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003', supplier: { userId: 'ID-003' } }, { productId: 'ProductID-003', productType: 'Tablet', status: 'imported', quantity: 30, price: 3000, qrCode: 'QrCode-003', expireTime: '01-08-2024', image: 'Image-003', supplier: { userId: 'ID-003' } }]
        if (userId === 'ID-004') return [{ productId: 'ProductID-004', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004', supplier: { userId: 'ID-004' } }, { productId: 'ProductID-004', productType: 'Smartwatch', status: 'imported', quantity: 40, price: 4000, qrCode: 'QrCode-004', expireTime: '02-08-2024', image: 'Image-004', supplier: { userId: 'ID-004' } }]
        if (userId === 'ID-005') return [{ productId: 'ProductID-005', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005', supplier: { userId: 'ID-005' } }, { productId: 'ProductID-005', productType: 'Headphone', status: 'cultivated', quantity: 50, price: 5000, qrCode: 'QrCode-005', expireTime: '03-08-2024', image: 'Image-005', supplier: { userId: 'ID-005' } }]
        if (userId === 'ID-006') return [{ productId: 'ProductID-006', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006', supplier: { userId: 'ID-006' } }, { productId: 'ProductID-006', productType: 'Earphone', status: 'harvested', quantity: 60, price: 6000, qrCode: 'QrCode-006', expireTime: '04-08-2024', image: 'Image-006', supplier: { userId: 'ID-007' } }]
        if (userId === 'ID-007') return [{ productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007', supplier: { userId: 'ID-008' } }, { productId: 'ProductID-007', productType: 'Speaker', status: 'cultivated', quantity: 70, price: 7000, qrCode: 'QrCode-007', expireTime: '05-08-2024', image: 'Image-007', supplier: { userId: 'ID-009' } }]
        if (userId === 'ID-008') return [{ productId: 'ProductID-008', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008', supplier: { userId: 'ID-010' } }, { productId: 'ProductID-008', productType: 'Monitor', status: 'imported', quantity: 80, price: 8000, qrCode: 'QrCode-008', expireTime: '06-08-2024', image: 'Image-008', supplier: { userId: 'ID-011' } }]
        if (userId === 'ID-009') return [{ productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009', supplier: { userId: 'ID-012' } }, { productId: 'ProductID-009', productType: 'Keyboard', status: 'imported', quantity: 90, price: 9000, qrCode: 'QrCode-009', expireTime: '07-08-2024', image: 'Image-009', supplier: { userId: 'ID-013' } }]
        if (userId === 'ID-010') return [{ productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010', supplier: { userId: 'ID-014' } }, { productId: 'ProductID-010', productType: 'Mouse', status: 'harvested', quantity: 100, price: 10000, qrCode: 'QrCode-010', expireTime: '08-08-2024', image: 'Image-010', supplier: { userId: 'ID-015' } }]
        return null
      })
    };
  });
});

describe('# SupplierController', () => {
    describe('## getProductsBySupplierId method', () => {
        it('Scenario 1', async () => {
            const request = { user: { userId: 'ID-004' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await SupplierController.getProductsBySupplierId(request, response)
            expect(ret).toEqual({"json":{"data":[],"message":"successfully","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { user: { userId: 'ID-005' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await SupplierController.getProductsBySupplierId(request, response)
            expect(ret).toEqual({"json":{"data":[{"productId":"ProductID-005","productType":"Headphone","status":"cultivated","quantity":50,"price":5000,"qrCode":"QrCode-005","expireTime":"03-08-2024","image":"Image-005","supplier":{"userId":"ID-005"}},{"productId":"ProductID-005","productType":"Headphone","status":"cultivated","quantity":50,"price":5000,"qrCode":"QrCode-005","expireTime":"03-08-2024","image":"Image-005","supplier":{"userId":"ID-005"}}],"message":"successfully","error":null}})
        })
    })
})
