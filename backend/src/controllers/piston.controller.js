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

// Below code will send the latest versions of piston runtimes for given languages with boilerplate code.
const topLanguages = [
    'python', 'javascript', 'c++', 'java', 'c', 'csharp', 'ruby', 'php', 'go', 'swift', 'rust', 'kotlin', 'typescript', 'perl', 'scala'
];

const getLatestRuntimes = asyncHandler(async (req, res) => {
    const runtimes = await getRuntimes();
    const latestRuntimes = [];

    topLanguages.forEach(language => {
        const versions = runtimes.filter(runtime => runtime.language === language);
        if (versions.length > 0) {
            const version = versions[0].version;

            // Boilerplate code for each language
            let boilerplate = '';
            switch (language) {
                case 'python':
                    boilerplate = "# Write code here\nprint(\"Hello, World!\")";
                    break;
                case 'javascript':
                    boilerplate = "// Write code here\nconsole.log(\"Hello, World!\");";
                    break;
                case 'c++':
                    boilerplate = "#include <iostream>\n\n// Write code here\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}";
                    break;
                case 'java':
                    boilerplate = "public class Main {\n    // Write code here\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}";
                    break;
                case 'c':
                    boilerplate = "#include <stdio.h>\n\n// Write code here\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}";
                    break;
                case 'ruby':
                    boilerplate = "# Write code here\nputs \"Hello, World!\"";
                    break;
                case 'php':
                    boilerplate = "<?php\n// Write code here\necho \"Hello, World!\";\n?>";
                    break;
                case 'go':
                    boilerplate = "package main\n\nimport \"fmt\"\n\n// Write code here\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}";
                    break;
                case 'swift':
                    boilerplate = "import Foundation\n\n// Write code here\nprint(\"Hello, World!\")";
                    break;
                case 'csharp':
                    boilerplate = "using System;\n\n// Write code here\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, World!\");\n    }\n}";
                    break;
                case 'rust':
                    boilerplate = "// Write code here\nfn main() {\n    println!(\"Hello, World!\");\n}";
                    break;
                case 'kotlin':
                    boilerplate = "// Write code here\nfun main() {\n    println(\"Hello, World!\")\n}";
                    break;
                case 'typescript':
                    boilerplate = "// Write code here\nconsole.log(\"Hello, World!\");";
                    break;
                case 'perl':
                    boilerplate = "# Write code here\nprint \"Hello, World!\\n\";";
                    break;
                case 'scala':
                    boilerplate = "// Write code here\nobject Main extends App {\n    println(\"Hello, World!\")\n}";
                    break;
                default:
                    boilerplate = "// Write code here";
                    break;
            }

            latestRuntimes.push({
                language: language,
                version: version,
                boilerplate: boilerplate
            });
        }
    });

    console.log("latest runtimes fetched successfully 👌");
    res.status(200).json({status: 'success', latestRuntimes});
});

export { runCode, getLatestRuntimes };