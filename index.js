import express from 'express';

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
    }
);

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.post('/login', (req, res) => {
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

app.post('/register', (req, res) => {});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);