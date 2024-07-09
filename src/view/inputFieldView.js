const generatePage = document.getElementById('generate-page');
const parsePage = document.getElementById('parse-page');

// Button
const btnGenerate = document.getElementById('btn-generate');

const useDefault = document.getElementById('use-default');

// Input Field
const appDir = document.getElementById('app-dir');
const testPath = document.getElementById('test-path');
const controllerPath = document.getElementById('controller-path');
const populationSize = document.getElementById('population-size');
const maxIteration = document.getElementById('max-iteration');

const populationSizeBox = document.getElementById('population-size-box');
const maxIterationBox = document.getElementById('max-iteration-box');

const output = document.getElementById('output');

const vscode = acquireVsCodeApi();

generatePage.addEventListener('click', () => {
    btnGenerate.innerHTML = 'Generate';
    populationSizeBox.style.display = 'block';
    maxIterationBox.style.display = 'block';
    output.innerHTML = '';

    btnGenerate.onclick = () => {
        const appDirValue = appDir.value;
        const testPathValue = testPath.value;
        const controllerPathValue = controllerPath.value;
        const populationSizeValue = populationSize.value;
        const maxIterationValue = maxIteration.value;

        const value = {
            app_dir: appDirValue,
            test_path: testPathValue,
            controller_path: controllerPathValue,
            population_size: populationSizeValue,
            max_iteration: maxIterationValue
        };

        if (appDirValue === '') {
            output.innerHTML = 'Application Directory is required';
            return;
        }

        if (!useDefault.checked && (testPathValue === '' || controllerPathValue === '')) {
            output.innerHTML = 'Test Path and Controller Path is required';
            return;
        }

        vscode.postMessage({
            command: 'generate',
            data: JSON.stringify(value)
        });

        btnGenerate.disabled = true;
        output.innerHTML = 'Generating Test Case...';
    };
});

parsePage.addEventListener('click', () => {
    btnGenerate.innerHTML = 'Parse';
    populationSizeBox.style.display = 'none';
    maxIterationBox.style.display = 'none';
    output.innerHTML = '';

    btnGenerate.onclick = () => {
        const appDirValue = appDir.value;
        const testPathValue = testPath.value;
        const controllerPathValue = controllerPath.value;

        const value = {
            app_dir: appDirValue,
            test_path: testPathValue,
            controller_path: controllerPathValue
        };

        if (appDirValue === '') {
            output.innerHTML = 'Application Directory is required';
            return;
        }

        if (!useDefault.checked && (testPathValue === '' || controllerPathValue === '')) {
            output.innerHTML = 'Test Path and Controller Path is required';
            return;
        }

        vscode.postMessage({
            command: 'parse',
            data: value
        });

        btnGenerate.disabled = true;
        output.innerHTML = 'Parsing Source Code...';
    };
});

useDefault.addEventListener('change', () => {
    if (useDefault.checked) {
        testPath.value = 'src/tests';
        controllerPath.value = 'src/controllers';

        testPath.disabled = true;
        controllerPath.disabled = true;
    } else {
        testPath.value = '';
        controllerPath.value = '';
    }
});
        

window.addEventListener('message', event => {
    const message = event.data;
    if (message.command === 'finish') {
        output.innerHTML = 'Test case generated successfully';
    } else if (message.command === 'failed') {
        output.innerHTML = message.error;
    }         
    btnGenerate.disabled = false;
});

window.addEventListener('load', () => {
    generatePage.click();
});