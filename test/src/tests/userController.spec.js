import userControllerClass from '../controllers/userController';

const userController = new userControllerClass();

jest.mock('../services/userServices', () => {
  return jest.fn().mockImplementation(() => {
    return {
      create: jest.fn(async (userObj) => {
        if (userObj.id === 'uid-1' && userObj.email === 'test-1@gmail.com' && userObj.password === 'password-1' && userObj.name === 'user-1') return { id: 'uid-1', email: 'test-1@gmail.com', password: 'password-1', name: 'user-1' }
        if (userObj.id === 'uid-2' && userObj.email === 'test-2@gmail.com' && userObj.password === 'password-2' && userObj.name === 'user-2') return { id: 'uid-2', email: 'test-2@gmail.com', password: 'password-2', name: 'user-2' }
        if (userObj.id === 'uid-3' && userObj.email === 'test-3@gmail.com' && userObj.password === 'password-3' && userObj.name === 'user-3') return { id: 'uid-3', email: 'test-3@gmail.com', password: 'password-3', name: 'user-3' }
        if (userObj.id === 'uid-4' && userObj.email === 'test-4@gmail.com' && userObj.password === 'password-4' && userObj.name === 'user-4') return { id: 'uid-4', email: 'test-4@gmail.com', password: 'password-4', name: 'user-4' }
        if (userObj.id === 'uid-5' && userObj.email === 'test-5@gmail.com' && userObj.password === 'password-5' && userObj.name === 'user-5') return { id: 'uid-5', email: 'test-5@gmail.com', password: 'password-5', name: 'user-5' }
        if (userObj.id === 'uid-6' && userObj.email === 'test-6@gmail.com' && userObj.password === 'password-6' && userObj.name === 'user-6') return { id: 'uid-6', email: 'test-6@gmail.com', password: 'password-6', name: 'user-6' }
        if (userObj.id === 'uid-7' && userObj.email === 'test-7@gmail.com' && userObj.password === 'password-7' && userObj.name === 'user-7') return { id: 'uid-7', email: 'test-7@gmail.com', password: 'password-7', name: 'user-7' }
        if (userObj.id === 'uid-8' && userObj.email === 'test-8@gmail.com' && userObj.password === 'password-8' && userObj.name === 'user-8') return { id: 'uid-8', email: 'test-8@gmail.com', password: 'password-8', name: 'user-8' }
        if (userObj.id === 'uid-9' && userObj.email === 'test-9@gmail.com' && userObj.password === 'password-9' && userObj.name === 'user-9') return { id: 'uid-9', email: 'test-9@gmail.com', password: 'password-9', name: 'user-9' }
        if (userObj.id === 'uid-10' && userObj.email === 'test-10@gmail.com' && userObj.password === 'password-10' && userObj.name === 'user-10') return { id: 'uid-10', email: 'test-10@gmail.com', password: 'password-10', name: 'user-10' }
        return null
      }), 
      list: jest.fn(async () => {
        if (true) return [{ id: 'uid-1', email: 'test-1@gmail.com', password: 'password-1', name: 'user-1' }, { id: 'uid-2', email: 'test-2@gmail.com', password: 'password-2', name: 'user-2' }]
        return null
      }), 
      findById: jest.fn(async (id) => {
        if (id === 'uid-1') return { id: 'uid-1', email: 'test-1@gmail.com', password: 'password-1', name: 'user-1' }
        if (id === 'uid-2') return { id: 'uid-2', email: 'test-2@gmail.com', password: 'password-2', name: 'user-2' }
        if (id === 'uid-3') return { id: 'uid-3', email: 'test-3@gmail.com', password: 'password-3', name: 'user-3' }
        if (id === 'uid-4') return { id: 'uid-4', email: 'test-4@gmail.com', password: 'password-4', name: 'user-4' }
        if (id === 'uid-5') return { id: 'uid-5', email: 'test-5@gmail.com', password: 'password-5', name: 'user-5' }
        if (id === 'uid-11') return { id: 'uid-11', email: 'test-6@gmail.com', password: 'password-6', name: 'user-6' }
        if (id === 'uid-12') return { id: 'uid-12', email: 'test-7@gmail.com', password: 'password-7', name: 'user-7' }
        if (id === 'uid-13') return { id: 'uid-13', email: 'test-8@gmail.com', password: 'password-8', name: 'user-8' }
        if (id === 'uid-14') return { id: 'uid-14', email: 'test-9@gmail.com', password: 'password-9', name: 'user-9' }
        if (id === 'uid-15') return { id: 'uid-15', email: 'test-10@gmail.com', password: 'password-10', name: 'user-10' }
        return null
      }), 
      findUserAccount: jest.fn(async (email, password) => {
        if (email === 'test-1@gmail.com' && password === 'password-1') return { id: 'uid-1', email: 'test-1@gmail.com', password: 'password-1', name: 'user-1' }
        if (email === 'test-2@gmail.com' && password === 'password-2') return { id: 'uid-2', email: 'test-2@gmail.com', password: 'password-2', name: 'user-2' }
        if (email === 'test-3@gmail.com' && password === 'password-3') return { id: 'uid-3', email: 'test-3@gmail.com', password: 'password-3', name: 'user-3' }
        if (email === 'test-4@gmail.com' && password === 'password-4') return { id: 'uid-4', email: 'test-4@gmail.com', password: 'password-4', name: 'user-4' }
        if (email === 'test-5@gmail.com' && password === 'password-5') return { id: 'uid-5', email: 'test-5@gmail.com', password: 'password-5', name: 'user-5' }
        if (email === 'test-6@gmail.com' && password === 'password-6') return { id: 'uid-6', email: 'test-6@gmail.com', password: 'password-6', name: 'user-6' }
        if (email === 'test-7@gmail.com' && password === 'password-7') return { id: 'uid-7', email: 'test-7@gmail.com', password: 'password-7', name: 'user-7' }
        if (email === 'test-8@gmail.com' && password === 'password-8') return { id: 'uid-8', email: 'test-8@gmail.com', password: 'password-8', name: 'user-8' }
        if (email === 'test-9@gmail.com' && password === 'password-9') return { id: 'uid-9', email: 'test-9@gmail.com', password: 'password-9', name: 'user-9' }
        if (email === 'test-10@gmail.com' && password === 'password-10') return { id: 'uid-10', email: 'test-10@gmail.com', password: 'password-10', name: 'user-10' }
        return null
      })
    };
  });
});

