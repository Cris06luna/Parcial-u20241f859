export class InspectionRecord {
  constructor({
    id = null,
    machineryCode = "",
    pitSectionId = null,
    inspectorName = "",
    status = "pending",
    notes = "",
    inspectedAt = "",
    maxOperatingHours = 0,
  }) {
    this.id = id;
    this.machineryCode = machineryCode;
    this.pitSectionId = pitSectionId;
    this.inspectorName = inspectorName;
    this.status = status;
    this.notes = notes;
    this.inspectedAt = inspectedAt;
    this.maxOperatingHours = maxOperatingHours;
  }
}
