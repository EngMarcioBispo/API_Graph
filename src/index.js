const express = require('express');
const graphRoutes = require('./router/graphRoutes');

const app = express();

app.use(express.json());

app.use('/', graphRoutes);

app.listen(8080, () => {
    console.log('Server running on port http://localhost:8080');
});