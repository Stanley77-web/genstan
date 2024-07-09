type ImportInfo = {
    library: string[],
    module: string,
    type: string
};

type MethodInfo = {
    name: string,
    parameters: string[],
    reqInfo: RequestInfo[],
    resInfo: RequestInfo[][]
};

type RequestInfo = {
    name: string,
    properties: string[] | RequestInfo[],
    propertiesValue?: any[],
};

type CallInfo = {
    library: string,
    function: string,
    arguments: string[],
    isAsync: boolean
};

type ControllerInfo = {
    name: string,
    imports: ImportInfo[],
    methods: MethodInfo[],
    callLibs: CallInfo[],
    testCaseContent?: string
};

type Options = {
    testPath: string,
    controllerPath: string,
    mockPath: string,
    isWrite: boolean
};

export type {
    ImportInfo,
    MethodInfo,
    RequestInfo,
    CallInfo,
    ControllerInfo,
    Options
};