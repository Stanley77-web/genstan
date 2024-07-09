type MockMethod = {
    name: string,
    isAsync: boolean,
    input: any[],
    return: any[]
};

type MockInfo = {
    library: string,
    path: string,
    methods: MockMethod[],
    typeImport: string
};

type MockArgument = {
    [key: string]: any[]
};

type MockFunctionArgument = {
    [key: string]: MockArgument
};

type ValueType = {
    type: string;
    properties?: Array<{
        name: string;
        type: string;
        properties?: Array<any>;
    }>;
};

type Options = {
    isWord: boolean;
    isPhoneNumber: boolean;
};

export type {
    MockMethod,
    MockInfo,
    MockArgument,
    MockFunctionArgument,
    ValueType,
    Options
};