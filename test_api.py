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

def test_image_analysis():
    try:
        # Create a simple test image (1x1 pixel)
        test_image_data = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xdb\x00\x00\x00\x00IEND\xaeB`\x82'
        
        data = {'modality': 'image'}
        files = {'file': ('test.png', test_image_data, 'image/png')}
        
        response = requests.post('http://127.0.0.1:8000/api/v1/analyze', data=data, files=files)
        print(f"Image analysis: {response.status_code}")
        print(f"Response: {response.json()}")
        return True
    except Exception as e:
        print(f"Image analysis failed: {e}")
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
    
    print("\n3. Testing image analysis...")
    if test_image_analysis():
        print("✅ Image analysis passed!")
    else:
        print("❌ Image analysis failed!")
    
    print("\n🎉 API is working! You can now upload images and get results!")