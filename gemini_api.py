from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = "gen-lang-client-0570802190"
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

@app.route('/api/generate-questions', methods=['POST'])
def generate_questions():
    data = request.json
    test_type = data.get('test_type', 'sat-math')
    count = data.get('count', 5)
    
    prompt = f"""Generate {count} {test_type} practice questions. Return ONLY a JSON array:
[{{"id": 1, "question": "What is 2+2?", "options": ["A) 3", "B) 4", "C) 5", "D) 6"], "correct": "B", "topic": "Math", "difficulty": "Easy"}}]"""
    
    try:
        response = requests.post(
            f"{GEMINI_URL}?key={GEMINI_API_KEY}",
            headers={"Content-Type": "application/json"},
            json={
                "contents": [{"parts": [{"text": prompt}]}]
            }
        )
        
        if response.status_code == 200:
            result = response.json()
            text = result['candidates'][0]['content']['parts'][0]['text']
            
            # Extract JSON array
            import re
            json_match = re.search(r'\[.*\]', text, re.DOTALL)
            if json_match:
                questions = json.loads(json_match.group())
                return jsonify({"success": True, "questions": questions})
        
        return jsonify({"success": False, "error": "API call failed"})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    app.run(port=5001, debug=True)