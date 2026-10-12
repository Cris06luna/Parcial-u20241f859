import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const inspectionEndpointPath    = import.meta.env.VITE_INSPECTION_RECORDS_ENDPOINT_PATH;
const telemetryEndpointPath     = import.meta.env.VITE_TELEMETRY_READINGS_ENDPOINT_PATH;

/**
 * Infrastructure gateway for Section bounded-context endpoints.
 *
 * @class SectionApi
 * @extends BaseApi
 */
export class SectionApi extends BaseApi {
    /**
     * @type {BaseEndpoint}
     * @private
     */
    #inspectionEndpoint;
    /**
     * @type {BaseEndpoint}
     * @private
     */
    #telemetryEndpoint;

    /** Creates endpoint clients for inspection and telemetry. */
    constructor() {
        super();
        this.#inspectionEndpoint = new BaseEndpoint(this, inspectionEndpointPath);
        this.#telemetryEndpoint = new BaseEndpoint(this, telemetryEndpointPath);
    }

    /**
     * Fetches all inspection records.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the inspection records' response.
     */
    getInspectionRecords() {
        return this.#inspectionEndpoint.getAll();
    }

    /**
     * Fetches a telemetry reading by its ID.
     * @param {number|string} id - The ID of the telemetry reading.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the telemetry reading response.
     */
    getTelemetryReadingById(id) {
        return this.#telemetryEndpoint.getById(id);
    }

    /**
     * Creates an inspection record.
     * @param {Object} resource - Inspection record payload.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the created inspection record response.
     */
    createInspectionRecord(resource) {
        return this.#inspectionEndpoint.create(resource);
    }

    /**
     * Updates an inspection record.
     * @param {Object} resource - Inspection record payload (must include id).
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the updated inspection record response.
     */
    updateInspectionRecord(resource) {
        return this.#inspectionEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes an inspection record by its ID.
     * @param {number|string} id - The ID of the inspection record to delete.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the delete response.
     */
    deleteInspectionRecord(id) {
        return this.#inspectionEndpoint.delete(id);
    }

    /**
     * Fetches all telemetry readings.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the telemetry readings' response.
     */
    getTelemetryReadings() {
        return this.#telemetryEndpoint.getAll();
    }

    /**
     * Fetches a telemetry reading by its ID.
     * @param {number|string} id - The ID of the telemetry reading.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the telemetry reading response.
     */
    getTelemetryReadingById(id) {
        return this.#telemetryEndpoint.getById(id);
    }

    /**
     * Creates a telemetry reading resource.
     * @param {Object} resource - Telemetry reading resource payload.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the created telemetry reading response.
     */
    createTelemetryReading(resource) {
        return this.#telemetryEndpoint.create(resource);
    }

    /**
     * Updates a telemetry reading resource.
     * @param {Object} resource - Telemetry reading resource payload (must include id).
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the updated telemetry reading response.
     */
    updateTelemetryReading(resource) {
        return this.#telemetryEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes a telemetry reading by its ID.
     * @param {number|string} id - The ID of the telemetry reading to delete.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the delete response.
     */
    deleteTelemetryReading(id) {
        return this.#telemetryEndpoint.delete(id);
    }
}
