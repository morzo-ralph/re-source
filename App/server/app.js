const dotenv = require('dotenv')
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const filter = require('express-mongodb-filters')

//const ejs = require('ejs');
const path = require('path');
const mongoose = require('./database/mongoose');
dotenv.config()


//router import
const drawsRouter = require('./routes/draws');
const employeesRouter = require('./routes/employees');
const expensesRouter = require('./routes/expenses');
const inventoriesRouter = require('./routes/inventories');
const pettycashRouter = require('./routes/pettycash');
const purchasesRouter = require('./routes/purchases');
const revenuesRouter = require('./routes/revenues');
const salarytotalsRouter = require('./routes/salarytotals');
const saldeltasRouter = require('./routes/saldeltas');
const salesRouter = require('./routes/sales');
const stocksRouter = require('./routes/stocks');
const galleryRouter = require('./routes/gallery');
const usersRouter = require('./routes/users');
const announcementRouter = require('./routes/announcement');
const taskBoardRouter =  require('./routes/taskboard');
const payrollRouter = require('./routes/payroll');
const attendanceRouter = require('./routes/attendance');

//check localhost ip
 require('dns').lookup(require('os').hostname(), function (err, add, fam) {
     console.log('addr: ' + add);
   })

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());
/*
*CORS
*localhost:3000 - backend
*localhost:4200 - frontend
*list and task crud 
*/

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(filter())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/draws", drawsRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/inventories", inventoriesRouter);
app.use("/api/pettycashes", pettycashRouter);
app.use("/api/purchases", purchasesRouter);
app.use("/api/revenues", revenuesRouter);
app.use("/api/salarytotals", salarytotalsRouter);
app.use("/api/saldeltas", saldeltasRouter);
app.use("/api/sales", salesRouter);
app.use("/api/stocks", stocksRouter);
app.use("/api/galleries", galleryRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/taskboards", taskBoardRouter);
app.use("/api/payrolls", payrollRouter);
app.use("/api/attendances", attendanceRouter);

app.use("/users", usersRouter);

app.get('/api/check/', (req, res, next) => {
    const content = [
        {
            message: "Successfully Connected"
        }
    ]
    res.status(200).json({
        content: content,
        message: "Connected Succesfully",
        status: 200,
    })

    /*console.log("Request Received");*/
    next();
});

/**
 * truncate collection
app.delete('/inventories/:inventoryId', (req, res) => {
    Inventory.remove({})
    .then(inventory => res.send(inventory))
    .catch(error => console.log(error));
});
 */

app.listen(`${process.env.PORT}`, () => console.log("Connected"));
