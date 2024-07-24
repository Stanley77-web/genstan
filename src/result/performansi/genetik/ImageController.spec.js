import ImageController from '../controllers/ImageController';

jest.mock('../services/imageService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      upload: jest.fn(async (imageString, imagePathNameToFirebase) => {
        if (imageString === 'ImageString-001' && imagePathNameToFirebase === 'ImageNamePath-001') return 'Image-001'
        if (imageString === 'ImageString-002' && imagePathNameToFirebase === 'ImageNamePath-002') return 'Image-002'
        if (imageString === 'ImageString-003' && imagePathNameToFirebase === 'ImageNamePath-003') return 'Image-003'
        if (imageString === 'ImageString-004' && imagePathNameToFirebase === 'ImageNamePath-004') return 'Image-004'
        if (imageString === 'ImageString-005' && imagePathNameToFirebase === 'ImageNamePath-005') return 'Image-005'
        if (imageString === 'ImageString-006' && imagePathNameToFirebase === 'ImageNamePath-006') return 'Image-006'
        if (imageString === 'ImageString-007' && imagePathNameToFirebase === 'ImageNamePath-007') return 'Image-007'
        if (imageString === 'ImageString-008' && imagePathNameToFirebase === 'ImageNamePath-008') return 'Image-008'
        if (imageString === 'ImageString-009' && imagePathNameToFirebase === 'ImageNamePath-009') return 'Image-009'
        if (imageString === 'ImageString-010' && imagePathNameToFirebase === 'ImageNamePath-010') return 'Image-010'
        return null
      }), 
      generateAndPublishQRCode: jest.fn((qrCodeEncodeData, storageImageNamePath) => {
        if (qrCodeEncodeData === 'QRCodeEncodeData-001' && storageImageNamePath === 'StorageImageNamePath-001') return 'ImageUrl-001'
        if (qrCodeEncodeData === 'QRCodeEncodeData-002' && storageImageNamePath === 'StorageImageNamePath-002') return 'ImageUrl-002'
        if (qrCodeEncodeData === 'QRCodeEncodeData-003' && storageImageNamePath === 'StorageImageNamePath-003') return 'ImageUrl-003'
        if (qrCodeEncodeData === 'QRCodeEncodeData-004' && storageImageNamePath === 'StorageImageNamePath-004') return 'ImageUrl-004'
        if (qrCodeEncodeData === 'QRCodeEncodeData-005' && storageImageNamePath === 'StorageImageNamePath-005') return 'ImageUrl-005'
        if (qrCodeEncodeData === 'QRCodeEncodeData-006' && storageImageNamePath === 'StorageImageNamePath-006') return 'ImageUrl-006'
        if (qrCodeEncodeData === 'QRCodeEncodeData-007' && storageImageNamePath === 'StorageImageNamePath-007') return 'ImageUrl-007'
        if (qrCodeEncodeData === 'QRCodeEncodeData-008' && storageImageNamePath === 'StorageImageNamePath-008') return 'ImageUrl-008'
        if (qrCodeEncodeData === 'QRCodeEncodeData-009' && storageImageNamePath === 'StorageImageNamePath-009') return 'ImageUrl-009'
        if (qrCodeEncodeData === 'QRCodeEncodeData-010' && storageImageNamePath === 'StorageImageNamePath-010') return 'ImageUrl-010'
        return null
      })
    };
  });
});

describe('# ImageController', () => {
    describe('## upload method', () => {
        it('Scenario 1', async () => {
            const request = { body: { imageString: 'ImageString-001', imagePathNameToFirebase: 'ImageNamePath-002' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ImageController.upload(request, response)
            expect(ret).toEqual({"json":{"message":"successfully","data":null,"error":null}})
        })
        it('Scenario 2', async () => {
            const request = { body: { imageString: 'ImageString-010', imagePathNameToFirebase: 'ImageNamePath-002' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ImageController.upload(request, response)
            expect(ret).toEqual({"json":{"message":"successfully","data":null,"error":null}})
        })
    })
    describe('## generateAndPublishQRCode method', () => {
        it('Scenario 1', async () => {
            const request = { body: { qrCodeEncodeData: 'QRCodeEncodeData-004', storageImageNamePath: 'StorageImageNamePath-010' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ImageController.generateAndPublishQRCode(request, response)
            expect(ret).toEqual({"json":{"message":"failed","data":null,"error":null}})
        })
        it('Scenario 2', async () => {
            const request = { body: { qrCodeEncodeData: 'QRCodeEncodeData-001', storageImageNamePath: 'StorageImageNamePath-001' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ImageController.generateAndPublishQRCode(request, response)
            expect(ret).toEqual({"json":{"message":"successfully","data":"ImageUrl-001","error":null}})
        })
        it('Scenario 3', async () => {
            const request = { body: { qrCodeEncodeData: 'QRCodeEncodeData-004', storageImageNamePath: 'StorageImageNamePath-002' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await ImageController.generateAndPublishQRCode(request, response)
            expect(ret).toEqual({"json":{"message":"failed","data":null,"error":null}})
        })
    })
})
