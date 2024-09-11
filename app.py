from flask import Flask, render_template, request, jsonify
import os
import pandas as pd
import csv
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Charger les données depuis le fichier CSV
file_path = 'paris_activites_incontournables_final.csv'
data = pd.read_csv(file_path)

load_dotenv()  # Charger les variables d'environnement à partir du fichier .env
@app.route('/api/key')
def get_key():
    api_key = os.getenv('MAPBOX_API_KEY')
    return jsonify({'apiKey': api_key})


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/filter', methods=['POST'])
def filter_activities():
    # Récupérer les données du formulaire
    group_type = request.form.get('group_type')
    budget = request.form.get('budget')
    num_days = int(request.form.get('num_days'))

    # Filtrer les données (aucun filtrage pour l'instant pour tester)
    filtered_data = data[['Nom du lieu', 'Latitude', 'Longitude', 'Note d\'intérêt', 'Note Google Maps', 'Résumé des avis Google Maps', 'Histoire courte', 'Histoire longue']]

    # Convertir les données en JSON pour l'envoyer au front-end
    activities = filtered_data.to_dict(orient='records')

    # Ajouter un print pour vérifier la réponse côté serveur
    print("Activités envoyées au client :", activities)

    return jsonify(activities)

@app.route('/get_activities')
def get_activities():
    csv_file = 'paris_activites_incontournables_final.csv'
    if not os.path.exists(csv_file):
        return jsonify({"error": "CSV file not found"}), 404
    
    activities = []
    with open(csv_file, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            activities.append(row)
    
    return jsonify(activities)

@app.route('/get_restaurants')
def get_restaurants():
    csv_file = 'paris_restaurants_detailed.csv'  # Utilisez le nouveau fichier CSV
    if not os.path.exists(csv_file):
        return jsonify({"error": "CSV file not found"}), 404
    
    restaurants = []
    with open(csv_file, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Adaptation : Transformer chaque ligne en un dictionnaire
            restaurant = {
                "Nom du lieu": row["Nom du lieu"],
                "Latitude": row["Latitude"],
                "Longitude": row["Longitude"],
                "Note d'intérêt": row["Note d'intérêt"],
                "Note Google Maps": row["Note Google Maps"],
                "Résumé des avis Google Maps": row["Résumé des avis Google Maps"],
                "Résumé rapide": row["Résumé rapide"],
                "Catégorie": row["Catégorie"],
                "Budget": row["Budget"]
            }
            restaurants.append(restaurant)
    
    return jsonify(restaurants)

@app.route('/itinerary')
def itinerary():
    return render_template('itinerary.html')


if __name__ == '__main__':
    app.run(debug=True)
