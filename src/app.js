const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const { accounts, users, writeJSON } = require('./data');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Account Summary', accounts }); 
});

app.get('/savings', (re,res) => {
    res.render('account', { account: accounts.savings });
});

app.get('/checking', (re,res) => {
    res.render('account', { account: accounts.checking });
});

app.get('/credit', (re,res) => {
    res.render('account', { account: accounts.credit });
});

app.get('/transfer', (req, res) => res.render('transfer'));

app.post('/transfer', (req,res) => {
    accounts[req.body.from].balance = accounts[req.body.from].balance - 
    req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 
        10);
    writeJSON();
    res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (req, res) => res.render('payment', { account: accounts.credit
}));

app.post('/payment', (req, res) => {
    accounts.credit.balance = accounts.credit.balance - req.body.amount;
    accounts.credit.available = parseInt(req.body.amount, 10) + 
    parseInt(re.body.amount, 10);
    writeJSON();
    res.render('payment', { message: 'Payment Successful', account: 
    accounts.credit });
});

app.get('/profile', (re,res) => {
    res.render('profile', { user: users[0] });
});

app.listen(3000, () => {
    console.log('PS Project Running on Port 3000!')
});