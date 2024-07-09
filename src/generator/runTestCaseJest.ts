import { runCLI } from "jest";
import { Options, CoverageInfo } from "./type/generatorTypes";
import { FileCoverage } from "istanbul-lib-coverage";

async function runTest(options: Options): Promise<CoverageInfo> {
    const appDir = options.appDir;
    const testPath = options.testPath;
    const skipController = options.skipController;

    const optionTest: any = {
        coverage: true,
        silent: true,
        testPathIgnorePatterns: skipController.map((controller) => `${testPath}\\${controller}`),
    };

    const result = await runCLI(optionTest, [appDir]);

    const coverageMap = result.results.coverageMap?.toJSON()!!;

    const coverageInfo: CoverageInfo = {} as CoverageInfo;

    for (const coverage of Object.values(coverageMap!!)) {
        const coverageResult = coverage as FileCoverage;
        const coverageSummary = coverageResult.toSummary();
        const controllerName = coverageResult.path.split("\\").pop()?.replace(".ts", "")!!;

        coverageInfo[controllerName] = {
            coverage: {
                statements: coverageSummary.statements.pct,
                branches: coverageSummary.branches.pct,
                functions: coverageSummary.functions.pct,
                lines: coverageSummary.lines.pct,
            },
            unCoveredLines: coverageResult.getUncoveredLines(),
        };
    }

    return coverageInfo;
}

// const appDir = "D:\\Stanley\\Kuliah\\Akademik\\TA\\src\\Open Source Web\\Test Case Generator\\supply_chain_application";
// const options: Options = {
//     populationSize: 10,
//     maxIteration: 10,
//     qLearningInterval: 3,
//     targetCoverage: 80,
//     appDir: appDir,
//     testPath: `${appDir}\\src\\tests\\`,
//     skipController: [],
// };

export { runTest };