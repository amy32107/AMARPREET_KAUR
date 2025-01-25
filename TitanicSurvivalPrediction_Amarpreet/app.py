from flask import Flask, request, jsonify, send_file
import joblib
from flask_cors import CORS
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load trained model
model = joblib.load('titanic_model.pkl')

# Get the current directory (where app.py is located)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def home():
    # Serve the existing index.html from the project folder
    return send_file(os.path.join(BASE_DIR, 'index.html'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if the request is JSON (for API usage)
        if request.is_json:
            data = request.get_json()
            input_data = np.array([[data['pclass'], data['age'], data['fare'], data['family_size']]])
        else:
            # Handling form submission from HTML frontend
            pclass = int(request.form['pclass'])
            age = float(request.form['age'])
            fare = float(request.form['fare'])
            family_size = int(request.form['family_size'])
            input_data = np.array([[pclass, age, fare, family_size]])

        prediction = model.predict(input_data)[0]
        result = "Survived" if prediction else "Did not survive"

        # If request came from JSON, return JSON response
        if request.is_json:
            return jsonify({'prediction': result})
        else:
            return f"<h1>Prediction: {result}</h1>"

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
