type Options = {
    populationSize: number,
    maxIteration: number,
    targetCoverage: number,
    qLearningInterval: number,
    appDir: string,
    testPath: string,
    skipController: string[],
};

type Population = {
    name: string,
    population: Individu[]
};

type Individu = {
    id: number,
    method: Method[]
};

type Method = {
    name: string,
    request: Gen[]
};

type Gen = {
    name: string,
    properties: any
}[];

type DuplicateRequestInfo = {
    idxReqList: number,
    idxReq: number,
    properties: string
};

type CoverageInfo = {
    [key: string]: CoverageValue
};

type CoverageValue = {
    idx?: number,
    coverage: Coverage,
    unCoveredLines: number[]
};

type Coverage = {
    statements: number,
    branches: number,
    functions: number,
    lines: number
};

type FullfilledMember = {
    name: string,
    individu: Individu
};

type BestIndividu = {
    [key: string]: Individu
};

type QTable = {
    [controller_name: string]: { 
        [action: string]: number 
    };
};

type Action = {
    do: string,
    affectedProperties: any[]
};

type OptimizedIndividu = {
    name?: string,
    action: Action,
    result?: Individu
};

type StateList = {
    name: string,
    actionList: OptimizedIndividu[]
};

export type {
    Options,
    Population,
    Method,
    Individu,
    Gen,
    DuplicateRequestInfo,
    CoverageInfo,
    CoverageValue,
    Coverage,
    FullfilledMember,
    BestIndividu,
    QTable,
    Action,
    OptimizedIndividu,
    StateList
};