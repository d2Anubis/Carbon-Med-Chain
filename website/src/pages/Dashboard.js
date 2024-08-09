import React, { useState, useEffect } from 'react';
import EmissionsTrendChart from '../components/EmissionsTrendChart';
import './Dashboard.css';
import CO2BreakdownStackedBarChart from '../components/CO2BreakdownStackedBarChart';
import ModeOfTrasport from '../components/ModeOfTransport';

import Web3 from 'web3';
import CarbonDataStorage from './abis/CarbonDataStorage.json';

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545'); // Ganache URL
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const contract = new web3.eth.Contract(CarbonDataStorage.abi, contractAddress);

const axios = require('axios');
const qs = require('qs');

const clientSecret = "cOf42tXQQl5Uq3Zu";
const clientId = "0E6GqiQZo9u35RhWV9laySgZE0TUpnW7";
const tenantId = "5e0665f4-77c9-41d9-93ab-a4f14958cb2a";

const tokenUrl = `https://au.api.opentext.com/tenants/${tenantId}/oauth2/token`;
const data = qs.stringify({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
});
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

axios.post(tokenUrl, data, { headers })
    .then(response => {
        const response_data = response.data;
        const fileId = "cj1iODY4YWJhZC1iOTMzLTQwY2YtOGFjNy04NTNlNmViOWM5NzUmaT0zZjgzODg5MS1mMjA0LTQ5YTQtOWNlMy00ZDQxMWNiOTBmNjk=";
        if ('access_token' in response_data) {
            const accessToken = response_data['access_token'];
            console.log("Access Token:", accessToken);
            // Use the access token to access the desired API
            const apiUrl = `https://css.au.api.opentext.com/v2/content/${fileId}/download`;  // Replace with the actual API endpoint
            const authHeader = { Authorization: `Bearer ${accessToken}` };
            axios.get(apiUrl, { headers: authHeader })
                .then(apiResponse => {
                    const data = apiResponse.data;
                    console.log(data);
                })
                .catch(error => {
                    console.error("Error accessing the API:", error);
                });
        } else {
            console.error("Failed to retrieve access token:", response_data);
        }
    })
    .catch(error => {
        console.error("Error getting access token:", error);
    });


const formatDate = (dateString) => {
  const options = { month: 'long' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

const groupedDateData = data.reduce((acc, item) => {
  const date = formatDate(item.date);
  if (!acc[date]) {
    acc[date] = { ManufacturingCO2: 0, TransportCO2: 0, UsageCO2: 0 };
  }
  acc[date].ManufacturingCO2 += item.ManufacturingCO2;
  acc[date].TransportCO2 += item.TransportCO2;
  acc[date].UsageCO2 += item.UsageCO2;
  return acc;
}, {});

const groupedDeviceData = data.reduce((acc, item) => {
  const DeviceName = item.DeviceName
  if (!acc[DeviceName]) {
    acc[DeviceName] = { ManufacturingCO2: 0, TransportCO2: 0, UsageCO2: 0 };
  }
  acc[DeviceName].ManufacturingCO2 += item.ManufacturingCO2;
  acc[DeviceName].TransportCO2 += item.TransportCO2;
  acc[DeviceName].UsageCO2 += item.UsageCO2;
  return acc;
}, {});


const groupedManufacturerData = data.reduce((acc, item) => {
  const Manufacturer = item.Manufacturer
  if (!acc[Manufacturer]) {
    acc[Manufacturer] = { ManufacturingCO2: 0, TransportCO2: 0, UsageCO2: 0 };
  }
  acc[Manufacturer].ManufacturingCO2 += item.ManufacturingCO2;
  acc[Manufacturer].TransportCO2 += item.TransportCO2;
  acc[Manufacturer].UsageCO2 += item.UsageCO2;
  return acc;
}, {});

const manufacturerGpData = Object.keys(groupedManufacturerData).map(Manufacturer => ({
  Manufacturer,
  ...groupedManufacturerData[Manufacturer],
}));

const dateGpData = Object.keys(groupedDateData).map(date => ({
  date,
  ...groupedDateData[date],
}));

const deviceGpData = Object.keys(groupedDeviceData).map(DeviceName => ({
  DeviceName,
  ...groupedDeviceData[DeviceName],
}));

const emissionsTrendData = {
  labels: dateGpData.map(item => item.date),
  datasets: [
    {
      label: 'Manufacturing CO2 Emissions Trend',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
      hoverBorderColor: 'rgba(54, 162, 235, 1)',
      data: dateGpData.map(item => item.ManufacturingCO2),
    },
    {
      label: 'Transport CO2 Emissions Trend',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
      hoverBorderColor: 'rgba(75, 192, 192, 1)',
      data: dateGpData.map(item => item.TransportCO2),
    },
    {
      label: 'Usage CO2 Emissions Trend',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)',
      hoverBorderColor: 'rgba(153, 102, 255, 1)',
      data: dateGpData.map(item => item.UsageCO2),
    },
  ],
};

const breakdownByDeviceData = {
  labels: deviceGpData.map(item => item.DeviceName),
  datasets: [
    {
      label: 'Manufacturing CO2 Emissions Trend',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
      hoverBorderColor: 'rgba(54, 162, 235, 1)',
      data: deviceGpData.map(item => item.ManufacturingCO2),
    },
    {
      label: 'Transport CO2 Emissions Trend',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
      hoverBorderColor: 'rgba(75, 192, 192, 1)',
      data: dateGpData.map(item => item.TransportCO2),
    },
    {
      label: 'Usage CO2 Emissions Trend',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)',
      hoverBorderColor: 'rgba(153, 102, 255, 1)',
      data: dateGpData.map(item => item.UsageCO2),
    }
   ]
}

const manufacturerData = {
  labels: manufacturerGpData.map(item => item.Manufacturer),
  datasets: [
    {
      label: 'Manufacturing CO2 Emissions Trend',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
      hoverBorderColor: 'rgba(54, 162, 235, 1)',
      data: manufacturerGpData.map(item => item.ManufacturingCO2),
    },
    {
      label: 'Transport CO2 Emissions Trend',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
      hoverBorderColor: 'rgba(75, 192, 192, 1)',
      data: manufacturerGpData.map(item => item.TransportCO2),
    },
    {
      label: 'Usage CO2 Emissions Trend',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)',
      hoverBorderColor: 'rgba(153, 102, 255, 1)',
      data: manufacturerGpData.map(item => item.UsageCO2),
    }
   ]
}


const Dashboard = () => {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        display: true,
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (<div> 
    <h1>Dashboard</h1>
    <br/><br/>

    {/* <button className="refresh-button" onClick={handleRefreshClick}>
        Refresh
      </button>
      <p className="current-time">Current Time: {currentTime}</p> */}
    <div className="chart-container2">
      <h3>Carbon Emission Breakdown by Device</h3>
      <CO2BreakdownStackedBarChart data={data} />
    </div>

    <div className="chart-container2">
        <h3>Emissions Trend</h3>
        <EmissionsTrendChart data={emissionsTrendData} options={commonOptions} />
      </div>

      <div className="chart-container2">
        <h3>Carbon Emission Breakdown by Manufacturer</h3>
        <EmissionsTrendChart data={manufacturerData} options={commonOptions} />
      </div>

    <div>  <ModeOfTrasport/> </div>
    </div>
  );
};

export default Dashboard;
