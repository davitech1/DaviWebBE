const Customer = require('../models/customer.model.js');

const getSystemIp = () => {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '127.0.0.1';
};

const createCustomer = async (customerData) => {
    try {
        const currentTimeVN = getcurrentTimeUTCP7();
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const customer = new Customer({
            ...customerData,
            ip: clientIp,
            id_post_view: customerData.id_post_view || '1',
            view_at: currentTimeVN
        });
        await customer.save();
        return customer;
    } catch (error) {
        throw new Error('Error creating customer: ' + error.message);
    }
};

module.exports = {
    createCustomer,
    getcurrentTimeUTCP7
};
