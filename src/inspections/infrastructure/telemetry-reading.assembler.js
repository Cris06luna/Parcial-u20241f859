import { TelemetryReading } from "../domain/model/telemetry-reading.entity.js";

export class TelemetryReadingAssembler {
  static toEntity(resource) {
    return new TelemetryReading(resource);
  }

  static toEntities(resources) {
    return resources.map((resource) => this.toEntity(resource));
  }
}
