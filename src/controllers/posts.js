import Post from '../models/Post.js';
import { postValidator } from '../validations/posts.js';

export const getAll = async (req, res) => {
    try {
        const data = await Post.find();
        if (!data) return res.status(404).json({ message: 'Post not found' });
        return res.status(200).json({ message: 'Get all posts successfully', data: data });
    } catch (error) {
        return res.status(500).json({ message: "Error while getting all posts" })
    }
}

export const getDetail = async (req, res) => {
    try {
        const data = await Post.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Post not found' });
        return res.status(200).json({ message: 'Get post successfully', data: data });
    } catch (error) {
        return res.status(500).json({ message: "Error while getting post" })
    }
}

export const remove = async (req, res) => {
    try {
        const data = await Post.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: 'Post not found' });
        return res.status(200).json({ message: 'Delete post successfully', data: data });
    } catch (error) {
        return res.status(500).json({ message: "Error while deletting post" })
    }
}

export const create = async (req, res) => {
    try {
        const { error } = postValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const data = await Post.create(req.body);
        if (!data) return res.status(404).json({ message: 'Create post faild' });
        return res.status(200).json({ message: 'Create successfully', data: data });
    } catch (error) {
        return res.status(500).json({ message: "Error while creating all posts" })
    }
}

export const update = async (req, res) => {
    try {
        const { error } = postValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const data = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.status(404).json({ message: 'Update post faild' });
        return res.status(200).json({ message: 'Update successfully', data: data });
    } catch (error) {
        return res.status(500).json({ message: "Error while Updating all posts" })
    }
}