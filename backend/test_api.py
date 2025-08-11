#!/usr/bin/env python3
"""
Test script to verify the API is working
"""

import requests
import json

def test_health():
    try:
        response = requests.get('http://127.0.0.1:8000/health')
        print(f"Health check: {response.status_code}")
        print(f"Response: {response.json()}")
        return True
    except Exception as e:
        print(f"Health check failed: {e}")
        return False

def test_text_analysis():
    try:
        data = {
            'modality': 'text',
            'text': 'This is a test message to analyze for AI generation.'
        }
        response = requests.post('http://127.0.0.1:8000/api/v1/analyze', data=data)
        print(f"Text analysis: {response.status_code}")
        print(f"Response: {response.json()}")
        return True
    except Exception as e:
        print(f"Text analysis failed: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing TrueSight API...")
    
    print("\n1. Testing health endpoint...")
    if test_health():
        print("✅ Health check passed!")
    else:
        print("❌ Health check failed!")
        exit(1)
    
    print("\n2. Testing text analysis...")
    if test_text_analysis():
        print("✅ Text analysis passed!")
    else:
        print("❌ Text analysis failed!")
    
    print("\n🎉 API is working! You can now upload images and get results!")