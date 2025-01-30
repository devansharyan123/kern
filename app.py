from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/analyze')
def analyze():
    result = {
        "activeData": {
            "devicesList": [
                {
                    "patchName": "TestPatch",
                    "impactScore": 10,
                    "status": "Success",
                    "severity": "Critical",
                    "testerNmae": "John Doe",
                    "patchVersion": "1.2.3",
                    "createdDate": "1 Jan 2025",
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
            ],
            "totalAnalysis": {
                "count": 1,
                "growth": 1,
                "trend": 1,
            },
            "vulnerabilityAnalysis": {
                "count": 2,
                "growth": 2,
                "trend": 2,
            },
            "analysisOverview": 123,
            "integrityFailure": 456,
        }
    }
    return result

if __name__ == "__main__":
    app.run(debug=True)