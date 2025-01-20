import { asyncHandler } from '../utils/asyncHandler.js';
import File from '../models/file.model.js';

const createFile = asyncHandler(async (req, res) => {
    const { name, content, folderId } = req.body;
    const user = req.user._id;

    const file = new File({ name, content, folder: folderId, user });
    await file.save();

    res.status(201).json({ status: 'success', file });
});

const updateFile = asyncHandler(async (req, res) => {
    const { fileId, content } = req.body;
    const file = await File.findById(fileId);

    if (!file) {
        return res.status(404).json({ status: 'fail', message: 'File not found' });
    }

    file.content = content;
    await file.save();

    res.status(200).json({ status: 'success', file });
});

export { createFile, updateFile };