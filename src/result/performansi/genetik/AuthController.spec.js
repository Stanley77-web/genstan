import AuthController from '../controllers/AuthController';

jest.mock('../services/userService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getUserForLogin: jest.fn(async (phoneNumber, password) => {
        if (phoneNumber === '085200471481' && password === 'lab*nz!*$jfue_p%u') return { userId: 'ID-001', role: 'admin', userName: 'User 01', phoneNumber: '085200471481', password: 'lab*nz!*$jfue_p%u', status: 'active' }
        if (phoneNumber === '085200178467' && password === 'opv^srosztx!klt') return { userId: 'ID-002', role: 'user', userName: 'User 02', phoneNumber: '085200178467', password: 'opv^srosztx!klt', status: 'inactive' }
        if (phoneNumber === '087580887998' && password === '+hib#+%$(@%+i)%^@s&w&po)') return { userId: 'ID-003', role: 'user', userName: 'User 03', phoneNumber: '087580887998', password: '+hib#+%$(@%+i)%^@s&w&po)', status: 'inactive' }
        if (phoneNumber === '084541894816' && password === '*u_c^@o#djxe!b@lsnomzee$') return { userId: 'ID-004', role: 'user', userName: 'User 04', phoneNumber: '084541894816', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' }
        if (phoneNumber === '089833513022' && password === '*gxh)a*vcgirqegnjlc&mfi') return { userId: 'ID-005', role: 'user', userName: 'User 05', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'inactive' }
        if (phoneNumber === '083028431141' && password === 'c$z%zx@iol(mq@') return { userId: 'ID-006', role: 'user', userName: 'User 06', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'inactive' }
        if (phoneNumber === '086657778155' && password === 'qyumambcy@') return { userId: 'ID-007', role: 'admin', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'active' }
        if (phoneNumber === '084084216557' && password === 'nmg)h*x$e(vtvimgfmaz%u') return { userId: 'ID-008', role: 'admin', userName: 'User 08', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'active' }
        if (phoneNumber === '083008460868' && password === 'fuopizod)bbjc+^t') return { userId: 'ID-009', role: 'admin', userName: 'User 09', phoneNumber: '083008460868', password: 'fuopizod)bbjc+^t', status: 'inactive' }
        if (phoneNumber === '082186254770' && password === '+j)*jakuv(ellf') return { userId: 'ID-010', role: 'admin', userName: 'User 10', phoneNumber: '082186254770', password: '+j)*jakuv(ellf', status: 'active' }
        return null
      })
    };
  });
});

jest.mock('../models/AuthModel', () => {
  return { 'AuthModel' : {
      findOne: jest.fn(async (filter) => {
        if (filter.phoneNumber === '083028431141') return { phoneNumber: '083028431141', otp: '129809' }
        if (filter.phoneNumber === '086657778155') return { phoneNumber: '086657778155', otp: '890341' }
        if (filter.phoneNumber === '084084216557') return { phoneNumber: '084084216557', otp: '234156' }
        if (filter.phoneNumber === '083008460868') return { phoneNumber: '083008460868', otp: '134255' }
        if (filter.phoneNumber === '082186254770') return { phoneNumber: '082186254770', otp: '213451' }
        if (filter.phoneNumber === '085532374225') return { phoneNumber: '085532374225', otp: '233455' }
        if (filter.phoneNumber === '087839925893') return { phoneNumber: '087839925893', otp: '123415' }
        if (filter.phoneNumber === '084772392608') return { phoneNumber: '084772392608', otp: '125336' }
        if (filter.phoneNumber === '083154199120') return { phoneNumber: '083154199120', otp: '923415' }
        if (filter.phoneNumber === '085227348186') return { phoneNumber: '085227348186', otp: '125341' }
        return null
      }), 
      create: jest.fn(async (auth) => {
        if (auth.phoneNumber === '085200471481' && auth.otp === '128909') return null
        if (auth.phoneNumber === '085200178467' && auth.otp === '890123') return null
        if (auth.phoneNumber === '087580887998' && auth.otp === '124535') return null
        if (auth.phoneNumber === '084541894816' && auth.otp === '654321') return null
        if (auth.phoneNumber === '089833513022' && auth.otp === '678901') return null
        if (auth.phoneNumber === '082081845777' && auth.otp === '890923') return null
        if (auth.phoneNumber === '080415954808' && auth.otp === '785609') return null
        if (auth.phoneNumber === '086774607752' && auth.otp === '218920') return null
        if (auth.phoneNumber === '087824627503' && auth.otp === '812839') return null
        if (auth.phoneNumber === '083500141420' && auth.otp === '126723') return null
        return null
      }), 
      findOneAndUpdate: jest.fn(async (filter, auth) => {
        if (filter.phoneNumber === '083028431141' && auth.otp === '129809') return null
        if (filter.phoneNumber === '086657778155' && auth.otp === '890341') return null
        if (filter.phoneNumber === '084084216557' && auth.otp === '234156') return null
        if (filter.phoneNumber === '083008460868' && auth.otp === '134255') return null
        if (filter.phoneNumber === '082186254770' && auth.otp === '213451') return null
        if (filter.phoneNumber === '085532374225' && auth.otp === '233455') return null
        if (filter.phoneNumber === '087839925893' && auth.otp === '123415') return null
        if (filter.phoneNumber === '084772392608' && auth.otp === '125336') return null
        if (filter.phoneNumber === '083154199120' && auth.otp === '923415') return null
        if (filter.phoneNumber === '085227348186' && auth.otp === '125341') return null
        return null
      })
    }
  };
});

