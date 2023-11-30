const express = require('express');
const PORT = 4000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config')


mongoose.connect(MONGODB_URL);

mongoose.connection.on('connected', () => {
    console.log("DB connected");
})
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB");
})

require('./models/customer_model')
require('./models/seller_model')
require('./models/seller_product_model')

app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.json({ limit: '50mb' }));


app.use(require('./routes/customer_route'))
app.use(require('./routes/seller_route'))
app.use(require('./routes/seller_product_route'))


app.listen(PORT, () => {
    console.log("Server started on port", PORT);
}); 