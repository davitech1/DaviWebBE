// const mongoose = require('mongoose');
// const type = require('./type.model');

// const seedDatabase = async () => {
    
//     try {
//         // Xóa toàn bộ dữ liệu hiện có
//         await type.deleteMany({});

//         // Thêm dữ liệu mới
//         const types = [
//             {
//                 name: 'Education',
//             },
//             {
//                 name: 'Insurance',
//             },{
//                 name: 'Order Management',
//             },{
//                 name: 'Human Resource Management',
//             },{
//                 name: 'Healthcare',
//             },{
//                 name: 'Food',
//             }
//         ]

//         await type.insertMany(types);
//         console.log('Database seeded successfully');
//     } catch (error) {
//         console.error('Error seeding database:', error);
//     }
// };
// module.exports = seedDatabase