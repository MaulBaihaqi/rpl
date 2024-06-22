function openEditModal(id, name, type, teamA, teamB, team1SetWin, team2SetWin, set1Team1Score, set1Team2Score, set2Team1Score, set2Team2Score, set3Team1Score, set3Team2Score) {
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editType').value = type;
    document.getElementById('editTeamA').value = teamA;
    document.getElementById('editTeamB').value = teamB;
    document.getElementById('editTeam1SetWin').value = team1SetWin;
    document.getElementById('editTeam2SetWin').value = team2SetWin;
    document.getElementById('editSet1Team1Score').value = set1Team1Score;
    document.getElementById('editSet1Team2Score').value = set1Team2Score;
    document.getElementById('editSet2Team1Score').value = set2Team1Score;
    document.getElementById('editSet2Team2Score').value = set2Team2Score;
    document.getElementById('editSet3Team1Score').value = set3Team1Score;
    document.getElementById('editSet3Team2Score').value = set3Team2Score;
    document.getElementById('editModal').style.display = "flex";
}

function closeEditModal() {
    document.getElementById('editModal').style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('editModal')) {
        closeEditModal();
    }
}