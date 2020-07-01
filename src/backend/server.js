var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors')
var MySQLStore = require('express-mysql-session')(session)
//const port = process.env.PORT || 5001;
const port = 6969;

var connection = mysql.createConnection({
    host     : '157.230.87.48',
    port     : 3306,
    user     : 'cyrus',
    password : 'beerbottle',
	database : 'satisfactory'
});

var app = express();

// Set up a whitelist and check against it:
var whitelist = ['http://cshanehsaz.com', 'http://cshanehsaz.com:6969', 
                    'http://localhost:3000', 'http://localhost:6969']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(cors())

app.use(session({
    secret: 'secret',
    //store: sessionStore,
	resave: false,
    saveUninitialized: false,
    // cookie: {
    //     sameSite: 'Lax',
    //     secure: true
    // }
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/getmachinedata', function(request, response) {
    let  _name = request.query.name;
    console.log(request.query)
    connection.query('SELECT * FROM test WHERE name = ?', [_name], function(error, results, fields) {
        if (results.length > 0) {
            console.log('Machine Data Pulled')
            console.log(results)
            response.send({data: results})
        } else {
            console.log('invalid machine request')
            response.send('Machine not recognized.');
        }			
        response.end();
    })
});






app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                request.session.save()
                console.log('loggedin: ', request.session.loggedin)
                response.redirect('http://localhost:3000/calendar')
                //response.redirect('http://cal.cshanehsaz.com/calendar');
                //response.redirect('/calendar')
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
        connection.query('SELECT * FROM accounts WHERE username = ?', [request.session.username], 
            function(error, results, fields){
                if (error) throw error;
                response.send({accounts: results})
        })
        console.log(request.session.username)
    } else {
		response.send('Please login to view this page!');
	}
});

app.post('/signup', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let password2 = request.body.password2;
    let email = request.body.email;
    connection.query('SELECT username FROM accounts WHERE username = ?', [request.body.username], 
        function(error, results) {
            if(results.length > 0) {
                response.send('This username is taken.')
            } else {
                if(password === password2) {
                    if(username && password && email) {
                        connection.query('INSERT INTO accounts(username, password, email) VALUES (?, ?, ?)',
                        [username, password, email], 
                            function(error, results){
                                if (error) throw error;
                                console.log('Record Inserted');
                                response.redirect('/home');
                            }
                        )
                    }
                } else {
                    response.send('Your passwords must match.')
                }
            }
        }
    )
    
})

app.post('/createevent', function(request, response) {
    let username = request.session.username;
    let name = request.body.name;
    let location = request.body.location;
    let time = request.body.time;
    let description = request.body.description;
    if(username === null || username === undefined) {
        response.send('You must be logged in to add events.')
    } else {
        connection.query('INSERT INTO eventstest(name, time, location, description, username) VALUES (?, ?, ?, ?, ?)', 
            [name, time, location, description, username], 
            function(error, results) {
                    if(error) throw error;
                    response.redirect('calendar')
            }
        )
    }
    
})

app.get('/cal', function(request, response) {
    //console.log('cal loggedin:', request.session.loggedin)
    let username = request.session.username
    //console.log(username)
    connection.query('SELECT * FROM eventstest WHERE username = ?', [username],
        function(error, results) {
            if(error) {
                throw error;
            } else {
                response.send({events: results})
            }
        }
    )
})

app.get('/calendartest', function(request, response) {
    console.log(request.session.username)
    let username = request.session.username
    connection.query('SELECT * FROM eventstest',
        function(error, results) {
            if(error) {
                throw error;
            } else {
                response.send({events: results})
            }
        }
    )
})
