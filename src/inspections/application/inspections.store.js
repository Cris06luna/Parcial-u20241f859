import { defineStore } from "pinia";
import { ref } from "vue";
import { InspectionRecordAssembler } from "../infrastructure/inspection-record.assembler.js";
import { InspectionApi } from "../infrastructure/inspection-api.js";
import { TelemetryReadingAssembler } from "../infrastructure/telemetry-reading.assembler.js";

const inspectionApi = new InspectionApi();

export const useInspectionsStore = defineStore("inspections", () => {
  const inspectionRecords = ref([]);
  const telemetryReadings = ref([]);
  const loading = ref(false);
  const saving = ref(false);
  const error = ref("");

  async function fetchInspections() {
    loading.value = true;
    error.value = "";
    try {
      const [inspectionsResponse, telemetryResponse] = await Promise.all([
        inspectionApi.getInspectionRecords(),
        inspectionApi.getTelemetryReadings(),
      ]);
      inspectionRecords.value = InspectionRecordAssembler.toEntities(inspectionsResponse.data);
      telemetryReadings.value = TelemetryReadingAssembler.toEntities(telemetryResponse.data);
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : String(cause);
    } finally {
      loading.value = false;
    }
  }

  async function addTelemetryReading(reading) {
    saving.value = true;
    error.value = "";
    try {
      const response = await inspectionApi.createTelemetryReading(reading);
      telemetryReadings.value.unshift(TelemetryReadingAssembler.toEntity(response.data));
      return response.data;
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : String(cause);
      return null;
    } finally {
      saving.value = false;
    }
  }

  return {
    inspectionRecords,
    telemetryReadings,
    loading,
    saving,
    error,
    fetchInspections,
    addTelemetryReading,
  };
});

export default useInspectionsStore;
