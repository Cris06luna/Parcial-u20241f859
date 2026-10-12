export class TelemetryReading {
  constructor({
    id = null,
    machineryCode = "",
    modelId = null,
    pitSectionId = null,
    operatingHours = 0,
    engineTemperatureC = 0,
    oilPressurePsi = 0,
    alertTriggered = false,
    registeredAt = "",
  }) {
    this.id = id;
    this.machineryCode = machineryCode;
    this.modelId = modelId;
    this.pitSectionId = pitSectionId;
    this.operatingHours = operatingHours;
    this.engineTemperatureC = engineTemperatureC;
    this.oilPressurePsi = oilPressurePsi;
    this.alertTriggered = alertTriggered;
    this.registeredAt = registeredAt;
  }
}
