from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)

# Charger les données depuis le fichier CSV
file_path = 'paris_activites_incontournables_final.csv'
data = pd.read_csv(file_path)

# Vérification du contenu du CSV
print("Données du CSV chargées :")
print(data.head())  # Affiche les premières lignes du CSV pour vérifier


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



@app.route('/itinerary')
def itinerary():
    return render_template('itinerary.html')


if __name__ == '__main__':
    app.run(debug=True)
