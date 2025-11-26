#!/usr/bin/env python3
"""
Backend API Testing Script for FastAPI Server
Tests all endpoints and validates functionality
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from environment
BACKEND_URL = "https://indexing-boost.preview.emergentagent.com/api"

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    print("🔍 Testing Root Endpoint (GET /api/)")
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Root endpoint working correctly")
                return True
            else:
                print("❌ Root endpoint returned unexpected message")
                return False
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Root endpoint test failed: {str(e)}")
        return False

def test_post_status_endpoint():
    """Test POST /api/status endpoint"""
    print("\n🔍 Testing POST Status Endpoint (POST /api/status)")
    try:
        test_data = {
            "client_name": "test_client_backend_api"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/status",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "client_name", "timestamp"]
            
            if all(field in data for field in required_fields):
                if data["client_name"] == test_data["client_name"]:
                    print("✅ POST status endpoint working correctly")
                    return True, data["id"]
                else:
                    print("❌ POST status endpoint returned incorrect client_name")
                    return False, None
            else:
                print(f"❌ POST status endpoint missing required fields: {required_fields}")
                return False, None
        else:
            print(f"❌ POST status endpoint failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ POST status endpoint test failed: {str(e)}")
        return False, None

def test_get_status_endpoint():
    """Test GET /api/status endpoint"""
    print("\n🔍 Testing GET Status Endpoint (GET /api/status)")
    try:
        response = requests.get(f"{BACKEND_URL}/status")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: Found {len(data)} status checks")
            
            if isinstance(data, list):
                if len(data) > 0:
                    # Check structure of first item
                    first_item = data[0]
                    required_fields = ["id", "client_name", "timestamp"]
                    if all(field in first_item for field in required_fields):
                        print("✅ GET status endpoint working correctly")
                        return True
                    else:
                        print(f"❌ GET status endpoint items missing required fields: {required_fields}")
                        return False
                else:
                    print("✅ GET status endpoint working correctly (empty list)")
                    return True
            else:
                print("❌ GET status endpoint should return a list")
                return False
        else:
            print(f"❌ GET status endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ GET status endpoint test failed: {str(e)}")
        return False

def test_cors_configuration():
    """Test CORS configuration"""
    print("\n🔍 Testing CORS Configuration")
    try:
        # Test preflight request
        response = requests.options(
            f"{BACKEND_URL}/status",
            headers={
                "Origin": "https://example.com",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type"
            }
        )
        
        print(f"OPTIONS Status Code: {response.status_code}")
        print(f"CORS Headers: {dict(response.headers)}")
        
        cors_headers = response.headers
        if "access-control-allow-origin" in cors_headers:
            print("✅ CORS is properly configured")
            return True
        else:
            print("❌ CORS headers not found")
            return False
    except Exception as e:
        print(f"❌ CORS test failed: {str(e)}")
        return False

def test_error_handling():
    """Test error handling"""
    print("\n🔍 Testing Error Handling")
    try:
        # Test invalid endpoint
        response = requests.get(f"{BACKEND_URL}/nonexistent")
        print(f"Invalid endpoint status: {response.status_code}")
        
        # Test invalid POST data
        response = requests.post(
            f"{BACKEND_URL}/status",
            json={"invalid_field": "test"},
            headers={"Content-Type": "application/json"}
        )
        print(f"Invalid POST data status: {response.status_code}")
        
        if response.status_code in [400, 422]:  # FastAPI returns 422 for validation errors
            print("✅ Error handling working correctly")
            return True
        else:
            print(f"❌ Expected 400/422 for invalid data, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error handling test failed: {str(e)}")
        return False

def test_mongodb_connection():
    """Test MongoDB connection indirectly through API operations"""
    print("\n🔍 Testing MongoDB Connection (via API)")
    try:
        # Create a status check
        test_data = {"client_name": "mongodb_test_client"}
        post_response = requests.post(
            f"{BACKEND_URL}/status",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        if post_response.status_code != 200:
            print("❌ MongoDB connection test failed - POST request failed")
            return False
        
        created_id = post_response.json()["id"]
        
        # Retrieve all status checks
        get_response = requests.get(f"{BACKEND_URL}/status")
        
        if get_response.status_code != 200:
            print("❌ MongoDB connection test failed - GET request failed")
            return False
        
        status_checks = get_response.json()
        found_item = any(item["id"] == created_id for item in status_checks)
        
        if found_item:
            print("✅ MongoDB connection working correctly (data persisted)")
            return True
        else:
            print("❌ MongoDB connection test failed - created item not found")
            return False
    except Exception as e:
        print(f"❌ MongoDB connection test failed: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("=" * 60)
    print("🚀 Starting Backend API Tests")
    print("=" * 60)
    
    test_results = {}
    
    # Test individual endpoints
    test_results["root_endpoint"] = test_root_endpoint()
    test_results["post_status"], _ = test_post_status_endpoint()
    test_results["get_status"] = test_get_status_endpoint()
    test_results["cors"] = test_cors_configuration()
    test_results["error_handling"] = test_error_handling()
    test_results["mongodb_connection"] = test_mongodb_connection()
    
    print("\n" + "=" * 60)
    print("📊 Test Results Summary")
    print("=" * 60)
    
    all_passed = True
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
        if not result:
            all_passed = False
    
    print("\n" + "=" * 60)
    if all_passed:
        print("🎉 All backend tests PASSED!")
    else:
        print("⚠️  Some backend tests FAILED!")
    print("=" * 60)
    
    return test_results

if __name__ == "__main__":
    results = run_all_tests()
    
    # Exit with error code if any tests failed
    if not all(results.values()):
        sys.exit(1)
    else:
        sys.exit(0)