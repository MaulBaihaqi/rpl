**DATABASE SETUP**

Kami menggunakan **PostgreSQL** sebagai DBMS

_**Table:**_
1. akun
2. badmin_match
3. basket_match
4. players_basket
5. teams_basket

_**Table Contain:**_

**"akun"**
1. akun
2. email
3. password

_**"badmin_match"**_
1. id
2. name
3. type
4. team_a
5. team_b
6. team_1_set_win
7. team_2_set_win
8. set1_team1_score
9. set1_team2_score
10. set2_team1_score
11. set2_team2_score
12. set3_team1_score
13. set3_team2_score

_**"basket_match"**_
1. id
2. name
3. team_a_name
4. team_b_name
5. team_a_score
6. team_b_score

_**"players_basket"**_
1. id
2. name
3. position
4. points
5. rebounds
6. assits
7. team_name
8. player_id
9. match_id

_**"teams_basket"**_
1. id
2. name
