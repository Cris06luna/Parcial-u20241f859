import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const inspectionRecordsPath =
  import.meta.env.VITE_INSPECTION_RECORDS_ENDPOINT_PATH ?? "/inspection-records";
const telemetryReadingsPath =
  import.meta.env.VITE_TELEMETRY_READINGS_ENDPOINT_PATH ?? "/telemetry-readings";

export class InspectionApi extends BaseApi {
  #inspectionRecords;
  #telemetryReadings;

  constructor() {
    super();
    this.#inspectionRecords = new BaseEndpoint(this, inspectionRecordsPath);
    this.#telemetryReadings = new BaseEndpoint(this, telemetryReadingsPath);
  }

  getInspectionRecords() {
    return this.#inspectionRecords.getAll();
  }

  getTelemetryReadings() {
    return this.#telemetryReadings.getAll();
  }

  createTelemetryReading(reading) {
    const { id, ...payload } = reading;
    return this.#telemetryReadings.create(payload);
  }
}