jest.mock('../services/authService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      sendOtp: jest.fn(async (phoneNumber) => {
        if (phoneNumber === '085200471481') return '129809'
        if (phoneNumber === '085200178467') return '890341'
        if (phoneNumber === '087580887997') return '234156'
        if (phoneNumber === '084541894816') return '134255'
        if (phoneNumber === '089833513022') return '213451'
        if (phoneNumber === '083028431154') return '233455'
        if (phoneNumber === '086657778155') return '123415'
        if (phoneNumber === '084084216557') return '125336'
        if (phoneNumber === '083008460868') return '923415'
        if (phoneNumber === '082186254770') return '125341'
        return null
      }), 
      generateAccessToken: jest.fn(async (user) => {
        if (user.userId === 'ID-001' && user.role === 'admin' && user.userName === 'User 01' && user.phoneNumber === '085200471481') return 'sDVkGkAfhRiGPLc'
        if (user.userId === 'ID-002' && user.role === 'user' && user.userName === 'User 02' && user.phoneNumber === '085200178467') return 'uGRUUGCgGiSQSvR'
        if (user.userId === 'ID-003' && user.role === 'user' && user.userName === 'User 03' && user.phoneNumber === '087580887998') return 'LUtqExybFaVMwCd'
        if (user.userId === 'ID-004' && user.role === 'user' && user.userName === 'User 04' && user.phoneNumber === '084541894816') return 'AJwVSLjkrJMpzYg'
        if (user.userId === 'ID-005' && user.role === 'user' && user.userName === 'User 05' && user.phoneNumber === '089833513022') return 'pHXawatKQQcetaO'
        if (user.userId === 'ID-006' && user.role === 'user' && user.userName === 'User 06' && user.phoneNumber === '083028431141') return 'qFiMOqAcqOmORwz'
        if (user.userId === 'ID-007' && user.role === 'admin' && user.userName === 'User 07' && user.phoneNumber === '086657778155') return 'gfEcEUrvYJjZeLH'
        if (user.userId === 'ID-008' && user.role === 'admin' && user.userName === 'User 08' && user.phoneNumber === '084084216557') return 'GgMzGiwuQxoQuCE'
        if (user.userId === 'ID-009' && user.role === 'admin' && user.userName === 'User 09' && user.phoneNumber === '083008460868') return 'LdgKDEAlblJXZHm'
        if (user.userId === 'ID-010' && user.role === 'admin' && user.userName === 'User 10' && user.phoneNumber === '082186254770') return 'FClqPYoBTLpYoAA'
        return null
      })
    };
  });
});

