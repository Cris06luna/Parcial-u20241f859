<script setup>
import { useI18n } from "vue-i18n";
import InspectionSummary from "../../../inspections/presentation/components/inspection-summary.vue";

const { t } = useI18n();

const inspections = [
  {
    id: "IN-2048",
    machine: "Haul Truck HT-204",
    inspector: "Alex Morgan",
    date: "2026-10-10",
    status: "inProgress",
    operatingHours: 8421,
  },
  {
    id: "IN-2047",
    machine: "Excavator EX-112",
    inspector: "Jordan Lee",
    date: "2026-10-08",
    status: "completed",
    operatingHours: 6150,
  },
  {
    id: "IN-2046",
    machine: "Drill Rig DR-08",
    inspector: "Taylor Kim",
    date: "2026-10-06",
    status: "pending",
    operatingHours: 3924,
  },
  {
    id: "IN-2045",
    machine: "Loader LD-036",
    inspector: "Casey Rivera",
    date: "2026-10-03",
    status: "completed",
    operatingHours: 7288,
  },
];
</script>

<template>
  <section class="home-page">
    <header class="home-hero">
      <p class="eyebrow">{{ t("home.eyebrow") }}</p>
      <h1>{{ t("home.title") }}</h1>
      <p class="home-description">{{ t("home.content") }}</p>
    </header>

    <section class="inspections-section" :aria-label="t('inspections.title')">
      <div class="section-heading">
        <div>
          <p class="eyebrow">{{ t("inspections.eyebrow") }}</p>
          <h2>{{ t("inspections.title") }}</h2>
        </div>
        <span class="inspection-count">{{ inspections.length }} {{ t("inspections.total") }}</span>
      </div>

      <div class="inspection-grid">
        <InspectionSummary
          v-for="inspection in inspections"
          :key="inspection.id"
          :inspection="inspection"
        />
      </div>
    </section>
  </section>
</template>
