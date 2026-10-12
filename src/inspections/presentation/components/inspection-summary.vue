<script setup>
import { useI18n } from "vue-i18n";

defineProps({
  inspection: {
    type: Object,
    required: true,
  },
});

const { t, d } = useI18n();
</script>

<template>
  <pv-card class="inspection-card">
    <template #content>
      <div class="inspection-card-content">
        <div class="inspection-card-top">
          <div>
            <p class="inspection-type">{{ t("inspections.summary") }}</p>
            <h3>{{ inspection.machine }}</h3>
          </div>
          <span class="inspection-status" :class="`inspection-status--${inspection.status}`">
            {{ t(`inspections.status.${inspection.status}`) }}
          </span>
        </div>

        <p class="inspection-id">{{ inspection.id }}</p>
        <div class="inspection-details">
          <div class="inspection-detail">
            <i class="pi pi-user" aria-hidden="true"></i>
            <span>{{ inspection.inspector }}</span>
          </div>
          <div class="inspection-detail">
            <i class="pi pi-calendar" aria-hidden="true"></i>
            <span>{{ d(new Date(`${inspection.date}T12:00:00`), "short") }}</span>
          </div>
          <div class="inspection-detail">
            <i class="pi pi-clock" aria-hidden="true"></i>
            <span>{{ inspection.operatingHours.toLocaleString() }} {{ t("inspections.hours") }}</span>
          </div>
        </div>
      </div>
    </template>
  </pv-card>
</template>
