// array of vehicle objects
const vehicles = [
  {
    id: 1,
    plateNumber: "ABC-1234",
    model: "Toyota Hilux 2022",
    driver: "Ahmed Mostafa",
    status: "active", // or "maintenance"
    distanceUsedKm: 78500,
    maintenanceStatus: {
      lastMaintenanceDate: "2025-03-10",
      upcomingMaintenanceDate: "2025-07-10",
      needsMaintenance: false,
    },
    tyres: {
      lastChangedDate: "2024-12-01",
    },
    battery: {
      lastChangedDate: "2024-09-15",
    },
  },
  {
    id: 2,
    plateNumber: "XYZ-7890",
    model: "Ford Transit 2021",
    driver: "Mona Khaled",
    status: "maintenance", // or "active"
    distanceUsedKm: 120350,
    maintenanceStatus: {
      lastMaintenanceDate: "2025-04-22",
      upcomingMaintenanceDate: "2025-08-22",
      needsMaintenance: true,
    },
    tyres: {
      lastChangedDate: "2024-11-15",
    },
    battery: {
      lastChangedDate: "2023-12-10",
    },
  },
];

export { vehicles };
