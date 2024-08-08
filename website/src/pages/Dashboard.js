import React, { useState, useEffect } from 'react';
import EmissionsTrendChart from '../components/EmissionsTrendChart';
import './Dashboard.css';
import CO2BreakdownStackedBarChart from '../components/CO2BreakdownStackedBarChart';
import ModeOfTrasport from '../components/ModeOfTransport';

// import Web3 from 'web3';
// import CarbonDataStorage from './abis/CarbonDataStorage.json';

// const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545'); // Ganache URL
// const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
// const contract = new web3.eth.Contract(CarbonDataStorage.abi, contractAddress);

const data = [
  { DeviceName: 'MRI Scanner', ManufacturingCO2: 500000, TransportCO2: 20000, UsageCO2: 75000, Manufacturer: 'General Hospital', date: '2024-01-01'},
  { DeviceName: 'X-ray', ManufacturingCO2: 200000, TransportCO2: 15000, UsageCO2: 60000, Manufacturer: 'General Hospital',  date: '2024-02-01'},
  { DeviceName: 'Ventilator', ManufacturingCO2: 100000, TransportCO2: 10000, UsageCO2: 60000, Manufacturer: 'County Hospital', date: '2024-03-01'},
  { DeviceName: 'Ultrasound', ManufacturingCO2: 80000, TransportCO2: 8000, UsageCO2: 15000, Manufacturer: 'General Hospital', date: '2024-01-01'},
  { DeviceName: 'ECG Machine', ManufacturingCO2: 60000, TransportCO2: 5000, UsageCO2: 9000, Manufacturer: 'City Clinic', date: '2024-02-01'},
  { DeviceName: 'CT Scanner', ManufacturingCO2: 450000, TransportCO2: 25000, UsageCO2: 60000, Manufacturer: 'General Hospital', date: '2024-03-01'},
  { DeviceName: 'Defibrillator', ManufacturingCO2: 30000, TransportCO2: 3000, UsageCO2: 5000, Manufacturer: 'Emergency Center', date: '2024-04-01'},
  { DeviceName: 'Infusion Pump', ManufacturingCO2: 25000, TransportCO2: 2000, UsageCO2: 2500, Manufacturer: 'General Hospital', date: '2024-05-01'},
  { DeviceName: 'Dialysis Machine', ManufacturingCO2: 90000, TransportCO2: 5000, UsageCO2: 40000, Manufacturer: 'Kidney Center', date: '2024-06-01'},
];

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
