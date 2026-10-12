import { InspectionRecord } from "../domain/model/inspection-record.entity.js";

export class InspectionRecordAssembler {
  static toEntity(resource) {
    return new InspectionRecord(resource);
  }

  static toEntities(resources) {
    return resources.map((resource) => this.toEntity(resource));
  }
}
