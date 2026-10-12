<script setup>
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useInspectionsStore } from "../../../inspections/application/inspections.store.js";
import InspectionSummary from "../../../inspections/presentation/components/inspection-summary.vue";
import useSectionStore from "../../../section/application/section.store.js";

const { t } = useI18n();
const inspectionsStore = useInspectionsStore();
const sectionStore = useSectionStore();

const inspections = computed(() =>
  [...inspectionsStore.inspectionRecords]
    .sort((a, b) => new Date(b.inspectedAt).getTime() - new Date(a.inspectedAt).getTime())
    .map((inspection) => {
      const model = sectionStore.machineryModels.find(
        (item) =>
          String(item.id) === String(inspection.machineryCode) ||
          item.modelName === inspection.machineryCode,
      );
      return {
        ...inspection,
        machineName: model?.modelName || inspection.machineryCode,
        manufacturer: model?.manufacturer || "",
        sectionName:
          sectionStore.sectionsById.get(String(inspection.pitSectionId))?.name ||
          String(inspection.pitSectionId),
      };
    }),
);

onMounted(() => {
  inspectionsStore.fetchInspections();
  sectionStore.fetchCatalogs();
});


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

      <p v-if="inspectionsStore.loading || sectionStore.loading" class="state-message">
        {{ t("common.loading") }}
      </p>
      <p v-if="inspectionsStore.error || sectionStore.error" class="state-message state-message--error" role="alert">
        {{ t("common.loadError") }}
      </p>
      <p v-if="!inspectionsStore.loading && !inspectionsStore.error && inspections.length === 0" class="state-message">
        {{ t("inspections.empty") }}
      </p>
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
