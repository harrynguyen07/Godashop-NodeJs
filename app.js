const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
var FileStore = require('session-file-store')(session);

// tạo đối tượng express
const app = express();
const port = 80;
const hostname = '127.0.0.1';

// chỉ định thư viện dùng layout
app.use(ejsLayout)

// import global helpers cho toàn bộ project
const helpers = require('./utils/helpers')
app.locals.helpers = helpers;

// chỉ định thư mục chứa template views
app.set('views', './views');

// chỉ định views engine
app.set('view engine', 'ejs');

// chỉ định thư mục publish chứa file css, js, images,...
app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'public'))

// đặt bodyParser trước app.use('/', studentRouter);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


var fileStoreOptions = {};
app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'con gà đang ăn thóc',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

const indexRouter = require('./routers/IndexRouter');

// middleware
// tham số của middleware là 1 callback function
// ở đây callback function là 1 arrow function
app.use((req, res, next) => {
    app.locals.curentRoute = helpers.getCurentRoute(req.path);
    app.locals.session = req.session;
    // console.log(req.path);
    next();
});

app.use('/', indexRouter);
// app.use('/admin', adminRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${hostname} ${port}`);
});