// controllers/submitController.js

const customerService = require('../services/customer.service');

class SubmitController {
    async createCustomer(req, res) {
        try {
            const Customer = await customerService.createCustomer(req)
            res.status(201).json(Customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SubmitController();
