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

app.use("/draws", drawsRouter);
app.use("/employees", employeesRouter);
app.use("/expenses", expensesRouter);
app.use("/inventories", inventoriesRouter);
app.use("/pettycashes", pettycashRouter);
app.use("/purchases", purchasesRouter);
app.use("/revenues", revenuesRouter);
app.use("/salarytotals", salarytotalsRouter);
app.use("/saldeltas", saldeltasRouter);
app.use("/sales", salesRouter);
app.use("/stocks", stocksRouter);
app.use("/galleries", galleryRouter);
app.use("/announcements", announcementRouter);
app.use("/taskboards", taskBoardRouter);
app.use("/payrolls", payrollRouter);
app.use("/attendances", attendanceRouter);

app.use("/users", usersRouter);

/**
 * truncate collection
app.delete('/inventories/:inventoryId', (req, res) => {
    Inventory.remove({})
    .then(inventory => res.send(inventory))
    .catch(error => console.log(error));
});
 */

app.listen(`${process.env.PORT}`, () => console.log("Connected"));
