import DataUriParser from 'datauri/parser.js';
import path from 'path';

export const getDataUri = (file) => {
    if (!file || !file.buffer) {
        throw new Error('File or file.buffer is missing');
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();

    if (!extName) {
        throw new Error('File extension is missing');
    }

    const dataUri = parser.format(extName, file.buffer);

    if (!dataUri.content) {
        throw new Error('Failed to generate data URI');
    }

    return dataUri;
};
