#!/usr/bin/env python3

import requests
import json

# Test the question generation API
def test_generate():
    url = "http://localhost:8001/api/generate-questions"
    data = {
        "test_type": "sat-math",
        "count": 20
    }
    
    response = requests.post(url, json=data)
    result = response.json()
    
    print(f"Success: {result.get('success')}")
    print(f"Question count: {len(result.get('questions', []))}")
    
    for i, q in enumerate(result.get('questions', [])[:3]):
        print(f"\nQuestion {i+1}: {q['question']}")
        print(f"Options: {q['options']}")

if __name__ == "__main__":
    test_generate()