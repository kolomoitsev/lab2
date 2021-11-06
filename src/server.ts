const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

import { config } from './config';
import userApi = require('./api/user.api');
import noteApi = require('./api/note.api');

const MONGODB_LINK = config.MONGOOSE_LINK;

mongoose.connect(MONGODB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .catch((err: any) => console.log(err));

mongoose.connection.once('open', () => {
    console.log(`MongoDb connection established successfully`);
})
    .on('error', () => {
        console.log('connection error');
    });

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userApi);
app.use('/api/note', noteApi);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
