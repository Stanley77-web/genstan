
import { ControllerInfo, RequestInfo, MethodInfo, Options } from "../type/controllerTypes";
import { MockFunctionArgument, MockArgument, MockInfo } from "../type/mockTypes";
import { createWriteStream, readFileSync, unlinkSync, writeFileSync } from "fs";
import { parserSourceCodeInfo } from "./parserSourceCode";
import { trim } from "lodash";

function createTestCase (listControllerInfo: ControllerInfo[], options: Partial<Options> = {}): MockFunctionArgument {
    const appDir = options.appDir || "app";
    const testPath = options.testPath || "src/tests";
    const isWrite = options.isWrite || false;
    const appTestPath = `${appDir}/${testPath}`;

    const mockFunctionArgument: MockFunctionArgument = {};

    for (const controllerInfo of listControllerInfo) {
        // if (controllerInfo.name !== 'ProductController') {
        //     continue;
        // }

        const mockArgument = writeMockFunction(controllerInfo, appDir, options);

        if (isWrite) {
            const testCaseFilePath = `${appTestPath}/${controllerInfo.name}.spec.js`;

            writeFileSync(testCaseFilePath, controllerInfo.testCaseContent!!);
        }

        mockFunctionArgument[controllerInfo.name] = mockArgument;
    }

    return mockFunctionArgument;

    function writeMockFunction(controllerInfo: ControllerInfo, appDir: string, options: Partial<Options> = {}): MockArgument {
        const controllerPath = options.controllerPath || "src/controllers";
        const mockPath = options.mockPath || "src/tests/mocks";

        const appMockPath = `${appDir}/${mockPath}`;

        const mockFilePath = `${appMockPath}/${controllerInfo.name}.json`;
        const mockFile = readFileSync(mockFilePath, 'utf8');
        const mockData: MockInfo[] = JSON.parse(mockFile);

        let mockArgument: MockArgument = {};

        let testCaseString = '';

        if (controllerInfo.type === 'Class') {
            testCaseString += `import ${controllerInfo.name}Class from '..${controllerPath.replace('src', '')}/${controllerInfo.name}';\n\n`;
            testCaseString += `const ${controllerInfo.name} = new ${controllerInfo.name}Class();\n\n`;
        } else {
            testCaseString += `import ${controllerInfo.name} from '..${controllerPath.replace('src', '')}/${controllerInfo.name}';\n\n`;
        }

        for (const library of mockData) {
            const libraryName = library.library;
            const libraryPath = library.path;
            const methods = library.methods;
            const typeImport = library.typeImport;

            testCaseString += `jest.mock('${libraryPath}', () => {\n`;

            if (typeImport === 'namedImport') {
                testCaseString += `  return { '${libraryName}' : {\n`;
            } else if (typeImport === 'identifierImport') {
                testCaseString += `  return jest.fn().mockImplementation(() => {\n`;
                testCaseString += `    return {\n`;
            }

            for (const [idxMethod, method] of methods.entries()) {
                const methodName = method.name;
                const methodInput = method.input;
                const methodReturn = method.return;
                const isAsync = method.isAsync;

                let inputArgumentStr = '';

                let inputArgumentName: string[] = [];

                if (methodInput.length > 0) {
                    inputArgumentName = Object.keys(methodInput[0]);

                    for (const [idxArgument, argument] of inputArgumentName.entries()) {
                        inputArgumentStr += argument;

                        if (idxArgument < inputArgumentName.length - 1) {
                            inputArgumentStr += ', ';
                        }
                    }
                }

                testCaseString += `      ${methodName}: jest.fn(`;

                if (isAsync) {
                    testCaseString += `async `;
                }

                testCaseString += `(${inputArgumentStr}) => {\n`;

                const conditionVariationInput = methodInput.length;

                for (let idx = 0; idx < conditionVariationInput; idx++) {
                    testCaseString += `        if (`;

                    for (const [idxArgument, argument] of inputArgumentName.entries()) {
                        const argumentValue = methodInput[idx][argument];

                        mockArgument = extractMock(mockArgument, argument, argumentValue);

                        testCaseString += writeConditionValue(argument, argumentValue);

                        if (idxArgument < inputArgumentName.length - 1) {
                            testCaseString += ` && `;
                        }
                    }

                    if (idx < methodReturn.length) {
                        const outputValue = Object.values(methodReturn[idx])[0];
                        const outputName = Object.keys(methodReturn[idx])[0];

                        mockArgument = extractMock(mockArgument, outputName, outputValue);
                        
                        testCaseString += `) return `;
                        testCaseString += writeReturnValue(outputValue);
                        testCaseString += '\n';
                    } else {
                        testCaseString += `) return null\n`;
                    }
                }

                const withoutConditionVariationInput = methodReturn.length - conditionVariationInput;

                for (let idx = 0; idx < withoutConditionVariationInput; idx++) {
                    const outputValue = Object.values(methodReturn[idx])[0];
                    const outputName = Object.keys(methodReturn[idx])[0];

                    mockArgument = extractMock(mockArgument, outputName, outputValue);

                    testCaseString += `        if (true) return `;
                    testCaseString += writeReturnValue(outputValue);
                    testCaseString += '\n';
                }

                testCaseString += '        return null\n';
                testCaseString += `      })`;

                if (idxMethod < methods.length - 1) {
                    testCaseString += ', ';
                }

                testCaseString += '\n';
            }

            if (typeImport === 'namedImport') {
                testCaseString += `    }\n`;
                testCaseString += `  };\n`;
                testCaseString += `});\n\n`;
            } else if (typeImport === 'identifierImport') {
                testCaseString += `    };\n`;
                testCaseString += `  });\n`;
                testCaseString += `});\n\n`;
            }
        }

        controllerInfo.testCaseContent = testCaseString;

        return mockArgument;
    }

    function writeConditionValue(argumentName: string, argumentValue: any): string {
        let conditionValueStr = '';

        if ("object" === typeof argumentValue && argumentValue.length !== undefined) {

            conditionValueStr += '(';
            for (const [idx, listValue] of argumentValue.entries()) {
                conditionValueStr += '(';
                conditionValueStr += writeConditionValue(argumentName, listValue);
                conditionValueStr += ')';

                if (idx < argumentValue.length - 1) {
                    conditionValueStr += ' && ';
                }
            }
            conditionValueStr += ')';
        } else if ("object" === typeof argumentValue) {
            for (const [idxKey, key] of Object.keys(argumentValue).entries()) {
                conditionValueStr += writeConditionValue(`${argumentName}.${key}`, argumentValue[key]);

                if (idxKey < Object.keys(argumentValue).length - 1) {
                    conditionValueStr += ' && ';
                }
            }
        }  else {
            conditionValueStr += `${argumentName} === ${argumentValue}`;
        }

        return conditionValueStr;
    }

    function writeReturnValue(returnValue: any): string {
        let returnValueStr = '';

        if ("object" === typeof returnValue && returnValue.length !== undefined) {
            returnValueStr += '[';
            for (const [idx, listValue] of returnValue.entries()) {
                returnValueStr += writeReturnValue(listValue);

                if (idx < returnValue.length - 1) {
                    returnValueStr += ', ';
                }
            }
            returnValueStr += ']';
        } else if ("object" === typeof returnValue) {
            returnValueStr += '{ ';
            for (const [idxKey, key] of Object.keys(returnValue).entries()) {
                returnValueStr += `${key}: `;
                returnValueStr += writeReturnValue(returnValue[key]);

                if (idxKey < Object.keys(returnValue).length - 1) {
                    returnValueStr += ', ';
                }
            }
            returnValueStr += ' }';
        } else {
            if (returnValue === "") {
                returnValueStr += 'null';
            } else {
                returnValueStr += `${trim(returnValue, "\"")}`;
            }
        }

        return returnValueStr;
    }

    function extractMock (mockArgument: MockArgument, argument: string, argumentValue: any): MockArgument {

        if (!mockArgument.hasOwnProperty(argument)) {
            mockArgument[argument] = [];
        }

        if (!isIncluding(mockArgument[argument], argumentValue)) {
            mockArgument[argument].push(argumentValue);
        }

        if ("object" === typeof argumentValue && argumentValue.length !== undefined) {
            for (const listValue of argumentValue) {
                if ("object" === typeof listValue) {
                    for (const key of Object.keys(listValue)) {
                        mockArgument = extractMock(mockArgument, key, listValue[key]);
                    }
                }
            }
        } else if ("object" === typeof argumentValue) {
            for (const key of Object.keys(argumentValue)) {
                mockArgument = extractMock(mockArgument, key, argumentValue[key]);
            }
        }

        return mockArgument;

        function isIncluding(array: any[], value: any): boolean {
            for (const element of array) {
                if (typeof element === typeof value) {
                    if (typeof element === 'object') {
                        if (JSON.stringify(element) === JSON.stringify(value)) {
                            return true;
                        }
                    } else {
                        if (element === value) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }
    }
}

function removeTestCaseScenario (controllerInfo: ControllerInfo, testPath: string): void {
  const testCaseFilePath = `${testPath}/${controllerInfo.name}.spec.js`;
  const testCaseFileRead = readFileSync(testCaseFilePath, "utf-8").split(/\r?\n/);

  const mockLines: string[] = [];
  

  for (const line of testCaseFileRead) {
    mockLines.push(line);

    if (line.includes('// Test Case')) {
      break;
    }
  }

  const testCaseFileWrite = createWriteStream(testCaseFilePath);

  for (const line of mockLines) {
    testCaseFileWrite.write(line);
    testCaseFileWrite.write('\n');
  }

  testCaseFileWrite.end();
}

function createTestCaseScenario (controllerInfo: ControllerInfo, writingRequest: Partial<{ check: boolean, write: boolean, appTestPath: string }> = {}): string {
  const writeRequestCheck = writingRequest['check'] || false;
  const writeRequestWrite = writingRequest['write'] || false;
  const apptestPath = writingRequest['appTestPath'] || "src/tests";

  let testCaseScenarioString = '';

  if (writeRequestCheck) {
    testCaseScenarioString += `import { writeFileSync } from 'fs'\n`;
    testCaseScenarioString += `const output = {}\n\n`;
  }

  const outputValue = writeRequestWrite ? JSON.parse(readFileSync(`${apptestPath}/${controllerInfo.name}.output.json`, 'utf-8')) : {};

  if (writeRequestWrite) {
    unlinkSync(`${apptestPath}/${controllerInfo.name}.output.json`);
  }

  testCaseScenarioString +=  `describe('# ${controllerInfo.name}', () => {\n`;

  for (const method of controllerInfo.methods) {
    testCaseScenarioString += `    describe('## ${method.name} method', () => {\n`;

    const reqInfos = method.reqInfo;

    if (reqInfos.length === 0) {
      testCaseScenarioString += `        it('Scenario 1', async () => {\n`;

      testCaseScenarioString += writeRequest(reqInfos, 0);

      testCaseScenarioString += `            const ret = {}\n`;

      testCaseScenarioString += writeResponse(method);

      testCaseScenarioString += `            await ${controllerInfo.name}.${method.name}(request, response)\n`;
      if (writeRequestCheck) {
        testCaseScenarioString += `            output['${method.name}-Scenario 1'] = ret\n`;

        if (method === controllerInfo.methods[controllerInfo.methods.length - 1]) {
            testCaseScenarioString += `            writeFileSync('${apptestPath}/${controllerInfo.name}.output.json', JSON.stringify(output, null, 2))\n`;
        }
      } else if (writeRequestWrite) {
        const value = outputValue[`${method.name}-Scenario 1`];
        testCaseScenarioString += `            expect(ret).toEqual(${JSON.stringify(value)})\n`;
      }
      testCaseScenarioString += `        })\n`;
    } else {
      const lenScenario = reqInfos[0].propertiesValue?.length || 0;

      for (let idx = 0; idx < lenScenario; idx++) {
        testCaseScenarioString += `        it('Scenario ${idx + 1}', async () => {\n`;

        testCaseScenarioString += writeRequest(reqInfos, idx);

        testCaseScenarioString += `            const ret = {}\n`;

        testCaseScenarioString += writeResponse(method);

        testCaseScenarioString += `            await ${controllerInfo.name}.${method.name}(request, response)\n`;
        if (writeRequestCheck) {
          testCaseScenarioString += `            output['${method.name}-Scenario ${idx + 1}'] = ret\n`;

          if (method === controllerInfo.methods[controllerInfo.methods.length - 1] && idx === lenScenario - 1) {
            testCaseScenarioString += `            writeFileSync('${apptestPath}/${controllerInfo.name}.output.json', JSON.stringify(output, null, 2))\n`;
          }
        } else if (writeRequestWrite) {
            const value = outputValue[`${method.name}-Scenario ${idx + 1}`];
            testCaseScenarioString += `            expect(ret).toEqual(${JSON.stringify(value)})\n`;
        }
        testCaseScenarioString += `        })\n`;
      }
    }

    testCaseScenarioString += `    })\n`;
  }

  testCaseScenarioString += `})\n`;

  return testCaseScenarioString;

  function writeRequest(reqInfos: RequestInfo[], idx: number): string {
    let requestStr = '';

    if (reqInfos.length === 0) {
        requestStr += '            const request = {}\n';
    } else {
        requestStr += '            const request = { ';

        for (const [idxReqInfo, reqInfo] of reqInfos.entries()) {
            requestStr += `${reqInfo.name}: { `;

            if (reqInfo.propertiesValue?.length ?? 0 > 0) {
                const propertiesValueKeys = Object.keys(reqInfo.propertiesValue!![0]);
                const property = reqInfo.propertiesValue!![idx];

                for (const [idxProperty, propertyKey] of propertiesValueKeys.entries()) {
                    requestStr += `${propertyKey}: ${writeRequestValue(property[propertyKey])}`;

                    if (idxProperty < propertiesValueKeys.length - 1) {
                        requestStr += ', ';
                    }
                }
            }

            requestStr += ' }';

            if (idxReqInfo < reqInfos.length - 1) {
                requestStr += ', ';
            }
        }

        requestStr += ' }\n';
    }

    return requestStr;

    function writeRequestValue (property: any): string {
        let requestValueStr = '';

        // console.log(property);
        // console.log(typeof property);

        if (property !== null && "object" === typeof property && property?.length !== undefined) {
            requestValueStr += '[';
            for (const [idx, listValue] of property.entries()) {
                requestValueStr += writeRequestValue(listValue);

                if (idx < property.length - 1) {
                    requestValueStr += ', ';
                }
            }
            requestValueStr += ']';
        } else if (property !== null && "object" === typeof property) {
            requestValueStr += '{ ';
            for (const [idxKey, key] of Object.keys(property).entries()) {
                requestValueStr += `${key}: `;
                requestValueStr += writeRequestValue(property[key]);

                if (idxKey < Object.keys(property).length - 1) {
                    requestValueStr += ', ';
                }
            }
            requestValueStr += ' }';
        } else {
            if (property === "" || property === null) {
                requestValueStr += 'null';
            } else {
                requestValueStr += `${trim(property, "\"")}`;
            }
        }

        return requestValueStr;
    }
  }

  function writeResponse(method: MethodInfo): string {
    let responseStr = '';

    if (method.resInfo.length === 0) {
        responseStr += '            const response = {}\n';
    } else {
        const resInfos = method.resInfo[0];

        responseStr += '            const response = { ';

        for (const [idxResInfo, resInfo] of resInfos.entries()) {
            const resName = resInfo.name;

            if (idxResInfo === 0) {
                responseStr += `${resName}: jest.fn(data => ret.${resName} = data)`;
            } else {
                responseStr += `${resName}: jest.fn().mockReturnThis()`;
            }

            if (resInfo !== resInfos[resInfos.length - 1]) {
                responseStr += ', ';
            }
        }

        responseStr += ' }\n';
    }

    return responseStr;
  }
}

function writeTestCaseFile (controllerName: string,  testCaseContent: string, options: Partial<Options> = {}): void {
    const appDir = options.appDir || `${__dirname}/app`;
    const testPath = options.testPath || "src/tests";
    const appTestPath = `${appDir}/${testPath}/${controllerName}.spec.js`;

    writeFileSync(appTestPath, testCaseContent);
}

// const appDir = "D:\\Stanley\\Kuliah\\Akademik\\TA\\Test";

// const controllerInfoList = parserSourceCodeInfo(appDir);

// const debugDir = 'C:\\Users\\acer\\.vscode\\extensions\\genstan\\src\\generator\\debug';

// const mockFunctionArgument = createTestCase(controllerInfoList, appDir, { isWrite: true });

// writeFileSync(`${debugDir}\\mock.json`, JSON.stringify(mockFunctionArgument, null, 2));

export { createTestCase, createTestCaseScenario, removeTestCaseScenario, writeTestCaseFile };