jest.mock('../models/UserModel', () => {
  return { 'UserModel' : {
      findOneAndUpdate: jest.fn(async (filter, user) => {
        if (filter.phoneNumber === '085200471481' && user.userId === 'ID-001' && user.role === 'admin' && user.userName === 'User 01' && user.phoneNumber === '085200471481' && user.password === 'lab*nz!*$jfue_p%u' && user.status === 'active') return null
        if (filter.phoneNumber === '085200178467' && user.userId === 'ID-002' && user.role === 'user' && user.userName === 'User 02' && user.phoneNumber === '085200178467' && user.password === 'opv^srosztx!klt' && user.status === 'inactive') return null
        if (filter.phoneNumber === '087580887998' && user.userId === 'ID-003' && user.role === 'user' && user.userName === 'User 03' && user.phoneNumber === '087580887998' && user.password === '+hib#+%$(@%+i)%^@s&w&po)' && user.status === 'inactive') return null
        if (filter.phoneNumber === '084541894816' && user.userId === 'ID-004' && user.role === 'user' && user.userName === 'User 04' && user.phoneNumber === '084541894816' && user.password === '*u_c^@o#djxe!b@lsnomzee$' && user.status === 'active') return null
        if (filter.phoneNumber === '089833513022' && user.userId === 'ID-005' && user.role === 'user' && user.userName === 'User 05' && user.phoneNumber === '089833513022' && user.password === '*gxh)a*vcgirqegnjlc&mfi' && user.status === 'inactive') return null
        if (filter.phoneNumber === '083028431141' && user.userId === 'ID-006' && user.role === 'user' && user.userName === 'User 06' && user.phoneNumber === '083028431141' && user.password === 'c$z%zx@iol(mq@' && user.status === 'inactive') return null
        if (filter.phoneNumber === '086657778155' && user.userId === 'ID-007' && user.role === 'admin' && user.userName === 'User 07' && user.phoneNumber === '086657778155' && user.password === 'qyumambcy@' && user.status === 'active') return null
        if (filter.phoneNumber === '084084216557' && user.userId === 'ID-008' && user.role === 'admin' && user.userName === 'User 08' && user.phoneNumber === '084084216557' && user.password === 'nmg)h*x$e(vtvimgfmaz%u' && user.status === 'active') return null
        if (filter.phoneNumber === '083008460868' && user.userId === 'ID-009' && user.role === 'admin' && user.userName === 'User 09' && user.phoneNumber === '083008460868' && user.password === 'fuopizod)bbjc+^t' && user.status === 'inactive') return null
        if (filter.phoneNumber === '082186254770' && user.userId === 'ID-010' && user.role === 'admin' && user.userName === 'User 10' && user.phoneNumber === '082186254770' && user.password === '+j)*jakuv(ellf' && user.status === 'active') return null
        return null
      }), 
      findOne: jest.fn(async (filter) => {
        if (filter.phoneNumber === '085200471481') return { userId: 'ID-001', role: 'admin', userName: 'User 01', phoneNumber: '085200471481', password: 'lab*nz!*$jfue_p%u', status: 'active' }
        if (filter.phoneNumber === '085200178467') return { userId: 'ID-002', role: 'user', userName: 'User 02', phoneNumber: '085200178467', password: 'opv^srosztx!klt', status: 'inactive' }
        if (filter.phoneNumber === '087580887998') return { userId: 'ID-003', role: 'user', userName: 'User 03', phoneNumber: '087580887998', password: '+hib#+%$(@%+i)%^@s&w&po)', status: 'inactive' }
        if (filter.phoneNumber === '084541894816') return { userId: 'ID-004', role: 'user', userName: 'User 04', phoneNumber: '084541894816', password: '*u_c^@o#djxe!b@lsnomzee$', status: 'active' }
        if (filter.phoneNumber === '089833513022') return { userId: 'ID-005', role: 'user', userName: 'User 05', phoneNumber: '089833513022', password: '*gxh)a*vcgirqegnjlc&mfi', status: 'inactive' }
        if (filter.phoneNumber === '083028431141') return { userId: 'ID-006', role: 'user', userName: 'User 06', phoneNumber: '083028431141', password: 'c$z%zx@iol(mq@', status: 'inactive' }
        if (filter.phoneNumber === '086657778155') return { userId: 'ID-007', role: 'admin', userName: 'User 07', phoneNumber: '086657778155', password: 'qyumambcy@', status: 'active' }
        if (filter.phoneNumber === '084084216557') return { userId: 'ID-008', role: 'admin', userName: 'User 08', phoneNumber: '084084216557', password: 'nmg)h*x$e(vtvimgfmaz%u', status: 'active' }
        if (filter.phoneNumber === '083008460868') return { userId: 'ID-009', role: 'admin', userName: 'User 09', phoneNumber: '083008460868', password: 'fuopizod)bbjc+^t', status: 'inactive' }
        if (filter.phoneNumber === '082186254770') return { userId: 'ID-010', role: 'admin', userName: 'User 10', phoneNumber: '082186254770', password: '+j)*jakuv(ellf', status: 'active' }
        return null
      })
    }
  };
});

