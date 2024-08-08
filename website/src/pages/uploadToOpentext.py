import requests
import json

client_secret ="cOf42tXQQl5Uq3Zu"
client_id = "0E6GqiQZo9u35RhWV9laySgZE0TUpnW7"
tenant_id="5e0665f4-77c9-41d9-93ab-a4f14958cb2a"

token_url = f'https://au.api.opentext.com/tenants/{tenant_id}/oauth2/token'
data = {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret
}
headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
response = requests.post(token_url, data=data, headers=headers)
response_data = response.json()

if 'access_token' in response_data:
    access_token = response_data['access_token']
    print("Access Token:", access_token)

    # Use the access token to access the desired API
    api_url = 'https://css.au.api.opentext.com/v2/content'  # Replace with the actual API endpoint
    auth_header = {'Authorization': f'Bearer {access_token}'}
    json_data = {"data":[
        {"DeviceName":"MRI Scanner","ManufacturingCO2":500000,"TransportCO2":20000,"UsageCO2":75000,"Manufacturer":"General Hospital","date":"2024-01-01"},
        {"DeviceName":"X-ray","ManufacturingCO2":200000,"TransportCO2":15000,"UsageCO2":60000,"Manufacturer":"General Hospital","date":"2024-02-01"},
        {"DeviceName":"Ventilator","ManufacturingCO2":100000,"TransportCO2":10000,"UsageCO2":60000,"Manufacturer":"County Hospital","date":"2024-03-01"},
        {"DeviceName":"Ultrasound","ManufacturingCO2":80000,"TransportCO2":8000,"UsageCO2":15000,"Manufacturer":"General Hospital","date":"2024-01-01"},
        {"DeviceName":"ECG Machine","ManufacturingCO2":60000,"TransportCO2":5000,"UsageCO2":9000,"Manufacturer":"City Clinic","date":"2024-02-01"},
        {"DeviceName":"CT Scanner","ManufacturingCO2":450000,"TransportCO2":25000,"UsageCO2":60000,"Manufacturer":"General Hospital","date":"2024-03-01"},
        {"DeviceName":"Defibrillator","ManufacturingCO2":30000,"TransportCO2":3000,"UsageCO2":5000,"Manufacturer":"Emergency Center","date":"2024-04-01"},
        {"DeviceName":"Infusion Pump","ManufacturingCO2":25000,"TransportCO2":2000,"UsageCO2":2500,"Manufacturer":"General Hospital","date":"2024-05-01"},
        {"DeviceName":"Dialysis Machine","ManufacturingCO2":90000,"TransportCO2":5000,"UsageCO2":40000,"Manufacturer":"Kidney Center","date":"2024-06-01"}
        ]
    }

    # Convert JSON object to a string and encode it to bytes
    json_str = json.dumps(json_data)
    json_bytes = json_str.encode('utf-8')

    # Create a 'file-like' from the JSON bytes
    from io import BytesIO
    json_file = BytesIO(json_bytes)

    # Prepare the multipart file dictionary
    files = {
        'file': ('data.json', json_file, 'application/json')
    }
    api_response= requests.post(api_url, headers=auth_header, files=files)
    print(api_response.json())
else:
    print("Failed to retrieve access token:", response_data)
