function createInputFieldHtml() {    
  const inputHtml = /* html */ `
    <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/nice-forms.css@0.1.7/dist/nice-forms.css" />
      </head>

      <body>
        <div class="container">
          <h1>
            Generator Test Case
          </h1>

          <nav>
            <ul>
              <li>
                <button class="btn-primary" id="generate-page">Generate Test Case</a>
              </li>
              <li>
                <button class="btn-primary" id="mock-page">Create Mock Template</a>
              </li>
            </ul>
          </nav>

          <div class="nice-form-group">
            <label class="label-input">Application Directory</label>
            <input id="app-dir" class="input-value" type="text" placeholder="home/application/" value="" />
          </div>
        
          <div class="nice-form-group">
            <input type="checkbox" id="use-default" />
            <label for="use-default">Use Default Configuration</label>
          </div>
        
          <div class="nice-form-group">
            <label class="label-input">Test Path</label>
            <input id="test-path" class="input-value" type="email" name="optional-input" placeholder="src/tests/" value="" />
          </div>
        
          <div class="nice-form-group">
            <label class="label-input">Controller Path</label>
            <input id="controller-path" class="input-value" type="email" name="optional-input" placeholder="src/controller/" value="" />
          </div>

          <div class="nice-form-group" id="population-size-box">
            <label class="label-input">Population Size</label>
            <input id="population-size" class="input-value" type="text" placeholder="6" value="" />
          </div>
        
          <div class="nice-form-group" id="max-iteration-box">
            <label class="label-input">Max Iteration</label>
            <input id="max-iteration" class="input-value" type="text" placeholder="10" value="" />
          </div>
        
          <div class="nice-form-group" >
            <div style="text-align: center;">
              <button class="btn-primary" id="btn-generate">Generate</button>
            </div>
          </div>

          <div style="margin-top: 8px;">
            <label id="output"></label>
          </div>
        </div>

        <script>
          const generatePage = document.getElementById('generate-page');
          const mockPage = document.getElementById('mock-page');

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
              populationSizeBox.style.display = 'block';
              maxIterationBox.style.display = 'block';
              output.innerHTML = '';

              btnGenerate.onclick = () => {
                  const appDirValue = appDir.value;
                  const testPathValue = testPath.value;
                  const controllerPathValue = controllerPath.value;
                  const populationSizeValue = populationSize.value ?? 6;
                  const maxIterationValue = maxIteration.value ?? 10;

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

          mockPage.addEventListener('click', () => {
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
                    command: 'mock',
                    data: JSON.stringify(value)
                  });

                  btnGenerate.disabled = true;
                  output.innerHTML = 'Creating Mock Template...';
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

                testPath.disabled = false;
                controllerPath.disabled = false;
              }
          });
                  

          window.addEventListener('message', event => {
              const message = event.data;
              if (message.command === 'finish') {
                output.innerHTML = 'Generated successfully';
              } else if (message.command === 'failed') {
                output.innerHTML = message.error;
              }         
              btnGenerate.disabled = false;
          });

          window.addEventListener('load', () => {
              generatePage.click();
          });
        </script>

        <style>
          .container {
            height: 680px;
            margin: auto;
            width: 60%;
            background-color: white;
            padding: 20px 5% 20px 5%;
            border-radius: 10px;
            border: 5px solid black;
          }
          h1 {
            text-align: center;
            color: #333;
          }
          .label-input {
            font-size: 2.5rem;
          }
          #output {
            color: #333;
          }
          .nice-form-group {
            max-width: 100%;
          }
          .input-value {
            max-height: 20px;
          }
          .btn-primary {
            appearance: none;
            backface-visibility: hidden;
            background-color: #333;
            width: 50%;
            border-radius: 8px;
            border-style: none;
            box-shadow: rgba(39, 174, 96, .15) 0 4px 9px;
            box-sizing: border-box;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: normal;
            line-height: 1;
            outline: none;
            overflow: hidden;
            padding: 10px 15px;
            position: relative;
            text-align: center;
            text-decoration: none;
            transform: translate3d(0, 0, 0);
            transition: all .3s;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            vertical-align: top;
            white-space: nowrap;
          }
          .btn-primary:hover {
            background-color: #4e504f;
            opacity: 1;
            transform: translateY(0);
            transition-duration: .35s;
          }
          .btn-primary:active {
            transform: translateY(2px);
            transition-duration: .35s;
          }
          .btn-primary:hover {
            box-shadow: rgba(39, 174, 96, .2) 0 6px 12px;
          }
          nav ul {
            list-style-type: none;
            display: flex;
            margin: 0;
            padding: 0;
            justify-content: center;
          }
          nav li {
            padding: 0;
            width: 100%;
          }
          nav li button {
            border-radius: 0!important;
            width: 100%!important;
          }
        </style>
      </body>
    </html>`;

  return { inputHtml };
}

export { createInputFieldHtml };
