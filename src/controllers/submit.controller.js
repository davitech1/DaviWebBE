// controllers/submitController.js

const customerService = require('../services/customer.service');

class SubmitController {
    async createCustomer(req, res) {
        try {
            const { email, number, name, address, id_post_view } = req.body;
            const customerData = { email, number, name, address, id_post_view };
            const newCustomer = await customerService.createCustomer(customerData);
            const customerResponse = {
                email: newCustomer.email,
                number: newCustomer.number,
                name: newCustomer.name,
                address: newCustomer.address,
                id_post_view: newCustomer.id_post_view,
                ip: newCustomer.ip,
                view_at: newCustomer.view_at 
            };
            res.status(201).json(customerResponse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new SubmitController();
