from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/analyze')
def analyze():
    # Generate sample trend data
    trend_data = [{"value": 200 + (i * 10)} for i in range(7)]
    
    result = {
        "totalAnalysis": {
            "count": 281,
            "growth": 43,
            "trend": trend_data
        },
        "vulnerabilities": {
            "count": 312,
            "growth": 19,
            "trend": trend_data
        },
        "analysisOverview": [
            {"name": "Un-Secured Patches", "value": 140, "color": "#2563eb"},
            {"name": "Integrity Failure", "value": 92, "color": "#8b5cf6"},
            {"name": "Integrity Intact", "value": 24, "color": "#f43f5e"}
        ],
        "integrityFailure": [
            {"name": "Google Pixel-7a", "value": 17, "color": "#8b5cf6"},
            {"name": "Redmi 9", "value": 17, "color": "#a78bfa"},
            {"name": "Samsung S21", "value": 18, "color": "#f43f5e"}
        ],
        "devicesList": [
            {
                "id": 1,
                "patchName": "Google CVE 12",
                "impactScore": "358975996162015",
                "status": "Running",
                "severity": "Patch Analysis",
                "testerName": "John Doe",
                "patchVersion": "2023 - v12",
                "createdDate": "10 May 325235"
            },
            {
                    "id": 1337,
                    "patchName": "TestPatch",
                    "impactScore": 10,
                    "status": "Success",
                    "severity": "Critical",
                    "testerNmae": "John Doe",
                    "patchVersion": "1.2.3",
                    "createdDate": "1 Jan 2025",
            }
        ]
    }
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)