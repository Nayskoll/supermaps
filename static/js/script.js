// Initialiser la carte
const map = L.map('map').setView([48.8566, 2.3522], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const activities = JSON.parse(localStorage.getItem('filteredActivities')) || [];
const numDays = parseInt(localStorage.getItem('numDays')) || 3; // Par défaut 3 jours
const pins = {}; // Stockage des pins temporaires pour les supprimer plus tard
const dayColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']; // Couleurs par jour

const itineraryContainer = document.getElementById('itinerary');
itineraryContainer.innerHTML = '';  // On vide le contenu avant de générer les jours

// Créer les blocs J1, J2, etc.
for (let i = 1; i <= numDays; i++) {
    const dayContainer = document.createElement('div');
    dayContainer.className = 'day-container';
    dayContainer.innerHTML = `
        <div class="day-title">Jour ${i}</div>
        <div class="activity-list" id="day-${i}" ondrop="drop(event, ${i})" ondragover="allowDrop(event)">
            <!-- Activités pour le jour ${i} -->
        </div>
    `;
    itineraryContainer.appendChild(dayContainer);
}

if (activities.length > 0) {
    displayActivities(activities);
} else {
    document.getElementById('activities-list').innerHTML = '<p>Aucune activité à afficher.</p>';
}

// Afficher la liste des activités
function displayActivities(activities) {
    const activitiesList = document.getElementById('activities-list');
    activitiesList.innerHTML = '';  // On vide d'abord l'élément avant d'ajouter les nouvelles activités

    activitiesList.ondrop = function(event) {
        dropToInitialList(event); // Autoriser le drop vers la liste initiale
    };

    activitiesList.ondragover = function(event) {
        allowDrop(event);
    };

    activities.forEach((activity, index) => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        activityElement.id = `activity-${index}`;
        activityElement.textContent = activity['Nom du lieu'];
        activityElement.dataset.latitude = activity['Latitude'];
        activityElement.dataset.longitude = activity['Longitude'];
        activityElement.dataset.index = index;
        activityElement.dataset.description = activity['Histoire longue'] || "";
        activityElement.dataset.category = activity['Catégorie'] || "";
        activityElement.setAttribute('draggable', 'true');
        activityElement.ondragstart = drag;

        // Ajouter les informations historiques détaillées sous forme de div cachée
        const detailsElement = document.createElement('div');
        detailsElement.className = 'details';
        detailsElement.innerHTML = `
            <p><strong>Histoire longue :</strong> ${activity['Histoire longue']}</p>
        `;
        detailsElement.style.display = 'none';
        activityElement.appendChild(detailsElement);

        // Ajouter un événement de clic pour déplier/replier les détails et ajouter/supprimer un pin
        activityElement.addEventListener('click', function() {
            const details = this.querySelector('.details');
            const lat = this.dataset.latitude;
            const lon = this.dataset.longitude;
            const activityId = this.id;

            if (details.style.display === 'none') {
                // Déplier les détails et ajouter un pin si non existant
                details.style.display = 'block';

                if (!pins[activityId]) {
                    pins[activityId] = L.marker([lat, lon]).addTo(map)
                        .bindPopup(this.textContent);
                }
            } else {
                // Replier les détails et retirer le pin
                details.style.display = 'none';

                if (pins[activityId]) {
                    map.removeLayer(pins[activityId]);
                    delete pins[activityId];
                }
            }
        });

        activitiesList.appendChild(activityElement);
    });
}

// Fonction de recherche dans la liste des activités
function searchActivities() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const activityItems = document.querySelectorAll('.activity-item');

    activityItems.forEach(item => {
        const name = item.textContent.toLowerCase();
        const description = item.dataset.description.toLowerCase();
        const category = item.dataset.category.toLowerCase();

        if (name.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
            item.style.display = 'block'; // Afficher si correspond
        } else {
            item.style.display = 'none'; // Masquer sinon
        }
    });
}

// Fonction pour permettre le drop dans un bloc
function allowDrop(ev) {
    ev.preventDefault();
}

// Fonction pour gérer le drag and drop
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

// Fonction pour gérer le drop dans un bloc jour
function drop(ev, day) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const activityElement = document.getElementById(data);

    if (ev.target.classList.contains('activity-list')) {
        ev.target.appendChild(activityElement);

        const lat = activityElement.dataset.latitude;
        const lon = activityElement.dataset.longitude;
        const color = dayColors[day - 1 % dayColors.length]; // Assigner une couleur selon le jour

        // Ajouter un pin permanent de couleur pour l'activité du jour
        L.marker([lat, lon], {
            icon: L.divIcon({
                className: 'custom-pin',
                html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid black;"></div>`
            })
        }).addTo(map)
        .bindPopup(activityElement.textContent);
    }
}

// Fonction pour gérer le drop vers la liste initiale
function dropToInitialList(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const activityElement = document.getElementById(data);
    const activitiesList = document.getElementById('activities-list');

    activitiesList.appendChild(activityElement); // Remettre l'élément dans la liste des activités

    // Supprimer le pin sur la carte associé à l'activité
    const activityId = activityElement.id;
    if (pins[activityId]) {
        map.removeLayer(pins[activityId]);
        delete pins[activityId];
    }
}

