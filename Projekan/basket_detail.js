let currentPlayerId = null; 

function openEditForm(teamName, teamScore) {
    document.getElementById("editTeamName").value = teamName;
    document.getElementById("editTeamScore").value = teamScore;
    document.getElementById("editFormContainer").style.display = "flex";
}

function closeEditForm() {
    document.getElementById("editFormContainer").style.display = "none";
}

function saveTeam() {
const teamName = document.getElementById("editTeamName").value;
const teamScore = document.getElementById("editTeamScore").value;

const matchId = "some-match-id"; 

fetch(`/api/match/${matchId}`, {
method: 'PUT',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({
    team_a_score: teamScore,  
    team_b_score: teamScore  
})
})
.then(response => response.json())
.then(data => {
console.log('Success:', data);
closeEditForm();
})
.catch((error) => {
console.error('Error:', error);
});
}


function openPlayerForm() {
    document.getElementById("playerFormContainer").style.display = "flex";
}

function closePlayerForm() {
    document.getElementById("playerFormContainer").style.display = "none";
    currentPlayerId = null; 
}

function savePlayer() {
    const playerName = document.getElementById("playerName").value;
    const playerPosition = document.getElementById("playerPosition").value;
    const playerPoints = document.getElementById("playerPoints").value;
    const playerRebounds = document.getElementById("playerRebounds").value;
    const playerAssists = document.getElementById("playerAssists").value;

    const url = currentPlayerId ? `/api/player/${currentPlayerId}` : '/api/player';
    const method = currentPlayerId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: playerName,
            position: playerPosition,
            points: playerPoints,
            rebounds: playerRebounds,
            assists: playerAssists
        })
    }).then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            location.reload();
        }
    }).catch(error => {
        console.error('Error:', error);
    });

    closePlayerForm();
}

function editPlayer(playerId, playerName, playerPosition, playerPoints, playerRebounds, playerAssists) {
    currentPlayerId = playerId;
    document.getElementById("playerName").value = playerName;
    document.getElementById("playerPosition").value = playerPosition;
    document.getElementById("playerPoints").value = playerPoints;
    document.getElementById("playerRebounds").value = playerRebounds;
    document.getElementById("playerAssists").value = playerAssists;
    openPlayerForm();
}

function deletePlayer(playerId) {
    if (confirm('Are you sure you want to delete this player?')) {
        fetch(`/api/player/${playerId}`, {
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                location.reload();
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }
}