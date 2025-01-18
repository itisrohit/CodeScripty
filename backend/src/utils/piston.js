import axios from 'axios';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

const getRuntimes = async () => {
    try {
        const response = await axios.get(`${PISTON_API_URL}/runtimes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching runtimes:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch runtimes');
    }
};

// this getRuntimes function will return the latest versions of the runtimes for the top languages.


const executeCode = async (language, version, code, stdin = '') => {
    try {
        const response = await axios.post(`${PISTON_API_URL}/execute`, {
            language,
            version,
            files: [{ content: code }],
            stdin,
        });
        return response.data;
    } catch (error) {
        console.error('Error executing code:', error.response ? error.response.data : error.message);
        throw new Error('Failed to execute code');
    }
};

export { getRuntimes, executeCode };