describe('# AuthController', () => {
    describe('## login method', () => {
        it('Scenario 1', async () => {
            const request = { body: { phoneNumber: '084772392608', password: '*gxh)a*vcgirqegnjlc&mfi' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.login(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Incorrect phone number or password!","error":"incorrect-phonenumber-or-password"}})
        })
        it('Scenario 2', async () => {
            const request = { body: { phoneNumber: '082081845777', password: 'fuopizod)bbjc+^t' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.login(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Incorrect phone number or password!","error":"incorrect-phonenumber-or-password"}})
        })
        it('Scenario 3', async () => {
            const request = { body: { phoneNumber: '084084216557', password: 'lab*nz!*$jfue_p%u' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.login(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Incorrect phone number or password!","error":"incorrect-phonenumber-or-password"}})
        })
        it('Scenario 4', async () => {
            const request = { body: { phoneNumber: '087824627503', password: 'qyumambcy@' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.login(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Incorrect phone number or password!","error":"incorrect-phonenumber-or-password"}})
        })
        it('Scenario 5', async () => {
            const request = { body: { phoneNumber: '087839925893', password: 'opv^srosztx!klt' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.login(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Incorrect phone number or password!","error":"incorrect-phonenumber-or-password"}})
        })
        it('Scenario 6', async () => {
            const request = { body: { phoneNumber: '085227348186', password: 'fuopizod)bbjc+^t' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.login(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Incorrect phone number or password!","error":"incorrect-phonenumber-or-password"}})
        })
        it('Scenario 7', async () => {
            const request = { body: { phoneNumber: '087580887998', password: '+j)*jakuv(ellf' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.login(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Incorrect phone number or password!","error":"incorrect-phonenumber-or-password"}})
        })
    })
    describe('## verify method', () => {
        it('Scenario 1', async () => {
            const request = { body: { phoneNumber: '085227348186', smsotp: '123415' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.verify(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Invalid OTP!","error":"failed"}})
        })
        it('Scenario 2', async () => {
            const request = { body: { phoneNumber: '082186254770', smsotp: '126723' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.verify(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Invalid OTP!","error":"failed"}})
        })
        it('Scenario 3', async () => {
            const request = { body: { phoneNumber: '080415954808', smsotp: '785609' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.verify(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 4', async () => {
            const request = { body: { phoneNumber: '082081845777', smsotp: '125341' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.verify(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
    describe('## resetPassword method', () => {
        it('Scenario 1', async () => {
            const request = { body: { phoneNumber: '084541894816', isVerified: 'unperthen deckdom prostores', password: 'nmg)h*x$e(vtvimgfmaz%u' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.resetPassword(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Reset password successfully!","error":null}})
        })
        it('Scenario 2', async () => {
            const request = { body: { phoneNumber: '083154199120', isVerified: '^ezel!ff)_$)qumt%', password: 'qyumambcy@' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.resetPassword(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
        it('Scenario 3', async () => {
            const request = { body: { phoneNumber: '083008460868', isVerified: 'readminship foremrser pattern retailerable secship', password: 'lab*nz!*$jfue_p%u' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.resetPassword(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"Reset password successfully!","error":null}})
        })
        it('Scenario 4', async () => {
            const request = { body: { phoneNumber: '087839925893', isVerified: 'inflashers regone', password: '+hib#+%$(@%+i)%^@s&w&po)' } }
            const ret = {}
            const response = { json: jest.fn(data => ret.json = data), status: jest.fn().mockReturnThis() }
            await AuthController.resetPassword(request, response)
            expect(ret).toEqual({"json":{"data":null,"message":"User not found!","error":"user-notfound"}})
        })
    })
})
