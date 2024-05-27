const app = require('./src/app');
const { app:{ port } } = require('./src/configs/config.mongodb')
const PORT = port || 3055;

const server = app.listen(PORT, () => {
    console.log(`WSV start with ${PORT}`);
});