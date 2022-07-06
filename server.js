const oracledb = require('oracledb');
const express = require('express');
const fs = require('fs')
const app = express();

login_page = fs.readFileSync('html/login.html')
register_page = fs.readFileSync('html/register.html')


async function check_user_pass(username,password,res) {
    const con =  await oracledb.getConnection({
        user : 'system',
        password : 'oracle',
        connectString : 'orcl'
    });
    const flag = await con.execute("select check_userdata('"+username+"','"+password+"') from dual");
    await con.release();
    if (flag.rows == 1) {
        res.write('Login Succedd.');
        res.end();
    }
    else {
        res.redirect('/');
    }
}

async function Register(username,password) {
    const con =  await oracledb.getConnection({
        user : 'system',
        password : 'oracle',
        connectString : 'orcl'
    });
    await con.execute("insert into user_data values('"+username+"','"+password+"')")
    await con.execute("commit")
    await con.release()
}

app.get('/',(req,res) => {
    res.writeHead(200,{'content-type' : 'text/html'})
    res.end(login_page);
})

app.get('/register', (req,res) => {
    res.writeHead(200,{'content-type' : 'text/html'})
    res.end(register_page);
})

app.get('/register_detail',(req,res) => {
    user = req.query.Username;
    pass = req.query.Password;
    Register(user,pass);
    res.redirect('/')
})

app.get('/login_user',(req,res) => {
    user = req.query.Username;
    pass = req.query.Password;
    check_user_pass(user,pass,res);
})

app.listen(7450);


