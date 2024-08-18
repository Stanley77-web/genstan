import { readdirSync, readFileSync, writeFileSync } from 'fs';
import {
    createSourceFile,
    ScriptTarget,
    ScriptKind,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isVariableStatement,
    isObjectLiteralExpression,
    isArrowFunction,
    isCallExpression,
    isTryStatement,
    isAwaitExpression,
    isObjectBindingPattern,
    CallExpression,
    ObjectLiteralElementLike,
    NodeArray,
    Statement,
    isPropertyAccessExpression,
    isExpressionStatement,
    isBinaryExpression,
    isReturnStatement,
    isIfStatement,
    Expression,
    Node,
    isBlock,
    isAsExpression,
    isConditionalExpression,
    isClassDeclaration,
    isMethodDeclaration
} from 'typescript';
import { ControllerInfo, ImportInfo, MethodInfo, RequestInfo, CallInfo } from '../type/controllerTypes';
import { trim } from "lodash";

function parserSourceCodeInfo (appDir: string, controllerPath: string = 'src/controllers'): ControllerInfo[] {
    const path = `${appDir}\\${controllerPath}`;
    const controllerFiles = readdirSync(path);

    const controllersInfo = [] as ControllerInfo[];

    for (let file of controllerFiles) { 
        const info = {
            name: file.split('.')[0],
            type: '',
            imports: [] as ImportInfo[],
            methods: [] as MethodInfo[],
            callLibs: [] as CallInfo[]
        };

        if (file !== 'AuthController.ts') {
            continue;
        }
    
        const involvedLibraries = [] as string[];
        const outputList = [] as string[];
    
        const sourceCode = readFileSync(`${path}\\${file}`, 'utf-8');
        const sourceFile = createSourceFile(file, sourceCode, ScriptTarget.Latest, true, ScriptKind.TS);
        const statements = sourceFile.statements;
    
        for (let statement of statements) {
            // Parse Import Statement to get the library and module info
            importParser(statement);
            controllerParser(statement);
        }

        console.log(outputList);

        controllersInfo.push(info);

        function importParser (statement: Node) {
            if (isImportDeclaration(statement)) {
                const library: string[] = [];

                let type = 'identifierImport';
        
                if (statement.importClause?.namedBindings) {
                    statement.importClause.namedBindings.forEachChild((node) => {
                        library.push(node.getText());
                    });

                    type = 'namedImport';
                }
        
                if (statement.importClause?.name) {
                    library.push(statement.importClause.name.getText());
                }
    
                involvedLibraries.push(...library);
    
                info.imports.push({
                    library,
                    module: trim(trim(statement.moduleSpecifier.getText(), '"'), "\""),
                    type
                });
            } else if (isImportEqualsDeclaration(statement)) {
                involvedLibraries.push(statement.name.getText());
    
                info.imports.push({
                    library: [statement.name.getText()],
                    module: trim(trim(statement.moduleReference.getText(), '"'), "\""),
                    type: 'identifierImport'
                });
            } else if (isVariableStatement(statement) || isExpressionStatement(statement)) {
                if (isVariableStatement(statement)) {
                    statement.declarationList.declarations.forEach((declaration) => {
                        const declarartionName = declaration.name as Expression;
                        const declarartionInitializer = declaration.initializer;
    
                        callParse(declarartionName, declarartionInitializer!!);
                    });
                } else {
                    if (isBinaryExpression(statement.expression)) {
                        const declarartionName = statement.expression.left;
                        const declarartionInitializer = statement.expression.right;
    
                        callParse(declarartionName, declarartionInitializer);
                    }
                }
    
                function callParse(name: Expression, initializer: Expression) {
                    if (isCallExpression(initializer)) {
                        involvedLibraries.push(initializer.expression.getText());
    
                        if (initializer.expression.getText() === 'require') {
                            info.imports.push({
                                library: [name.getText()],
                                module: trim(trim(initializer.arguments[0].getText(), '"'), "\""),
                                type: 'identifierImport'
                            });
                        }
                    }
                }
            }
        }
    
        function controllerParser (statement: Node) {
            // Variable Statement (ex: const { phoneNumber, password } = req.body;)
            if (isVariableStatement(statement) || isExpressionStatement(statement)) {
                if (isVariableStatement(statement)) {
                    statement.declarationList.declarations.forEach((declaration) => {
                        const declarartionInitializer = declaration.initializer;
                    
                        // Controller by Object Literal Expression (ex: const ManufacturerController = {})
                        objectLiteralParse(declarartionInitializer!!);
                    });
                } else {
                    if (isBinaryExpression(statement.expression)) {
                        const declarartionInitializer = statement.expression.right;
    
                        // Controller by Object Literal Expression (ex: const ManufacturerController = {})
                        objectLiteralParse(declarartionInitializer);
                    }
                }
    
                function objectLiteralParse(initializer: Expression) {
                    if (isObjectLiteralExpression(initializer)) {
                        info.type = 'Object';

                        initializer.properties.forEach((property) => {
                            // Controller Property (ex: createUser: "createUser")
                            property.forEachChild((child) => {
                                // Method Controller (ex: createUser: async (req: Request, res: Response) => {})
                                methodParser(child);
                            });
                        });
                    }
                }
            } else if (isClassDeclaration(statement)) {
                info.type = 'Class';

                statement.members.forEach((member) => {
                    methodParser(member);
                });
            }
        }
        
        function methodParser (statement: Node) {    
            if (isArrowFunction(statement)) {
                const functionName = statement.parent as ObjectLiteralElementLike;
    
                const methodInfo = {
                    name: functionName.name?.getText() as string,
                    parameters: statement.parameters.map((parameter) => parameter.name.getText()),
                    reqInfo: [] as RequestInfo[],
                    resInfo: [] as RequestInfo[][]
                };
                
                // Function Block (ex: login: async (req: Request, res: Response) => {})
                statement.body.forEachChild((functionBlock) => {
    
                    // Try Statement (ex: try {})
                    if (isTryStatement(functionBlock)) {
                        const tryStatements = functionBlock.tryBlock.statements;
                        const catchStatements = functionBlock.catchClause?.block.statements;
                        const finallyStatements = functionBlock.finallyBlock?.statements;
    
                        blockParser(tryStatements, methodInfo);
                        blockParser(catchStatements!!, methodInfo);
                        blockParser(finallyStatements!!, methodInfo);
                    }
                });

                if (isBlock(statement.body!!)) {
                    blockParser(statement.body.statements, methodInfo);
                }
    
                info.methods.push(methodInfo);
            } else if (isMethodDeclaration(statement)) {
                const methodInfo = {
                    name: statement.name.getText(),
                    parameters: statement.parameters.map((parameter) => parameter.name.getText()),
                    reqInfo: [] as RequestInfo[],
                    resInfo: [] as RequestInfo[][]
                };

                // console.log(statement.body?.getText());

                // Function Block (ex: login: async (req: Request, res: Response) => {})
                statement.body?.forEachChild((functionBlock) => {
                    // Try Statement (ex: try {})
                    if (isTryStatement(functionBlock)) {
                        const tryStatements = functionBlock.tryBlock.statements;
                        const catchStatements = functionBlock.catchClause?.block.statements;
                        const finallyStatements = functionBlock.finallyBlock?.statements;
    
                        blockParser(tryStatements, methodInfo);
                        blockParser(catchStatements!!, methodInfo);
                        blockParser(finallyStatements!!, methodInfo);
                    }
                });

                blockParser(statement.body!!.statements, methodInfo);

                info.methods.push(methodInfo);
            }
        }
    
        function blockParser (statements: NodeArray<Statement>, method: MethodInfo) {
            if (!statements) {
                return;
            }
    
            for (const statement of statements) {
                requestParser(statement, method);
                callLibraryParse(statement);
                responseParser(statement, method);
    
                if (isIfStatement(statement)) {
                    if (isBlock(statement.thenStatement)) {
                        blockParser(statement.thenStatement.statements, method);
                    } 
    
                    if (statement.elseStatement && isBlock(statement.elseStatement)) {
                        blockParser(statement.elseStatement?.statements, method);
                    }
                }
            }
        }
    
        function callLibraryParse (statement: Node) {

            if (isVariableStatement(statement) || isExpressionStatement(statement)) {
                if (isVariableStatement(statement)) {

                    // statement.getChildren().forEach((child) => {
                    //     console.log(child.getText());
                    //     console.log(child.kind);
                    // });
   
                    statement.declarationList.declarations.forEach((declaration) => {
                        const declarartionInitializer = declaration.initializer;
                        const output = declaration.name.getText();

                        awaitParse(declarartionInitializer!!, output);
                        expressionParse(declarartionInitializer!!, output);
                    });
                } else {
                    // console.log(statement.getText());
                    if (isBinaryExpression(statement.expression)) {
                        const declarartionInitializer = statement.expression.right;
                        let output = statement.expression.left.getText();

                        if (output.includes('.')) {
                            output = output.split('.').pop() as string;
                        }
    
                        awaitParse(declarartionInitializer, output);
                        expressionParse(declarartionInitializer, output);
                    } else if (isAwaitExpression(statement.expression)) {
                        awaitParse(statement.expression);
                        expressionParse(statement.expression);
                    }

                    expressionParse(statement.expression);
                }
            } else if (isAwaitExpression(statement)) {
                awaitParse(statement.expression);
            }
    
            // Parsing Await Expression (call library function)
            function awaitParse (initializer: Expression, output: string = '') {
                if (isAwaitExpression(initializer)) {
                    if (isCallExpression(initializer.expression)) {
                        callParse(initializer.expression, output, true);
                    }
                }
            }

            function expressionParse (expression: Expression, output: string = '') {
                if (isCallExpression(expression)) {
                    // console.log(expression.getText());
                    // console.log(expression.kind);
                    callParse(expression, output);
                } 
            }

            function callParse (expression: CallExpression, output: string, isAsync: boolean = false) {
                if (isCallExpression(expression)) {
                    let callExpression = expression;

                    let argument = false;
    
                    // Check if the call expression is a library function                       
                    const callLibrary = involvedLibraries.find((lib) => {
                        const libName = callExpression.expression.getText().split('.')[0].toLowerCase();

                        if (libName === lib.toLowerCase()) {
                            return true;
                        }

                        // Check if the argument is a library function
                        for (const arg of callExpression.arguments) {
                            if (arg.getText().toLowerCase().includes(lib.toLowerCase())) {
                                argument = true;
                                return true;
                            }
                        }

                        return false;
                    });
    
                    if (callLibrary && !argument) {
                        if (output !== '') {
                            outputList.push(output);
                        }

                        const maxDepth = 5;
                        let depth = 0;
    
                        const nextFunction = ['then'];
    
                        while (nextFunction.find(x => callExpression.getText().includes(x)) && depth < maxDepth) {
                            if (isPropertyAccessExpression(callExpression.expression)) {
                                callExpression = callExpression.expression.expression as CallExpression;
                            }
                            depth++;
                        }
    
                        info.callLibs.push({
                            library: callLibrary,
                            function: isPropertyAccessExpression(callExpression.expression) ? callExpression.expression.name?.getText() : callExpression.expression.getText(),
                            arguments: callExpression.arguments.map((argument) => {
                                if (isObjectLiteralExpression(argument)) {
                                    return argument.properties.map((property) => {
                                        return property.name?.getText();
                                    });
                                }
                                return argument.getText();
                            }).flat() as string[],
                            isAsync
                        });
                    } else if (callLibrary && argument) {
                        if (output !== '') {
                            outputList.push(output);
                        }

                        for (const argument of callExpression.arguments) {
                            if (isArrowFunction(argument)) {
                                const statement = argument.body as Node;

                                if (isCallExpression(statement)) {
                                    info.callLibs.push({
                                        library: callLibrary,
                                        function: isPropertyAccessExpression(statement.expression) ? statement.expression.name?.getText() : statement.expression.getText(),
                                        arguments: statement.arguments.map((argument) => {
                                            if (isObjectLiteralExpression(argument)) {
                                                return argument.properties.map((property) => {
                                                    return property.name?.getText();
                                                });
                                            }
                                            return argument.getText();
                                        }).flat() as string[],
                                        isAsync
                                    });
                                }
                            }
                        }
                    }
                } 
            }
        }
    
        function requestParser (statement: Node, method: MethodInfo) {
            if (isVariableStatement(statement) || isExpressionStatement(statement)) {
                if (isVariableStatement(statement)) {
                    statement.declarationList.declarations.forEach((declaration) => {
                        const declarartionName = declaration.name as Expression;
                        const declarartionInitializer = declaration.initializer;
                        
                        // Controller by Object Literal Expression (ex: const ManufacturerController = {})
                        // Request Info (ex: const userObj = req.body.userObj;)
                        propertiesAccessParse(declarartionName, declarartionInitializer!!);
                        // Request Info (ex: const userId = String(req.params.userId);)
                        callExpressionParse(declarartionName, declarartionInitializer!!);
                        // Request Info (ex: const userId = req.params.userId as User;)
                        asExpressionParse(declarartionName, declarartionInitializer!!);
                    });
                } else {
                    if (isBinaryExpression(statement.expression)) {
                        const declarartionName = statement.expression.left;
                        const declarartionInitializer = statement.expression.right;
    
                        // Controller by Object Literal Expression (ex: const ManufacturerController = {})
                        // Request Info (ex: const userObj = req.body.userObj;)
                        propertiesAccessParse(declarartionName, declarartionInitializer);
                        // Request Info (ex: const userId = String(req.params.userId);)
                        callExpressionParse(declarartionName, declarartionInitializer);
                        // Request Info (ex: const userId = req.params.userId as User;)
                        asExpressionParse(declarartionName, declarartionInitializer);
                    }
                }
    
                function propertiesAccessParse(name: Expression, initializer: Expression) {
                    if (isPropertyAccessExpression(initializer)) {
                        const splitIntializer = initializer.getText().split('.');
                        const reqLock = splitIntializer[0];

                        if (method.parameters.includes(reqLock.toLowerCase())) {
                            let reqInfo = {} as RequestInfo;

                            if (isObjectBindingPattern(name)) {
                                reqInfo.name = initializer.name?.getText();
                                reqInfo.properties = name.elements.map((element) => element.name.getText());
                            } else {
                                reqInfo.name = splitIntializer[1];
                                reqInfo.properties = splitIntializer[2] ? [splitIntializer[2]] : [];
                            }
                
                            method.reqInfo.push(reqInfo);
                        }
                    }
                }

                function callExpressionParse (name: Expression, initializer: Expression) {
                    if (isCallExpression(initializer)) {
                        const argument = initializer.arguments[0];
                        const argumentSplit = argument.getText().split('.');
                        const reqLock = argumentSplit[0];

                        if (method.parameters.includes(reqLock.toLowerCase())) {
                            const reqInfo = {
                                name: argumentSplit[1],
                                properties: argumentSplit[2] ? [argumentSplit[2]] : []
                            };
    
                            method.reqInfo.push(reqInfo);
                        }
                    }
                }

                function asExpressionParse (name: Expression, initializer: Expression) {
                    if (isAsExpression(initializer)) {
                        const expression = initializer.expression.getText();
                        const expressionSplit = expression.split('.');
                        const reqLock = expressionSplit[0];

                        if (method.parameters.includes(reqLock.toLowerCase())) {
                            const reqInfo = {
                                name: expressionSplit[1],
                                properties: expressionSplit[2] ? [expressionSplit[2]] : []
                            };
    
                            method.reqInfo.push(reqInfo);
                        }
                    }
                }
            }
        }
    
        function responseParser (statement: Node, method: MethodInfo) {
            if (isReturnStatement(statement)) {
                // console.log(statement.expression?.getText())
                // console.log(statement.expression?.kind)
                if (method.parameters.find(parameter => {
                    const response = statement.expression?.getText().split('.')[0].toLowerCase();
    
                    return response === parameter;
                })) {
                    returnCallExpressionParse(statement.expression!!);
                } else if (method.parameters.find(parameter => {
                    return statement.expression?.getText().toLowerCase().includes(parameter);
                })) {
                    if (isConditionalExpression(statement.expression!!)) {
                        conditionReturnParse(statement.expression);
                    }

                }
            }

            function conditionReturnParse(statement: Node) {
                if (isConditionalExpression(statement)) {
                    if (method.parameters.find(parameter => {
                        return statement.whenTrue.getText().split('.')[0].toLowerCase() === parameter;
                    })) {
                        returnCallExpressionParse(statement.whenTrue);
                    }

                    if (method.parameters.find(parameter => {
                        return statement.whenFalse.getText().split('.')[0].toLowerCase() === parameter;
                    })) {
                        returnCallExpressionParse(statement.whenFalse);
                    } else {
                        if (method.parameters.find(parameter => {
                            return statement.whenFalse.getText().toLowerCase().includes(parameter);
                        })) {
                            conditionReturnParse(statement.whenFalse);
                        }
                    }
                }
            }

            function returnCallExpressionParse (expression: Expression) {
                if (isCallExpression(expression)) {
                    const maxDepth = 5;
                    let depth = 0;

                    let resExpression = expression;
    
                    const resList = [] as RequestInfo[];
    
                    while (resExpression.getText() !== 'res' && depth < maxDepth) {
                        resList.push({
                            name: isPropertyAccessExpression(resExpression.expression) ? resExpression.expression.name?.getText() : resExpression.expression.getText(),
                            properties: resExpression.arguments.map((argument) => {
                                if (isObjectLiteralExpression(argument)) {
                                    return argument.properties.map((property) => {
                                        return property.name?.getText();
                                    });
                                }
                                return argument.getText();
                            }).flat() as string[]
                        });
    
                        if (isPropertyAccessExpression(resExpression.expression)) {
                            resExpression = resExpression.expression.expression as CallExpression;
                        }
                        depth++;
                    }
    
                    method.resInfo.push(resList);
                }
            }
        }
    }

    return controllersInfo;
};

const appDir = "D:/Stanley/Kuliah/Akademik/TA/src/Open Source Web/Test Case Generator/supply_chain_application";
// const appDir = "D:\\Stanley\\Kuliah\\Akademik\\TA\\Test";

const controllerInfoList = parserSourceCodeInfo(appDir);

// const debugDir = 'C:\\Users\\acer\\.vscode\\extensions\\genstan\\src\\generator\\debug';

// writeFileSync(`${debugDir}\\controllerInfo.json`, JSON.stringify(controllerInfoList, null, 2));

export { parserSourceCodeInfo };