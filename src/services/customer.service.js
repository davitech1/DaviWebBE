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

const getcurrentTimeUTCP7 = () => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 7);
    const year = currentTime.getUTCFullYear();
    const month = String(currentTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentTime.getUTCDate()).padStart(2, '0');
    const hours = String(currentTime.getUTCHours()).padStart(2, '0');
    const minutes = String(currentTime.getUTCMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const createCustomer = async (customerData) => {
    try {
        const currentTimeVN = getcurrentTimeUTCP7();
        const customer = new Customer({
            ...customerData,
            ip: getSystemIp(),
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
