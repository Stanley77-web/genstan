import UserController from '../controllers/UserController';

jest.mock('../appService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      registerUser: jest.fn(async (user) => {
        if (user.userId === 'ID-001' && user.role === 'admin' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active') return { data: { userId: 'ID-001', role: 'admin', userName: 'User 01', phoneNumber: '085200471481', password: 'lab*nz!*$jfue_p%u', status: 'active' } }
        if (user.userId === 'ID-002' && user.role === 'user' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive') return { data: { userId: 'ID-002', role: 'user', userName: 'User 02', phoneNumber: '085200178467', password: 'opv^srosztx!klt', status: 'inactive' } }
        if (user.userId === 'ID-003' && user.role === 'user' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive') return { data: { userId: 'ID-003', role: 'user', userName: 'User 03', phoneNumber: '087580887998', password: '+hib#+%$(@%+i)%^@s&w&po)', status: 'inactive' } }
        if (user.userId === 'ID-004' && user.role === 'user' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active') return { data: { userId: 'ID-004', role: 'user', userName: 'User 04', phoneNumber: '084541894816', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' } }
        if (user.userId === 'ID-005' && user.role === 'user' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive') return { data: { userId: 'ID-005', role: 'user', userName: 'User 05', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'inactive' } }
        if (user.userId === 'ID-006' && user.role === 'user' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive') return { data: null }
        if (user.userId === 'ID-007' && user.role === 'admin' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active') return { data: null }
        if (user.userId === 'ID-008' && user.role === 'admin' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active') return { data: null }
        if (user.userId === 'ID-009' && user.role === 'admin' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive') return { data: null }
        if (user.userId === 'ID-010' && user.role === 'admin' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active') return { data: null }
        return null
      })
    };
  });
});

jest.mock('../services/userService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAllUsers: jest.fn(async () => {
        if (true) return [{ user: { userId: 'ID-001', role: 'admin', userName: 'User 01', phoneNumber: '085200471481', password: 'lab*nz!*$jfue_p%u', status: 'active' } }, { user: { userId: 'ID-002', role: 'user', userName: 'User 02', phoneNumber: '085200178467', password: 'opv^srosztx!klt', status: 'inactive' } }, { user: { userId: 'ID-003', role: 'user', userName: 'User 03', phoneNumber: '087580887998', password: '+hib#+%$(@%+i)%^@s&w&po)', status: 'inactive' } }, { user: { userId: 'ID-004', role: 'user', userName: 'User 04', phoneNumber: '084541894816', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' } }, { user: { userId: 'ID-005', role: 'user', userName: 'User 05', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'inactive' } }, { user: { userId: 'ID-006', role: 'user', userName: 'User 06', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'inactive' } }, { user: { userId: 'ID-007', role: 'admin', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'active' } }, { user: { userId: 'ID-008', role: 'admin', userName: 'User 08', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'active' } }, { user: { userId: 'ID-009', role: 'admin', userName: 'User 09', phoneNumber: '083008460868', password: 'fuopizod)bbjc+^t', status: 'inactive' } }, { user: { userId: 'ID-010', role: 'admin', userName: 'User 10', phoneNumber: '082186254770', password: '+j)*jakuv(ellf', status: 'active' } }]
        return null
      }), 
      getUserById: jest.fn((userId) => {
        if (userId === 'ID-001') return { userId: 'ID-001', role: 'admin', userName: 'User 01', phoneNumber: '085200471481', password: 'lab*nz!*$jfue_p%u', status: 'active' }
        if (userId === 'ID-002') return { userId: 'ID-002', role: 'user', userName: 'User 02', phoneNumber: '085200178467', password: 'opv^srosztx!klt', status: 'inactive' }
        if (userId === 'ID-003') return { userId: 'ID-003', role: 'user', userName: 'User 03', phoneNumber: '087580887998', password: '+hib#+%$(@%+i)%^@s&w&po)', status: 'inactive' }
        if (userId === 'ID-004') return { userId: 'ID-004', role: 'user', userName: 'User 04', phoneNumber: '084541894816', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' }
        if (userId === 'ID-005') return { userId: 'ID-005', role: 'user', userName: 'User 05', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'inactive' }
        if (userId === 'ID-006') return { userId: 'ID-006', role: 'user', userName: 'User 06', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'inactive' }
        if (userId === 'ID-007') return { userId: 'ID-007', role: 'admin', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'active' }
        if (userId === 'ID-008') return { userId: 'ID-008', role: 'admin', userName: 'User 08', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'active' }
        if (userId === 'ID-009') return { userId: 'ID-009', role: 'admin', userName: 'User 09', phoneNumber: '083008460868', password: 'fuopizod)bbjc+^t', status: 'inactive' }
        if (userId === 'ID-010') return { userId: 'ID-010', role: 'admin', userName: 'User 10', phoneNumber: '082186254770', password: '+j)*jakuv(ellf', status: 'active' }
        return null
      })
    };
  });
});

