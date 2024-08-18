// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { parserSourceCodeInfo } from './generator/preprocessing/parserSourceCode';
import { generateTestCase } from './generator/generateTestCase/generatorTestCase';
import { createTestCase } from './generator/preprocessing/createTestCaseFile';
import { createMockFile } from './generator/preprocessing/createMockFile';
import { createInputFieldHtml } from './view/inputField';
import { Options } from './generator/type/generatorTypes';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// const parserDisposable = vscode.commands.registerCommand('genstan.parserSourceCode', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	vscode.window.showInputBox({
	// 		placeHolder: 'Enter the path of the file you want to parse',
	// 		validateInput: (text: string) => {
	// 			if (text === '') {
	// 				return 'Please enter a path';
	// 			}
	// 			return null;
	// 		}
	// 	}).then((path) => {
	// 		if (path) {
	// 			vscode.window.showInformationMessage(`Path is: ${path}`);
	// 			vscode.window.showInformationMessage('Parsing source code...');
	// 			parserSourceCodeInfo(path);
	// 			vscode.window.showInformationMessage('Source code parsed successfully');
	// 		}
	// 	});
	// });

	// const generateTCDisposable = vscode.commands.registerCommand('genstan.generateTC', () => {
	// 	vscode.window.showInputBox({
	// 		placeHolder: 'Enter the path of your application directory',
	// 		validateInput: (text: string) => {
	// 			if (text === '') {
	// 				return 'Please enter a path';
	// 			}
	// 			return null;
	// 		}
	// 	}).then((path) => {
	// 		if (path) {
	// 			vscode.window.showInformationMessage(`Path is: ${path}`);
	// 			vscode.window.showInformationMessage('Generating test case...');
	// 			const listControllerInfo = parserSourceCodeInfo(path);
	// 			const mockFunctionArgument = createTestCase(listControllerInfo, path);
	// 			generateTestCase(listControllerInfo, mockFunctionArgument).then(() => {
	// 				vscode.window.showInformationMessage('Test case generated successfully');
	// 			}).catch((err) => {
	// 				vscode.window.showErrorMessage(err);
	// 			});
	// 		}
	// 	});
	// });

	const generatorDisposable = vscode.commands.registerCommand('genstan.generator', () => {
		const panel = vscode.window.createWebviewPanel('genstan', 'Generator Test Case', vscode.ViewColumn.One, {
			enableScripts: true,
			retainContextWhenHidden: true
		});

		panel.webview.html = createInputFieldHtml().inputHtml;
		panel.webview.onDidReceiveMessage((message) => {
			if (message.command === "generate") {
				const data = JSON.parse(message.data);

				// vscode.window.showInformationMessage(`population ${data.population_size}`);
				// vscode.window.showInformationMessage(`iterastion ${data.max_iteration}`);

				vscode.window.showInformationMessage('Generating test case...');

				const options: Partial<Options> = {
				  populationSize: +data.population_size,		
				  maxIteration: +data.max_iteration,
				  qLearningInterval: 1,
				  targetCoverage: 90,
				  appDir: data.app_dir,
				  testPath: data.test_path,
				  skipController: [],
				};

				const listControllerInfo = parserSourceCodeInfo(data.app_dir, data.controller_path);
				const mockFunctionArgument = createTestCase(listControllerInfo, options);
				
				generateTestCase(listControllerInfo, mockFunctionArgument, options).then(() => {
					vscode.window.showInformationMessage('Test case generated successfully');
					panel.webview.postMessage({
						command: "finish"
					});
				}).catch((err) => {
					vscode.window.showErrorMessage(err);
					panel.webview.postMessage({
						command: "failed",
						error: err
					});
				});
			} else if (message.command === "mock") {
				const data = JSON.parse(message.data);

				vscode.window.showInformationMessage('Creating mock file...');

				const listControllerInfo = parserSourceCodeInfo(data.app_dir, data.controller_path);
				createMockFile(listControllerInfo, data.app_dir);

				panel.webview.postMessage({
					command: "finish",
				});
			}
		});
	});

	// context.subscriptions.push(parserDisposable);
	// context.subscriptions.push(generateTCDisposable);
	context.subscriptions.push(generatorDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
