const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItems.js');

// POST /menu - Add a new menu item
router.post('/menu', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ error: "Name and price are required" });
        }
        const newItem = new MenuItem({ name, description, price });
        await newItem.save();
        res.status(201).json({ message: "Menu item added successfully", item: newItem });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /menu - Fetch all menu items
router.get('/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
