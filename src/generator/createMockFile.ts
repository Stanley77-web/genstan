import { ControllerInfo } from "./type/controllerTypes";
import { MockInfo } from "./type/mockTypes";
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { parserSourceCodeInfo } from "./parserSourceCode";

function createMockFile(controllerInfo: ControllerInfo[], appDir: string, mockPath: string = 'src/tests/mocks/') {
    const appMockPath = `${appDir}\\${mockPath}`;

    if (!existsSync(appMockPath)) {
        mkdirSync(appMockPath, { recursive: true });
    }

    for (const info of controllerInfo) {
        const mockFile = appMockPath + `${info.name}.json`;

        const mockInfo: MockInfo[] = [];

        const library = info.imports;

        for (const lib of info.callLibs) {
            const existLib = mockInfo.find(x => x.library === lib.library);

            if (!existLib) {
                const pathLib = library.find(x => x.library.includes(lib.library));

                mockInfo.push({
                    library: lib.library,
                    path: pathLib!!.module?.replaceAll("\"", ''),
                    methods: [{
                        name: lib.function,
                        isAsync: lib.isAsync,
                        input: [],
                        return: []
                    }],
                    typeImport: pathLib!!.type
                });
            } else {
                const existMethod = existLib.methods.find(x => x.name === lib.function);

                if (!existMethod) {
                    existLib.methods.push({
                        name: lib.function,
                        isAsync: lib.isAsync,
                        input: [],
                        return: []
                    });
                }
            }
        }

        const mockInfoString = JSON.stringify(mockInfo, null, 2);

        writeFileSync(mockFile, mockInfoString);

        console.log(`Created mock file for ${info.name} at ${mockFile}`);
    }
}

// const appDir = "D:\\Stanley\\Kuliah\\Akademik\\TA\\src\\Open Source Web\\Test Case Generator\\supply_chain_application";
// const controllerInfoList = parserSourceCodeInfo(appDir);
// createMockFile(controllerInfoList, appDir);



export { createMockFile };