describe('# UserController', () => {
    describe('## createUser method', () => {
        it('Scenario 1', async () => {
            const request = { body: { userObj: { userId: 'ID-008', role: 'admin', userName: 'User 08', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'active' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await UserController.createUser(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed"}})
        })
        it('Scenario 2', async () => {
            const request = { body: { userObj: { userId: 'ID-001', role: 'admin', userName: 'User 01', phoneNumber: '085200471481', password: 'lab*nz!*$jfue_p%u', status: 'active' } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await UserController.createUser(request, response)
            expect(ret).toEqual({"json":{"data":{"userId":"ID-001","role":"admin","userName":"User 01","phoneNumber":"085200471481","password":"lab*nz!*$jfue_p%u","status":"active"},"message":"successfully","error":null}})
        })
        it('Scenario 3', async () => {
            const request = { body: { userObj: { data: { userId: 'ID-005', role: 'user', userName: 'User 05', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'inactive' } } } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await UserController.createUser(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"failed","error":"Cannot read properties of null (reading 'data')"}})
        })
    })
    describe('## getAllUsers method', () => {
        it('Scenario 1', async () => {
            const request = {}
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await UserController.getAllUsers(request, response)
            expect(ret).toEqual({"json":{"data":[{"user":{"userId":"ID-001","role":"admin","userName":"User 01","phoneNumber":"085200471481","password":"lab*nz!*$jfue_p%u","status":"active"}},{"user":{"userId":"ID-002","role":"user","userName":"User 02","phoneNumber":"085200178467","password":"opv^srosztx!klt","status":"inactive"}},{"user":{"userId":"ID-003","role":"user","userName":"User 03","phoneNumber":"087580887998","password":"+hib#+%$(@%+i)%^@s&w&po)","status":"inactive"}},{"user":{"userId":"ID-004","role":"user","userName":"User 04","phoneNumber":"084541894816","password":"*u_c^@o#djxe!b@lsnomzee$","status":"active"}},{"user":{"userId":"ID-005","role":"user","userName":"User 05","phoneNumber":"089833513022","password":"*gxh)a*vcgirqegnjlc&mfi","status":"inactive"}},{"user":{"userId":"ID-006","role":"user","userName":"User 06","phoneNumber":"083028431141","password":"c$z%zx@iol(mq@","status":"inactive"}},{"user":{"userId":"ID-007","role":"admin","userName":"User 07","phoneNumber":"086657778155","password":"qyumambcy@","status":"active"}},{"user":{"userId":"ID-008","role":"admin","userName":"User 08","phoneNumber":"084084216557","password":"nmg)h*x$e(vtvimgfmaz%u","status":"active"}},{"user":{"userId":"ID-009","role":"admin","userName":"User 09","phoneNumber":"083008460868","password":"fuopizod)bbjc+^t","status":"inactive"}},{"user":{"userId":"ID-010","role":"admin","userName":"User 10","phoneNumber":"082186254770","password":"+j)*jakuv(ellf","status":"active"}}],"message":"successfully","error":null}})
        })
    })
    describe('## getUser method', () => {
        it('Scenario 1', async () => {
            const request = { params: { userId: 'ID-003' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await UserController.getUser(request, response)
            expect(ret).toEqual({"json":{"data":{"userId":"ID-003","role":"user","userName":"User 03","phoneNumber":"087580887998","password":"+hib#+%$(@%+i)%^@s&w&po)","status":"inactive"},"message":"successfully","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { params: { userId: 'ID-007' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await UserController.getUser(request, response)
            expect(ret).toEqual({"json":{"data":{"userId":"ID-007","role":"admin","userName":"User 07","phoneNumber":"086657778155","password":"qyumambcy@","status":"active"},"message":"successfully","error":null}})
        })
    })
})
