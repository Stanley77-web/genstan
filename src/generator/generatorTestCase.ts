import { ControllerInfo, RequestInfo } from "./type/controllerTypes";
import { MockFunctionArgument, MockArgument } from "./type/mockTypes";
import { Options, Population, Method, Individu, Gen, CoverageInfo, Coverage, FullfilledMember, BestIndividu, QTable, Action, OptimizedIndividu, StateList, CoverageValue, DuplicateRequestInfo } from "./type/generatorTypes";
import { cloneDeep, sample } from 'lodash';
import { randomValue } from "./randomValueGenerator";
import { runTest } from "./runTestCaseJest";
import { createTestCase, createTestCaseScenario, removeTestCaseScenario, writeTestCaseFile } from "./createTestCaseFile";
import { parserSourceCodeInfo } from "./parserSourceCode";
import { writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';

function getSimilarKey (key: string, mockArgument: MockArgument) {
  const keys = Object.keys(mockArgument);

  const similarKeys = keys.find((x) => key.toLowerCase().includes(x.toLowerCase()) || x.toLowerCase().includes(key.toLowerCase()));

  return similarKeys;
};

const initPopulation = (listControllerInfo: ControllerInfo[], mockFunctionArgument: MockFunctionArgument, options: Options) => {
  const populationSize = options.populationSize;
  const population: Population[] = [];

  for (const controller of listControllerInfo) {
    const mockArgument = mockFunctionArgument[controller.name];

    const populationInner: Individu[] = [];

    for (let idx = 0; idx < options.populationSize; idx++) {
      const individu: Individu = {
        id: idx + 1,
        method: [],
      };

      for (const method of controller.methods) {
        const request: Gen[] = [];

        for (let i = 0; i < method.resInfo.length; i++) {
          request.push(generateRandomTestCase(method.reqInfo, mockArgument));
        }

        individu.method.push({
            name: method.name,
            request,
        });
      }

      populationInner.push(individu);
    }

    population.push({
      name: controller.name,
      population: populationInner,
    });
  }

  return population;

  function generateRandomTestCase(reqInfos: RequestInfo[], mockArgument: MockArgument): Gen {
    const request: Gen = [] as Gen;

    for (const reqInfo of reqInfos) {
      const properties: { [key: string]: any } = {};

      for (const property of reqInfo.properties) {
        const key = "string" === typeof property ? property as string : property.name;

        if (key in mockArgument) {
          properties[key] = sample(mockArgument[key]);
        } else {
          const similarKeys = getSimilarKey(key, mockArgument);

          if (similarKeys) {
            properties[key] = sample(mockArgument[similarKeys]);
          } else {
            const value = { type: 'string' };

            properties[key] = randomValue(value);
          }
        }
      }

      request.push({
        name: reqInfo.name,
        properties,
      });
    }

    return request;
  };
};

async function evaluateFitness (listControllerInfo: ControllerInfo[], controllerPopulation: Population[], options: Options): Promise<CoverageInfo[]> {
  const appDir = options.appDir;
  const coverageInfoList: CoverageInfo[] = [];

  for (let idx = 0; idx < options.populationSize; idx++) {

    for (const controllerInfo of listControllerInfo) {
      const population = controllerPopulation.find((x) => x.name === controllerInfo.name)?.population;

      if (population) {
        const individu = population[idx];

        addTestCaseScenario(controllerInfo, individu, appDir);
      }
    }

    const result = await runTest(options);

    coverageInfoList.push(result);
  }

  return coverageInfoList;
};

function addTestCaseScenario (controllerInfo: ControllerInfo, individu: Individu, appDir: string) {
  for (const method of individu.method) {
    const reqInfos = controllerInfo.methods.find((x) => x.name === method.name)?.reqInfo;

    if (reqInfos) {
      for (const reqInfo of reqInfos) {
        const reqInfoName = reqInfo.name;

        const request = method.request.map((x) => x.find((y) => y.name === reqInfoName)?.properties);
        const propertiesValue = request;

        reqInfo.propertiesValue = propertiesValue;
      }
    }
  }

  const testCaseScenarioContent = createTestCaseScenario(controllerInfo);
  const testCaseFileContent = controllerInfo.testCaseContent!! + testCaseScenarioContent;

  writeTestCaseFile(controllerInfo.name, appDir, testCaseFileContent);
}

function maxFitness (coverageInfoList: CoverageInfo[]): CoverageInfo {
  const keys = Object.keys(coverageInfoList[0]);
  const maxCoverageInfo: CoverageInfo = {} as CoverageInfo;

  for (const key of keys) {
    const coverage = coverageInfoList.map((x) => x[key].coverage);
    const maxCoverage = coverage.reduce((a, b) => (evaluateCoverage().coverageValue(a) > evaluateCoverage().coverageValue(b) ? a : b), coverage[0]);
    const idx = coverageInfoList.findIndex((x) => evaluateCoverage().isSameCoverage(x[key].coverage, maxCoverage));

    maxCoverageInfo[key] = {
      idx: idx + 1,
      coverage: maxCoverage,
      unCoveredLines: coverageInfoList[idx][key].unCoveredLines,
    };
  }

  return maxCoverageInfo;
};

const evaluateCoverage = () => {
  return {
    coverageValue: (coverage: Coverage): number => {
      return Object.values(coverage).reduce((a, b) => a + b, 0) / Object.keys(coverage).length;
    },
    isSameCoverage: (coverageX: Coverage, coverageY: Coverage): boolean => {
      return (
        coverageX.statements === coverageY.statements &&
        coverageX.branches === coverageY.branches &&
        coverageX.functions === coverageY.functions &&
        coverageX.lines === coverageY.lines
      );
    },
  };
};

function reachTargetCoverage (controllerPopulation: Population[], listCoverageInfo: CoverageInfo[], maxCoverage: CoverageInfo, options: Options): FullfilledMember[] {
  const targetCoverage = options.targetCoverage;
  const fullfilledMember: FullfilledMember[] = [];

  for (const key of Object.keys(maxCoverage)) {
    const coverage = maxCoverage[key].coverage;

    if (evaluateCoverage().coverageValue(coverage) > targetCoverage) {
      const fullfilledPopulation = controllerPopulation.find((x) => x.name === key)?.population.find((x) => x.id === maxCoverage[key].idx)!!;

      fullfilledMember.push({ name: key, individu: fullfilledPopulation });

      for (const coverageInfo of listCoverageInfo) {
        delete coverageInfo[key];
      }
    }
  }

  return fullfilledMember;
};

function removeReachTargetController (listControllerInfo: ControllerInfo[], controllerPopulation: Population[], maxCoverage: CoverageInfo, listFullfilledMember: FullfilledMember[]): ControllerInfo[] {
  for (const fullfilledMember of listFullfilledMember) {
    const name = fullfilledMember.name;
    const controller = listControllerInfo.find((x) => x.name === name);
    const population = controllerPopulation.find((x) => x.name === name);

    if (controller) {
      listControllerInfo.splice(listControllerInfo.indexOf(controller), 1);
    }

    if (population) {
      controllerPopulation.splice(controllerPopulation.indexOf(population), 1);
    }

    if (name in maxCoverage) {
      delete maxCoverage[name];
    }
  }

  return listControllerInfo;
};

function findBestIndividu (controllerPopulation: Population[], maxCoverage: CoverageInfo): BestIndividu {
  const bestIndividu: BestIndividu = {};

  for (const controller of controllerPopulation) {
    const name = controller.name;
    const population = controller.population;
    const maxCoverageInfo = maxCoverage[name];

    const idx = maxCoverageInfo.idx;

    bestIndividu[name] = population.find((x) => x.id === idx)!!;
  }

  return bestIndividu;
};

const helper = () => {
  return {
    randomRand: (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
};

async function qLearningProcess(listControllerInfo: ControllerInfo[], bestIndividu: BestIndividu, maxCoverage: CoverageInfo, mockFunctionArgument: MockFunctionArgument, options: Options) {
  const qTable = initQTable(bestIndividu, mockFunctionArgument);

  const newQTable = cloneDeep(qTable);

  const controllerNameList = Object.keys(qTable);

  const lenActionTable = Math.max(
    ...Object.values(qTable).map((x) => Object.keys(x).length)
  );

  const stateList: StateList[] = [];

  for (let idxAction = 0; idxAction < lenActionTable; idxAction++) {
    const copyPopulation = cloneDeep(bestIndividu);

    const controllerPopulation: Population[] = [];
    const skipedController: string[] = [];
    const actionController: OptimizedIndividu[] = [];

    for (const controllerName of controllerNameList) {  
      const actionKeys = Object.keys(qTable[controllerName]);

      if (idxAction >= actionKeys.length) {
        skipedController.push(`${controllerName}.spec.js`);
        continue;
      }

      const individu = copyPopulation[controllerName];

      const action: Action = {
        do: actionKeys[idxAction],
        affectedProperties: [],
      };

      const { newIndividu, actionDone } = doAction(action, individu, mockFunctionArgument[controllerName]);

      actionController.push({
        name: controllerName,
        action: actionDone,
      });

      copyPopulation[controllerName] = newIndividu;

      controllerPopulation.push({
        name: controllerName,
        population: [copyPopulation[controllerName]],
      });

      if (!stateList.some((x) => x.name === controllerName)) {
        stateList.push({
          name: controllerName,
          actionList: [],
        });
      }

      const stateListController = stateList.find((x) => x.name === controllerName)!!;

      stateListController.actionList.push({
          action: actionDone, 
          result: newIndividu
      });
    }

    const optionsForCoverage = cloneDeep(options);
    optionsForCoverage.populationSize = 1;
    const skipController = optionsForCoverage.skipController;

    if (skipedController.length > 0) {
      for (const controller of skipedController) {
        if (!skipController.includes(controller)) {
          skipController.push(controller);
        }
      }
    }

    optionsForCoverage.skipController = skipController;

    const result = await evaluateFitness(listControllerInfo, controllerPopulation, optionsForCoverage);

    const coverageInfo = result[0];

    for (const info in coverageInfo) {
      const controllerName = info;
      const actionDo = actionController.find(
        (x) => x.name === controllerName
      )!.action;

      const action = actionDo['do'];

      const uncoveredLines = maxCoverage[info].unCoveredLines;
      const totalUncoveredLines = uncoveredLines.length;

      const newUncoveredLines = coverageInfo[info].unCoveredLines;
      const totalNewUncoveredLines = newUncoveredLines.length;

      const reward = totalUncoveredLines - totalNewUncoveredLines;

      newQTable[controllerName][action] = reward + 0.8 * Math.max(...Object.values(newQTable[controllerName]));
    }
  }

  const optimizedIndividu: OptimizedIndividu[] = [];

  for (const controllerName of controllerNameList) {
    if (Object.keys(newQTable[controllerName]).length === 0) {
      continue;
    }
    const maxReward = Math.max(...Object.values(newQTable[controllerName]));
    if (maxReward <= 0) {
      continue;
    }
    for (const action in newQTable[controllerName]) {
      if (newQTable[controllerName][action] === maxReward) {
        const stateListController = stateList.find((x) => x.name === controllerName)!;
        const actionList = stateListController.actionList;
        const actionDo = actionList.find((x) => x.action.do === action)!;

        if (!optimizedIndividu.some((x) => x.name === controllerName)) {
          optimizedIndividu.push({
            name: controllerName,
            action: actionDo.action,
            result: actionDo.result,
          });
        }
      }
    }
  }

  return optimizedIndividu;

  function initQTable(bestIndividu: BestIndividu, mockFunctionArgument: MockFunctionArgument): QTable {
    const actions = ['change_type', 'edit_object', 'add_properties'];
    const changeTypeActions = ['object', 'string', 'number', 'boolean'];
    const objectTypeActions = ['add_property', 'remove_property', 'change_property'];

    const qTable: QTable = {};

    for (const controllerName in bestIndividu) {
        const methods = bestIndividu[controllerName].method;
        const mockArgument = mockFunctionArgument[controllerName];

        qTable[controllerName] = {};

        for (const method of methods) {
            const requestList = method.request;
            for (const request of requestList) {
                for (const req of request) {
                  const properties = req.properties;
                  const keys = Object.keys(properties);

                  for (const key of keys) {
                    const similiarKeys = getSimilarKey(key, mockArgument);
                    if (!(key in mockArgument) && !similiarKeys) {
                      for (const action of actions) {
                        if (action === 'change_type') {
                          for (const changeType of changeTypeActions) {
                            const state = action + '-' + changeType + '-' + method.name + '-' + req.name + '-' + key;
                            qTable[controllerName][state] = 0;
                          }
                        } else if (action === 'edit_object' && typeof properties[key] === 'object') {
                          for (const objectAction of objectTypeActions) {
                            const state = action + '-' + objectAction + '-' + method.name + '-' + req.name + '-' + key;
                            qTable[controllerName][state] = 0;
                          }
                        }
                      }
                    }
                  }

                  if (keys.length === 0) {
                    const addPropertiesAction = actions[2];

                    const key = 'none';

                    const state = addPropertiesAction + '-' + method.name + '-' + req.name + '-' + key;

                    qTable[controllerName][state] = 0;
                  }
                }
            }
        }
    }

    return qTable;
  }
  
  function doAction(action: Action, individu: Individu, mockArgument: MockArgument): { newIndividu: Individu, actionDone: Action} {
    const actionDo = action['do'];
    const state = actionDo.split('-');
  
    const act = state.slice(0, -3);
    const method = state[state.length - 3];
    const request = state[state.length - 2];
    const key = state[state.length - 1];
  
    const methodInfoIdx = individu.method.findIndex((x) => x.name === method);
    const methodInfo = individu.method[methodInfoIdx];
    const requestList = methodInfo.request;
  
    let affectedProperties: any[] = [];
    let setAffection = false;
  
    if (action.affectedProperties.length > 0) {
      setAffection = true;
    }
  
    if (act[0] === 'change_type') {
      const typeChange = act[1];
  
      const keys = Object.keys(mockArgument);
  
      if (typeChange === 'object') {
        const numProperties = setAffection ? action.affectedProperties.length : helper().randomRand(1, keys.length);
  
        let newValueKeys: string[] = [];
  
        if (setAffection) {
            newValueKeys = action.affectedProperties;
        } else {
            for (let i = 0; i < numProperties; i++) {
              newValueKeys.push(sample(keys)!!);
            }

            for (const newValueKey of newValueKeys) {
              if (!affectedProperties.includes(newValueKey)) {
                affectedProperties.push(newValueKey);
              }
            }
        }

        for (const request of requestList) {
          for (const req of request) {
            const properties = req.properties;
  
            const newValue: { [key: string]: any } = {};
  
            for (const newValueKey of newValueKeys) {
              newValue[newValueKey] = sample(mockArgument[newValueKey]);
            }
  
            properties[key] = newValue;
          }
        }
      } else {
        const randomValueMock: any[] = [];
  
        for (const checkKey of keys) {
          const mockType = typeof mockArgument[checkKey][0];
  
          if (
            (typeChange === 'string' && mockType === 'string') ||
            (typeChange === 'number' && mockType === 'number') ||
            (typeChange === 'boolean' && mockType === 'boolean')
          ) {
            randomValueMock.push(...mockArgument[checkKey]);
          }
        }
  
        for (const request of requestList) {
          for (const req of request) {
            const properties = req.properties;
  
            if (randomValueMock.length > 0) {
              properties[key] = sample(randomValueMock);
            } else {
              properties[key] = randomValue({ type: typeChange });
            }
          }
        }
      }

      individu.method[methodInfoIdx].request = requestList;
    } else if (act[0] === 'edit_object') {
      const objectAction = act[1];
  
      if (objectAction === 'add_property') {
        let addedReqKeys: { idxReq: number, key: string }[] = [];

        if (setAffection) {
          addedReqKeys = action.affectedProperties;
        } else {
          const request = requestList[0];
  
          for (let idxReq = 0; idxReq < request.length; idxReq++) {
            const keys = Object.keys(mockArgument);
  
            if (keys.length > 0) {
              const randomKey = sample(keys)!!;

              addedReqKeys.push({
                idxReq: idxReq,
                key: randomKey,
              });
  
              if (!affectedProperties.some((x: any) => x.key === randomKey)) {
                affectedProperties.push({
                  idx_req: idxReq,
                  key: randomKey,
                });
              }
            }
          }
        }
  
        for (const request of requestList) {
          for (const req of request) {
            const properties = req['properties'];
            const addedReqKey = addedReqKeys.find((x: any) => x.idx_req === req['name']);
  
            if (addedReqKey) {
              properties[addedReqKey.key] = sample(mockArgument[addedReqKey.key]);
            }
          }
        }
      } else if (objectAction === 'remove_property') {
        let removedReqKeys: { idxReq: number, key: string }[] = [];
        
        if (setAffection) {
          removedReqKeys = action.affectedProperties;
        } else {
          const request = requestList[0];
  
          for (let idxReq = 0; idxReq < request.length; idxReq++) {
            const req = request[idxReq];
            const properties = req['properties'];
            const keys = Object.keys(properties);
  
            if (keys.length > 0) {
              const randomKey = sample(keys)!!;
              removedReqKeys.push({
                idxReq: idxReq,
                key: randomKey,
              });
  
              if (!affectedProperties.some((x: any) => x.key === randomKey)) {
                affectedProperties.push({
                  idx_req: idxReq,
                  key: randomKey,
                });
              }
            }
          }
        }
  
        for (const request of requestList) {
          for (let idxReq = 0; idxReq < request.length; idxReq++) {
            const req = request[idxReq];
            const properties = req.properties;
            const removedReqKey = removedReqKeys.find((x: any) => x.idx_req === idxReq);
  
            if (removedReqKey) {
              delete properties[removedReqKey.key];
            }
          }
        }
      } else if (objectAction === 'change_property') {
        let changedReqKeys: { idxReq: number, oldKey: string, newKey: string }[] = [];

        if (setAffection) {
          changedReqKeys = action.affectedProperties;
        } else {
          const request = requestList[0];
  
          for (let idxReq = 0; idxReq < request.length; idxReq++) {
            const req = request[idxReq];
            const properties = req.properties;
            const oldKeys = Object.keys(properties);
            const newKeys = Object.keys(mockArgument);
  
            if (oldKeys.length > 0) {
              const oldKey = sample(oldKeys)!!;
              const newKey = sample(newKeys)!!;
              changedReqKeys.push({
                idxReq: idxReq,
                oldKey: oldKey,
                newKey: newKey,
              });
  
              const isExist = changedReqKeys.some((x: any) =>x.old_key === oldKey && x.new_key === newKey);
  
              if (!isExist) {
                affectedProperties.push({
                  idx_req: idxReq,
                  old_key: oldKey,
                  new_key: newKey,
                });
              }
            }
          }
        }
  
        for (const request of requestList) {
          for (const req of request) {
            const properties = req.properties;
            const changedReqKey = changedReqKeys.find((x: any) => x.idx_req === req['name']);
  
            if (changedReqKey) {
              properties[changedReqKey.oldKey] = sample(mockArgument[changedReqKey.newKey]);
            }
          }
        }
      }
    } else if (act[0] === 'add_properties') {
      let addedPropertiesKeys: string = '';
  
      if (setAffection) {
        addedPropertiesKeys = action.affectedProperties[0];
      } else {
        if (request in mockArgument) {
          addedPropertiesKeys = request;
  
          if (!affectedProperties.includes(addedPropertiesKeys)) {
            affectedProperties.push(addedPropertiesKeys);
          }
        } else {
          const similarKey = getSimilarKey(request, mockArgument);
  
          if (similarKey) {
            addedPropertiesKeys = similarKey;
  
            if (!affectedProperties.includes(addedPropertiesKeys)) {
              affectedProperties.push(addedPropertiesKeys);
            }
          }
        }
      }
  
      const argument = mockArgument[addedPropertiesKeys];
  
      for (const requestObj of requestList) {
        for (const req of requestObj) {
          if (req['name'] === request) {
            const choices = sample(argument);
  
            const properties: { [key: string]: any } = {};
  
            if (typeof choices === 'object') {
              for (const newKey in choices) {
                properties[newKey] = choices[newKey];
              }
            } else {
              properties[addedPropertiesKeys] = choices;
            }
  
            req['properties'] = properties;
          }
        }
      }
    }
  
    action.affectedProperties = affectedProperties;
  
    return { newIndividu: individu, actionDone: action };
  }
};

async function swapPopulation(listControllerInfo: ControllerInfo[], controllerPopulation: Population[], improvedIndividu: OptimizedIndividu[], options: Options): Promise<{ resultPopulation: Population[], coverageInfo: CoverageInfo[] }> {
  for (const controller of controllerPopulation) {
    const controllerName = controller.name;
    const population = controller.population;

    const optimizedIndividu = improvedIndividu.find((x) => x.name === controllerName);

    if (optimizedIndividu) {
      const result = optimizedIndividu['result']!!;
  
      const idx = result['id'];
  
      for (let idxPop = 0; idxPop < population.length; idxPop++) {
        if (population[idxPop]['id'] === idx) {
          population[idxPop] = result;
          break;
        }
      }
    }
  }

  const coverageInfo = await evaluateFitness(listControllerInfo, controllerPopulation, options);

  const resultPopulation = controllerPopulation;

  return { resultPopulation, coverageInfo };
};

function geneticProcess (controllerPopulation: Population[], listCoverageInfo: CoverageInfo[], mockFunctionArgument: MockFunctionArgument, options: Options): Population[] {
  const populationSize = options.populationSize;
  const childernPopulationController: Population[] = [];

  for (const controller of controllerPopulation) {
    const name = controller.name;
    const coverageInfo: CoverageValue[] = listCoverageInfo.map((x) => x[name]);
    const mockArgument = mockFunctionArgument[name];

    const population = controller.population;

    let parent1: Individu;
    let parent2: Individu;

    do {
      parent1 = rouletteWheelSelection(population, coverageInfo)!!;
      parent2 = rouletteWheelSelection(population, coverageInfo)!!;
    } while (parent1 === parent2);

    const childrenPopulation: Individu[] = [];

    for (let idx = 0; idx < populationSize; idx++) {
      const { childrenChromosome1, childrenChromosome2 } = crossover(parent1, parent2);

      childrenPopulation.push({
        id: idx + 1,
        method: mutate(childrenChromosome1, mockArgument),
      });
      childrenPopulation.push({
        id: idx + 2,
        method: mutate(childrenChromosome2, mockArgument),
      });
    }

    childernPopulationController.push({
      name,
      population: childrenPopulation,
    });
  }

  return childernPopulationController;

  function rouletteWheelSelection (population: Individu[], coverageInfo: CoverageValue[]) {
    const coverage = coverageInfo.map((x) => x.coverage);
    const totalFitness = coverage.reduce((a, b) => a + evaluateCoverage().coverageValue(b), 0);
    const selectionProbs = coverage.map((x) => evaluateCoverage().coverageValue(x) / totalFitness);
    const roulettePosition = Math.random();
    let cumulativeProb = 0;
  
    for (let idx = 0; idx < selectionProbs.length; idx++) {
      cumulativeProb += selectionProbs[idx];

      if (roulettePosition <= cumulativeProb) {
        return cloneDeep(population[idx]);
      }
    }
  };

  function crossover (parent1: Individu, parent2: Individu): { childrenChromosome1: Method[], childrenChromosome2: Method[] }{
    const lenMethod = parent1.method.length;
    const childrenChromosome1: Method[] = [];
    const childrenChromosome2: Method[] = [];

    // console.log(parent1.method.length);
    // console.log(parent2.method.length);

    for (let idxMethod = 0; idxMethod < lenMethod; idxMethod++) {
      const lenRequest = parent1.method[idxMethod].request.length;
      const chromosome1 = cloneDeep(parent1.method[idxMethod]);
      const chromosome2 = cloneDeep(parent2.method[idxMethod]);

      const request1 = chromosome1.request;
      const request2 = chromosome2.request;

      const duplicateRequest1 = findDuplicateRequestValue(request1);
      const duplicateRequest2 = findDuplicateRequestValue(request2);

      const idxDuplicateRequest1 = duplicateRequest1.map((x) => x.idxReqList);
      const idxDuplicateRequest2 = duplicateRequest2.map((x) => x.idxReqList);

      const nonDuplicateRequest1 = idxDuplicateRequest1.filter((x) => !idxDuplicateRequest2.includes(x));
      const nonDuplicateRequest2 = idxDuplicateRequest2.filter((x) => !idxDuplicateRequest1.includes(x));

      for (const duplicateInfo1 of duplicateRequest1) {
        const idxNonDuplicate = nonDuplicateRequest2.length > 0 ? nonDuplicateRequest2[helper().randomRand(0, nonDuplicateRequest2.length - 1)] : Math.floor(helper().randomRand(0, lenRequest - 1));

        const idxReqList = duplicateInfo1.idxReqList;
        const idxReq = duplicateInfo1.idxReq;
        const key = duplicateInfo1.properties;

        if (request2[idxNonDuplicate][idxReq].properties[key]) {
          request1[idxReqList][idxReq].properties[key] = request2[idxNonDuplicate][idxReq].properties[key];
        } else {
          request1[idxReqList][idxReq].properties[key] = null;
        }
      }

      for (const duplicateInfo2 of duplicateRequest2) {
        const idxNonDuplicate = nonDuplicateRequest1.length > 0 ? nonDuplicateRequest1[helper().randomRand(0, nonDuplicateRequest1.length - 1)] : Math.floor(helper().randomRand(0, lenRequest - 1));

        const idxReqList = duplicateInfo2.idxReqList;
        const idxReq = duplicateInfo2.idxReq;
        const key = duplicateInfo2.properties;

        if (request1[idxNonDuplicate][idxReq].properties[key]) {
          request2[idxReqList][idxReq].properties[key] = request1[idxNonDuplicate][idxReq].properties[key];
        } else {
          request2[idxReqList][idxReq].properties[key] = null;
        }
      }

      childrenChromosome1.push({
        name: chromosome1.name,
        request: request1,
      });
      childrenChromosome2.push({
        name: chromosome2.name,
        request: request2,
      });
    }

    return { childrenChromosome1, childrenChromosome2 };
  };

  function mutate (individuChromosome: Method[], mockArgument: MockArgument) {
    const newIndividuChromosome = cloneDeep(individuChromosome);

    for (const chromosome of newIndividuChromosome) {
        const chromosomeRequest = chromosome.request;

        const duplicateRequest = findDuplicateRequestValue(chromosomeRequest);

        for (const duplicateInfo of duplicateRequest) {
            const idxReqList = duplicateInfo.idxReqList;
            const idxReq = duplicateInfo.idxReq;
            const key = duplicateInfo.properties;

            if (key in mockArgument) {
                chromosomeRequest[idxReqList][idxReq].properties[key] = sample(mockArgument[key]);
            } else {
              const similarKeys = getSimilarKey(key, mockArgument);

              if (similarKeys) {
                chromosomeRequest[idxReqList][idxReq].properties[key] = sample(mockArgument[similarKeys]);
              }
            }
        }

        if (duplicateRequest.length === 0) {
          const idxMutate = helper().randomRand(0, chromosomeRequest.length - 1);

          if (chromosomeRequest[idxMutate].length !== 0) {
            const idxReqMutate = helper().randomRand(0, chromosomeRequest[idxMutate].length - 1);

            if (Object.keys(chromosomeRequest[idxMutate][idxReqMutate].properties).length !== 0) {
              const keyMutate = Object.keys(chromosomeRequest[idxMutate][idxReqMutate].properties)[0];
  
              if (keyMutate in mockArgument) {
                  chromosomeRequest[idxMutate][idxReqMutate].properties[keyMutate] = sample(mockArgument[keyMutate]);
              } else {
                  const similarKeys = getSimilarKey(keyMutate, mockArgument);
  
                if (similarKeys) {
                  chromosomeRequest[idxMutate][idxReqMutate].properties[keyMutate] = sample(mockArgument[similarKeys]);
                }
              }
            }
          }
        }
    }

    return newIndividuChromosome;
  };

  function findDuplicateRequestValue (requestList: Gen[]) {
    const duplicateRequest: DuplicateRequestInfo[] = [];

    for (let idxReqList = 0; idxReqList < requestList.length; idxReqList++) {
      for (let idxReq = 0; idxReq < requestList[idxReqList].length; idxReq++) {
        for (const [key, val] of Object.entries(requestList[idxReqList][idxReq].properties)) {
          for (let idxReqList2 = 0; idxReqList2 < requestList.length; idxReqList2++) {
            if (idxReqList !== idxReqList2) {
              if (isSameProperties(val, requestList[idxReqList2][idxReq].properties[key])) {
                if (!duplicateRequest.some((x) => x.idxReqList === idxReqList && x.idxReq === idxReq && x.properties === key)) {
                  duplicateRequest.push({
                    idxReqList: idxReqList,
                    idxReq: idxReq,
                    properties: key,
                  });
                }
              }
            }
          }
        }
      }
    }

    return duplicateRequest;

    function isSameProperties (properties1: any, properties2: any): boolean {
      if (typeof properties1 === typeof properties2) {
        if (typeof properties1 === 'object') {
          return JSON.stringify(properties1) === JSON.stringify(properties2);
        } else if (typeof properties1 === 'string') {
          return properties1.toString() === properties2.toString();
        } else if (typeof properties1 === 'number' || typeof properties1 === 'boolean') {
          return properties1 === properties2;
        } else if (typeof properties1 === 'object' && properties1.length !== undefined) {
          if (properties1.length === properties2.length) {
            for (let idx = 0; idx < properties1.length; idx++) {
              if (properties1[idx] !== properties2[idx]) {
                return false;
              }
            }
            return true;
          }
        }
      }
      return false;
    }
  };
};

async function generateTestCase(listControllerInfo: ControllerInfo[], mockFunctionArgument: MockFunctionArgument, options: Partial<Options> = {}): Promise<void> {
  const defaultOption: Options = {
    populationSize: options.populationSize ?? 10,
    maxIteration: options.maxIteration ?? 10,
    qLearningInterval: options.qLearningInterval ?? 3,
    targetCoverage: options.targetCoverage ?? 80,
    appDir: options.appDir ?? `${__dirname}\\app`,
    testPath: options.testPath ?? `${__dirname}\\app\\src\\tests\\`,
    skipController: options.skipController ?? [],
  };

  let listControllerInfoCopy = cloneDeep(listControllerInfo);

  // Initialize population
  let controllerPopulation = initPopulation(listControllerInfoCopy, mockFunctionArgument, defaultOption);
  
  let generationCount = 0;

  const fullfilledMemberList: FullfilledMember[] = [];

  while (true) {
    let coverageInfoList = await evaluateFitness(listControllerInfoCopy, controllerPopulation, defaultOption);

    // Find the member that has the highest coverage
    const maxCoverage = maxFitness(coverageInfoList);
    // Check the member that has the highest coverage reach the target coverage
    const fullfilledMember = reachTargetCoverage(controllerPopulation, coverageInfoList, maxCoverage, defaultOption);

    if (fullfilledMember) {
      const skipController = defaultOption.skipController ?? [];

      for (const member of fullfilledMember) {
        if (!skipController.includes(member.name)) {
          skipController.push(member.name + ".spec.js");
        }
      }

      defaultOption.skipController = skipController;
          
      fullfilledMemberList.push(...fullfilledMember);
    }

    listControllerInfoCopy = removeReachTargetController(listControllerInfoCopy, controllerPopulation, maxCoverage, fullfilledMemberList);

    if (listControllerInfoCopy.length === 0) {
      console.log("All controller has reach the target coverage");
      break;
    }

    if (generationCount === defaultOption.maxIteration) {
      for (const controller of listControllerInfoCopy) {
        const controllerName = controller.name;

        const population = controllerPopulation.find(x => x.name === controllerName)!.population;

        const individu = population[maxCoverage[controllerName].idx!! - 1];

        fullfilledMemberList.push({
          name: controllerName,
          individu: individu
        });
      }
      
      console.log("Max iteration has reached");
      break;
    }

    let improvedControllerPopulation;

    if (generationCount % defaultOption.qLearningInterval === 0) {
      const bestIndividu = findBestIndividu(controllerPopulation, maxCoverage);

      const improvedIndividu = await qLearningProcess(listControllerInfoCopy, bestIndividu, maxCoverage, mockFunctionArgument, defaultOption);

      const { resultPopulation, coverageInfo } = await swapPopulation(listControllerInfoCopy, controllerPopulation, improvedIndividu, defaultOption);

      improvedControllerPopulation = resultPopulation;
      coverageInfoList = coverageInfo;
    } else {
      improvedControllerPopulation = controllerPopulation;
    }

    const newControllerPopulation = geneticProcess(improvedControllerPopulation, coverageInfoList, mockFunctionArgument, defaultOption);

    controllerPopulation = newControllerPopulation;

    generationCount++;
  }

  for (const fullfilledMember of fullfilledMemberList) {
    const controller = listControllerInfo.find((x) => x.name === fullfilledMember.name);

    if (controller) {
      addTestCaseScenario(controller, fullfilledMember.individu, defaultOption.appDir);
    }
  }
}

// const appDir = "D:\\Stanley\\Kuliah\\Akademik\\TA\\src\\Open Source Web\\Test Case Generator\\supply_chain_application";

// const options: Partial<Options> = {
//   populationSize: 6,
//   maxIteration: 10,
//   qLearningInterval: 3,
//   targetCoverage: 80,
//   appDir,
//   testPath: `${appDir}\\src\\tests\\`,
//   skipController: [],
// };

// const listControllerInfo = parserSourceCodeInfo(appDir);
// const mockFunctionArgument = createTestCase(listControllerInfo, appDir);

// for (const controller of controllerInfoList) {
//   console.log(controller.testCaseContent);
// }

// writeFileSync('mock.json', JSON.stringify(mockFunctionArgument, null, 2));

// generateTestCase(listControllerInfo, mockFunctionArgument, options).then(() => {
//   console.log("Done");
// }).catch((err) => {
//   console.log(err);
// });

export { generateTestCase };