const express = require("express");
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: '30012004@Ok',
    host: 'localhost',
    port: 5432,
    database: 'stat',
});

const app = express();

// Convert data into JSON format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
// Use EJS as the view engine
app.set("view engine", "ejs");

// Routes
app.get("/login", async (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM akun WHERE username = $1', [username]);
        const user = result.rows[0];

        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                res.redirect("/homepage"); // Render the home page on successful login
            } else {
                res.send("Wrong password");
            }
        } else {
            res.send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.get("/register", async (req, res) => {
            const result = await pool.query('SELECT * FROM akun WHERE username = $1', [username]);
        const user = result.rows[0];
});

app.post("/submit_add_match_badmin", async (req, res) => {
    const { name, type, team_a, team_b, team_1_set_win, team_2_set_win, set1_team1_score, set1_team2_score, set2_team1_score, set2_team2_score, set3_team1_score, set3_team2_score } = req.body

    try {
        const query = await pool.query(`
        INSERT INTO badmin_match (
            name, type, team_a, team_b, 
            team_1_set_win, team_2_set_win,
            set1_team1_score, set1_team2_score,
            set2_team1_score, set2_team2_score,
            set3_team1_score, set3_team2_score
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [ name, type, team_a, team_b, team_1_set_win, team_2_set_win, set1_team1_score, set1_team2_score, set2_team1_score, set2_team2_score, set3_team1_score, set3_team2_score ]);  

        res.redirect("/badmin_detail")

    } catch (err) {
        res.send(err.message)
    }
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const userCheck = await pool.query('SELECT * FROM akun WHERE username = $1 OR email = $2', [username, email]);
        if (userCheck.rows.length > 0) {
            return res.send('User already exists');
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        await pool.query('INSERT INTO akun (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

        res.send('User registered successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Rute untuk Homepage
app.get('/homepage', (req, res) => {
  res.render('homepage');
});

//Rute Kategori
app.get('/category', (req, res) => {
    res.render('category');
    });

//Rute Jadwal
app.get('/schedulefut', (req, res) => {
    res.render('schedulefut');
    });

app.get('/badmin_detail', async (req, res) => {
    const query = await pool.query('SELECT * FROM badmin_match');
    const matches = query.rows;
    res.render('badmin_detail', { matches });
});

app.post('/delete_match_badmin/:id', async (req, res) => {
    const { id } = req.params;
    
    try{
        await pool.query('DELETE FROM badmin_match WHERE id = $1', [id]);
        res.redirect('/badmin_detail');
    }
    catch(err){
        res.send(err.message);
    }

})

app.get('/badmin', async (req, res) => {
    const query = await pool.query('SELECT * FROM badmin_match');
    const matches = query.rows;
    res.render('badmin', { matches });
});

app.get('/soon', (req, res) => {
    res.render('soon');
});

// Define Port for Application
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

