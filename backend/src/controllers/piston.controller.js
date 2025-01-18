import { asyncHandler } from '../utils/asyncHandler.js';
import { executeCode, getRuntimes } from '../utils/piston.js';

const runCode = asyncHandler(async (req, res) => {
    const { language, version, code, stdin } = req.body;

    if (!language || !version || !code) {
        return res.status(400).json({ status: 'fail', message: 'Language, version, and code are required' });
    }

    const result = await executeCode(language, version, code, stdin);
    console.log("code executed successfully 👌");

    // Remove newline characters from stdout and output
    const cleanedStdout = result.run.stdout.replace(/\n/g, '');
    const cleanedOutput = result.run.output.replace(/\n/g, '');

    // Customize the response format
    const response = {
        status: 'success',
        language: result.language,
        version: result.version,
        stdout: cleanedStdout,
        stderr: result.run.stderr,
        exitCode: result.run.code,
        output: cleanedOutput
    };

    res.status(200).json(response);
});


// Below code will send latest versions of piston runtimes for given languages.
const topLanguages = [
    'python', 'javascript', 'c++', 'java', 'c', 'ruby', 'php', 'go', 'swift', 'csharp', 'rust', 'kotlin', 'typescript', 'perl', 'scala'
];

const getLatestRuntimes = asyncHandler(async (req, res) => {
    const runtimes = await getRuntimes();
    const latestRuntimes = {};

    topLanguages.forEach(language => {
        const versions = runtimes.filter(runtime => runtime.language === language);
        if (versions.length > 0) {
            latestRuntimes[language] = versions[0].version;
        }
    });
    console.log("latest runtimes fetched successfully 👌");
    res.status(200).json({ status: 'success', latestRuntimes });
});

export { runCode, getLatestRuntimes };