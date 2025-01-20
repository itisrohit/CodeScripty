import { asyncHandler } from '../utils/asyncHandler.js';
import Folder from '../models/folder.model.js';

const createFolder = asyncHandler(async (req, res) => {
    const { name, parentId } = req.body;
    const user = req.user._id;

    const folder = new Folder({ name, parent: parentId, user });
    await folder.save();

    res.status(201).json({ status: 'success', folder });
});

export { createFolder };