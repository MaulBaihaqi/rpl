document.addEventListener('DOMContentLoaded', function() {
    fetch('/get_teams')
        .then(response => response.json())
        .then(data => {
            const teamASelect = document.getElementById('teamASelect');
            const teamBSelect = document.getElementById('teamBSelect');
            const playerTeamSelect = document.getElementById('playerTeamSelect');
            data.forEach(team => {
                const option = document.createElement('option');
                option.value = team.id;
                option.textContent = team.name;
                teamASelect.appendChild(option);
                teamBSelect.appendChild(option.cloneNode(true));
                playerTeamSelect.appendChild(option.cloneNode(true));
            });
        });

    fetch('/get_players')
        .then(response => response.json())
        .then(data => {
            const playerSelect = document.getElementById('playerSelect');
            data.forEach(player => {
                const option = document.createElement('option');
                option.value = player.id;
                option.textContent = player.name;
                playerSelect.appendChild(option);
            });
        });

    const handleFormSubmission = (formId, endpoint) => {
        document.getElementById(formId).addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData.entries())),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                console.log(`${formId} added:`, data);
                window.location.reload();
            })
            .catch(error => console.error(`Error in ${formId}:`, error));
        });
    };

    handleFormSubmission('playerForm', '/submit_add_player');
    
    fetch('/get_matches_basketball')
        .then(response => response.json())
        .then(data => {
            const matchesDiv = document.getElementById('matches');
            data.forEach(match => {
                const matchDiv = document.createElement('div');
                matchDiv.classList.add('match');
                matchDiv.innerHTML = `
                    <div class="match-name">${match.name}</div>
                    <div class="match-teams">
                        ${match.team_a} (${match.team_a_score}) vs ${match.team_b} (${match.team_b_score})
                    </div>
                `;
                matchesDiv.appendChild(matchDiv);
            });
        });
});