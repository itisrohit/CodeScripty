import { asyncHandler } from '../utils/asyncHandler.js';
import File from '../models/file.model.js';
import mongoose from 'mongoose';

// Validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createFile = asyncHandler(async (req, res) => {
    const { name, content, folderId } = req.body;
    const user = req.user._id;

    if (!name || !folderId) {
        return res.status(400).json({ status: 'fail', message: 'Name and folderId are required' });
    }

    if (!isValidObjectId(folderId)) {
        return res.status(400).json({ status: 'fail', message: 'Invalid folderId' });
    }

    const file = new File({ name, content, folder: folderId, user });
    await file.save();

    res.status(201).json({ status: 'success', file });
});

const updateFile = asyncHandler(async (req, res) => {
    const { fileId, content } = req.body;

    if (!fileId || !content) {
        return res.status(400).json({ status: 'fail', message: 'fileId and content are required' });
    }

    if (!isValidObjectId(fileId)) {
        return res.status(400).json({ status: 'fail', message: 'Invalid fileId' });
    }

    const file = await File.findById(fileId);

    if (!file) {
        return res.status(404).json({ status: 'fail', message: 'File not found' });
    }

    file.content = content;
    await file.save();

    res.status(200).json({ status: 'success', file });
});

export { createFile, updateFile };