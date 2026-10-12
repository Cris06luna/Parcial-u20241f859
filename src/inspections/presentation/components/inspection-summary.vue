<script setup>
import { useI18n } from "vue-i18n";

defineProps({
  inspection: {
    type: Object,
    required: true,
  },
});

const { t, te, locale } = useI18n();

function normalizedStatus(status) {
  const normalized = String(status || "pending").toLowerCase().replace(/[^a-z]/g, "");
  return normalized === "inprogress" ? "inProgress" : normalized;
}

function statusLabel(status) {
  const key = `inspections.status.${normalizedStatus(status)}`;
  return te(key) ? t(key) : status;
}
</script>

<template>
  <pv-card class="inspection-card">
    <template #content>
      <div class="inspection-card-content">
        <div class="inspection-card-top">
          <div>
            <p class="inspection-type">{{ t("inspections.summary") }}</p>
            <h3>{{ inspection.machineName }}</h3>
            <p v-if="inspection.manufacturer" class="inspection-manufacturer">{{ inspection.manufacturer }}</p>
          </div>
          <span class="inspection-status" :class="`inspection-status--${normalizedStatus(inspection.status)}`">
            {{ statusLabel(inspection.status) }}
          </span>
        </div>

        <p class="inspection-id">{{ t("inspections.id") }}: {{ inspection.id }}</p>
        <div class="inspection-details">
          <div class="inspection-detail">
            <i class="pi pi-user" aria-hidden="true"></i>
            <span>{{ inspection.inspectorName || t("inspections.unknownInspector") }}</span>
          </div>
          <div class="inspection-detail">
            <i class="pi pi-calendar" aria-hidden="true"></i>
            <span>
              {{
                inspection.inspectedAt
                  ? new Date(inspection.inspectedAt).toLocaleDateString(locale)
                  : t("common.notAvailable")
              }}
            </span>
          </div>
          <div class="inspection-detail">
            <i class="pi pi-map-marker" aria-hidden="true"></i>
            <span>{{ inspection.sectionName }}</span>
          </div>
          <div v-if="inspection.maxOperatingHours != null" class="inspection-detail">
            <i class="pi pi-clock" aria-hidden="true"></i>
            <span>{{ inspection.maxOperatingHours.toLocaleString() }} {{ t("inspections.hours") }}</span>
          </div>
        </div>
        <p v-if="inspection.notes" class="inspection-notes">{{ inspection.notes }}</p>
      </div>
    </template>
  </pv-card>
</template>
