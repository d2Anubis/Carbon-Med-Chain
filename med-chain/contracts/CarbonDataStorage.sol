// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonDataStorage {
    struct DeviceData {
        string DeviceName;
        uint ManufacturingCO2;
        uint TransportCO2;
        uint UsageCO2;
        string Manufacturer;
        string date;
    }

    DeviceData[] public deviceDataList;

    function addDeviceData(
        string memory _DeviceName,
        uint _ManufacturingCO2,
        uint _TransportCO2,
        uint _UsageCO2,
        string memory _Manufacturer,
        string memory _date
    ) public {
        deviceDataList.push(DeviceData({
            DeviceName: _DeviceName,
            ManufacturingCO2: _ManufacturingCO2,
            TransportCO2: _TransportCO2,
            UsageCO2: _UsageCO2,
            Manufacturer: _Manufacturer,
            date: _date
        }));
    }

    function getDeviceData(uint index) public view returns (DeviceData memory) {
        require(index < deviceDataList.length, "Index out of bounds");
        return deviceDataList[index];
    }
}
