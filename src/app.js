const express = require("express");
const app = express();
const path = require('path');
const ejs = require("ejs");

require("./db/conn");
const Register = require("./models/registers")

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(static_path));
app.set('view engine', 'ejs');
app.set('views', template_path);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/booktable', (req, res) => {
    res.render('bookTable');
});

app.get('/todo', (req, res) => {
    res.render('todo');
});

// create a new user in database
app.post('/booktable', async(req, res) => {
    try{
            // console.log(req.body.email);
            // res.send(req.body.name);
            // res.send(req.body.email);
            // res.send(req.body.phone);
            // res.send(req.body.comments);
        const registerEmployee = new Register({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            comments: req.body.comments
        })

        const registered = await registerEmployee.save();
        res.status(201).render('about');
    } 
    catch(error)
    {
        res.send(400).send(error);
    }
});

app.get('/menu', (req, res) => {
    res.render('menu');
});

app.post("/add/todo", (req, res) => {
    const { todo } = req.body;
    const newTodo = new Todo({ todo });

    // save the todo
    newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  })

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});


app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
})