// src/data.js
export const overviewData = {
    totalEmissions: 595000,
    emissionsTrend: [
      { monthYear: '2024-06', emissions: 70000 },
      { monthYear: '2024-07', emissions: 75000 },
      { monthYear: '2024-08', emissions: 76000 }
    ],
    deviceTypeBreakdown: [
      { name: 'MRI', emissions: 75000, color: '#FF6384' },
      { name: 'X-ray', emissions: 60000, color: '#36A2EB' },
      { name: 'Ventilator', emissions: 60000, color: '#FFCE56' }
    ],
    reductionTargets: {
      targetEmissions: 500000,
      currentEmissions: 595000,
      progress: 85
    }
  };
  
  export const deviceMonitoringData = [
    {
      deviceID: 1,
      deviceName: 'MRI Scanner',
      status: 'Active',
      currentUsageHours: 8,
      energyConsumption: 150,
      lastMaintenanceDate: '2024-07-15',
      nextMaintenanceDate: '2024-08-15',
      alerts: ['High energy consumption', 'Maintenance due soon']
    }
  ];
  
  export const dataAnalysis = {
    emissionsByDepartment: [
      {
        department: 'Radiology',
        totalEmissions: 75000,
        trend: [
          { monthYear: '2024-06', emissions: 70000 },
          { monthYear: '2024-07', emissions: 75000 },
          { monthYear: '2024-08', emissions: 76000 }
        ],
        forecast: [
          { monthYear: '2024-09', predictedEmissions: 78000 },
          { monthYear: '2024-10', predictedEmissions: 80000 }
        ],
        recommendations: [
          'Upgrade to energy-efficient MRI machines',
          'Implement energy-saving protocols'
        ]
      }
    ]
  };
  