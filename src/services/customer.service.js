'use strict';

const Customer = require('../models/customer.model.js');
const moment = require('moment-timezone');

class CustomerService {
    static async createCustomer(req) {
        try {
            const { email, number, name, address, id_post_view } = req.body;

            // Lấy địa chỉ IP của máy khách
            const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            const customerData = { email, number, name, address, id_post_view, ip: clientIp };
            const currentTimeUTCPlus7 = moment.tz("Asia/Bangkok").format();
            const customer = new Customer({
                ...customerData,
                id_post_view: customerData.id_post_view || '1',
                view_at: currentTimeUTCPlus7
            });
            await customer.save();
            return {
                email: customer.email,
                number: customer.number,
                name: customer.name,
                address: customer.address,
                id_post_view: customer.id_post_view,
                ip: customer.ip,
                view_at: customer.view_at
            };
        } catch (error) {
            throw new Error('Error creating customer: ' + error.message);
        }
    }
}

module.exports = CustomerService;
