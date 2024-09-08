from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('indexgmaps.html')

@app.route('/api/points_of_interest')
def points_of_interest():
    # Charger le CSV
    df = pd.read_csv('../paris_activites_incontournables_final.csv')
    points = df.to_dict(orient='records')
    return jsonify(points)

if __name__ == '__main__':
    app.run(debug=True)