describe('# userController', () => {
    describe('## create method', () => {
        it('Scenario 1', async () => {
            const request = { body: { id: 'uid-8', email: 'test-8@gmail.com', password: 'password-8', name: 'user-8' } }
            const ret = {}
            const response = { send: jest.fn(data => ret.send = data), status: jest.fn().mockReturnThis() }
            await userController.create(request, response)
            expect(ret).toEqual({"send":{"id":"uid-8","email":"test-8@gmail.com","password":"password-8","name":"user-8"}})
        })
        it('Scenario 2', async () => {
            const request = { body: { id: 'uid-12', email: 'test-7@gmail.com', password: 'password-7', name: 'user-7' } }
            const ret = {}
            const response = { send: jest.fn(data => ret.send = data), status: jest.fn().mockReturnThis() }
            await userController.create(request, response)
            expect(ret).toEqual({"send":"User not created"})
        })
        it('Scenario 3', async () => {
            const request = { body: { id: 'uid-13', email: 'test-9@gmail.com', password: 'password-9', name: 'user-9' } }
            const ret = {}
            const response = { send: jest.fn(data => ret.send = data), status: jest.fn().mockReturnThis() }
            await userController.create(request, response)
            expect(ret).toEqual({"send":"User not created"})
        })
    })
    describe('## list method', () => {
        it('Scenario 1', async () => {
            const request = {}
            const ret = {}
            const response = { send: jest.fn(data => ret.send = data), status: jest.fn().mockReturnThis() }
            await userController.list(request, response)
            expect(ret).toEqual({"send":[{"id":"uid-1","email":"test-1@gmail.com","password":"password-1","name":"user-1"},{"id":"uid-2","email":"test-2@gmail.com","password":"password-2","name":"user-2"}]})
        })
    })
    describe('## findById method', () => {
        it('Scenario 1', async () => {
            const request = { params: { id: 'uid-6' } }
            const ret = {}
            const response = { send: jest.fn(data => ret.send = data), status: jest.fn().mockReturnThis() }
            await userController.findById(request, response)
            expect(ret).toEqual({"send":"User not found"})
        })
        it('Scenario 2', async () => {
            const request = { params: { id: 'uid-8' } }
            const ret = {}
            const response = { send: jest.fn(data => ret.send = data), status: jest.fn().mockReturnThis() }
            await userController.findById(request, response)
            expect(ret).toEqual({"send":"User not found"})
        })
        it('Scenario 3', async () => {
            const request = { params: { id: 'uid-4' } }
            const ret = {}
            const response = { send: jest.fn(data => ret.send = data), status: jest.fn().mockReturnThis() }
            await userController.findById(request, response)
            expect(ret).toEqual({"send":{"id":"uid-4","email":"test-4@gmail.com","password":"password-4","name":"user-4"}})
        })
    })
    describe('## findUserAccount method', () => {
        it('Scenario 1', async () => {
            const request = { body: { email: 'test-4@gmail.com', password: 'password-6' } }
            const ret = {}
            const response = { send: jest.fn(data => ret.send = data), status: jest.fn().mockReturnThis() }
            await userController.findUserAccount(request, response)
            expect(ret).toEqual({"send":"User not found"})
        })
        it('Scenario 2', async () => {
            const request = { body: { email: 'test-5@gmail.com', password: 'password-7' } }
            const ret = {}
            const response = { send: jest.fn(data => ret.send = data), status: jest.fn().mockReturnThis() }
            await userController.findUserAccount(request, response)
            expect(ret).toEqual({"send":"User not found"})
        })
        it('Scenario 3', async () => {
            const request = { body: { email: 'test-3@gmail.com', password: 'password-3' } }
            const ret = {}
            const response = { send: jest.fn(data => ret.send = data), status: jest.fn().mockReturnThis() }
            await userController.findUserAccount(request, response)
            expect(ret).toEqual({"send":{"id":"uid-3","email":"test-3@gmail.com","password":"password-3","name":"user-3"}})
        })
    })
})
