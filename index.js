const express = require("express");
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'db_user',
    password: 'pw_user',
    host: 'host_db',
    port: your_port,
    database: 'nama_db',
});

const app = express();

const secretKey = 'stat';

app.use(express.json());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const session = require('express-session');

app.use(session({
    secret: 'stat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


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
                res.redirect("/homepage");
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
    res.render("register");
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
        const userCheck = await pool.query('SELECT * FROM akun WHERE username = $1 OR email = $2', [username, email]);
        if (userCheck.rows.length > 0) {
            return res.send('User already exists');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await pool.query('INSERT INTO akun (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

        res.redirect('/login');
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
app.get('/schedulefut', async (req, res) => {
    try {
        const basketQuery = await pool.query('SELECT * FROM basket_match');
        const baskets = basketQuery.rows;

        const badminQuery = await pool.query('SELECT * FROM badmin_match'); // Update this query based on your actual table name and structure
        const badmins = badminQuery.rows;

        res.render('schedulefut', { baskets, badmins });
    } catch (err) {
        console.error('Error fetching match schedules:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/badmin_detail', async (req, res) => {
    const query = await pool.query('SELECT * FROM badmin_match');
    const matches = query.rows;
    res.render('badmin_detail', { matches });
});

app.post('/update_match_badmin', async (req, res) => {
    const { id, name, type, team_a, team_b, team_1_set_win, team_2_set_win, set1_team1_score, set1_team2_score, set2_team1_score, set2_team2_score, set3_team1_score, set3_team2_score } = req.body;

    try {
        await pool.query('UPDATE badmin_match SET name = $1, type = $2, team_a = $3, team_b = $4, team_1_set_win = $5, team_2_set_win = $6, set1_team1_score = $7, set1_team2_score = $8, set2_team1_score = $9, set2_team2_score = $10, set3_team1_score = $11, set3_team2_score = $12 WHERE id = $13', [name, type, team_a, team_b, team_1_set_win, team_2_set_win, set1_team1_score, set1_team2_score, set2_team1_score, set2_team2_score, set3_team1_score, set3_team2_score, id]);
        res.redirect('/badmin_detail');
    } catch (err) {
        res.send(err.message);
    }
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

app.get('/basket', async (req, res) => {
    const query = await pool.query('SELECT * FROM teams_basket');
    const teams = query.rows;
    const query2 = await pool.query('SELECT * FROM players_basket');
    const players = query2.rows;
    const query3 = await pool.query('SELECT * FROM players_basket');
    const player_stat = query3.rows;
    res.render('basket', { teams, players });
});

app.get('/basket/:id', async (req, res) => {
    const { id } = req.params;
    let query = await pool.query('SELECT * FROM basket_match WHERE id = $1', [id]);
    const matches = query.rows[0];
    query = await pool.query('SELECT * FROM teams_basket');
    const teams = query.rows;
    query = await pool.query('SELECT * FROM players_basket');
    const players = query.rows;

    res.render('basket_detail', { matches, teams, players });
})

app.get('/soon', (req, res) => {
    res.render('soon');
});

app.get('/cek', (req, res) => {
    res.render('cek');
});

app.post('/add_basket_team', async (req, res) => {
    //res.send(req.body)
    await pool.query('INSERT INTO teams_basket (name) VALUES ($1)', [req.body.name]);
    res.redirect('/basket');
});

app.post('/add_basket_player', async (req, res) => {

    await pool.query('INSERT INTO players_basket (name, position, points, rebounds, assists, team_name) VALUES ($1, $2, $3, $4, $5, $6)', [req.body.name, req.body.position, req.body.points, req.body.rebounds, req.body.assists, req.body.team_name]);
    res.redirect('/basket');
});

app.post('/add_basket_match', async (req, res) => {
    //res.send(req.body)
    await pool.query('INSERT INTO basket_match (name, team_a_name, team_b_name, team_a_score, team_b_score) VALUES ($1, $2, $3, $4, $5)', [req.body.name, req.body.team_a_name, req.body.team_b_name, req.body.team_a_score, req.body.team_b_score]);
    res.redirect('/basket');
});

app.get('/basket_detail/:id', async (req, res) => {
    const matchId = req.params.id;
    try {
        // Fetch match details
        const matchQuery = await pool.query('SELECT * FROM basket_match WHERE id = $1', [matchId]);
        const matchDetails = matchQuery.rows[0];
        if (!matchDetails) {
            throw new Error('Match not found');
        }

        // Fetch teams
        const teamsQuery = await pool.query('SELECT * FROM teams_basket');
        const teams = teamsQuery.rows;

        // Fetch players based on the teams in the match
        const playersQuery = await pool.query(`
            SELECT * 
            FROM players_basket
            WHERE team_name = $1 OR team_name = $2
        `, [matchDetails.team_a_name, matchDetails.team_b_name]);

        const players = playersQuery.rows;

        // Render the view with match details, teams, and players
        res.render('basket_detail', { matches: matchDetails, teams, players });
    } catch (err) {
        console.error('Error fetching match details:', err);
        res.status(500).send(`Internal Server Error: ${err.message}`);
    }
});





app.get('/basket_detail', async (req, res) => {
    let query = await pool.query('SELECT * FROM basket_match');
    const matches = query.rows[0];
    query = await pool.query('SELECT * FROM teams_basket');
    const teams = query.rows;
    query = await pool.query('SELECT * FROM players_basket');
    const players = query.rows;
    res.render('basket_detail', { matches, teams, players }); 
});

app.put('/api/match/:matchId', async (req, res) => {
    const matchId = req.params.matchId;
    const { team_a_score, team_b_score } = req.body;

    console.log('Received update request:', matchId, team_a_score, team_b_score);

    try {
        const updateQuery = await pool.query(
            'UPDATE basket_match SET team_a_score = $1, team_b_score = $2 WHERE id = $3 RETURNING *',
            [team_a_score, team_b_score, matchId]
        );
        const updatedMatch = updateQuery.rows[0];
        res.json(updatedMatch);
    } catch (err) {
        console.error('Error updating match:', err);
        res.status(500).json({ error: 'Error updating match' });
    }
});




// API Route for Player Update
app.put('/api/player/:playerId', async (req, res) => {
    const playerId = req.params.playerId;
    const { name, position, points, rebounds, assists } = req.body;

    try {
        const updateQuery = await pool.query(
            'UPDATE players_basket SET name = $1, position = $2, points = $3, rebounds = $4, assists = $5 WHERE id = $6 RETURNING *',
            [name, position, points, rebounds, assists, playerId]
        );
        const updatedPlayer = updateQuery.rows[0];
        res.json(updatedPlayer);
    } catch (err) {
        console.error('Error updating player:', err);
        res.status(500).json({ error: 'Error updating player' });
    }
});


app.delete('/api/player/:playerId', async (req, res) => {
    const playerId = req.params.playerId;

    try {
        await pool.query('DELETE FROM players_basket WHERE id = $1', [playerId]);
        res.json({ message: 'Player deleted successfully' });
    } catch (err) {
        console.error('Error deleting player:', err);
        res.status(500).json({ error: 'Error deleting player' });
    }
});

app.post('/delete_basket_match/:id', async (req, res) => {
    const { id } = req.params;
    
    try{
        await pool.query('DELETE FROM basket_match WHERE id = $1', [id]);
        res.redirect('/basket_detail');
    }
    catch(err){
        res.send(err.message);
    }
})

app.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.redirect('/homepage');
            }
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    } else {
        res.redirect('/register');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

