import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { SectionApi } from "../infrastructure/section-api.js";
import { MachineryModelAssembler } from "../infrastructure/machinery-model.assembler.js";
import { PitSectionAssembler } from "../infrastructure/pit-section.assembler.js";

const sectionApi = new SectionApi();

export const useSectionStore = defineStore("section", () => {
  const pitSections = ref([]);
  const machineryModels = ref([]);
  const loading = ref(false);
  const error = ref("");
  const sectionsById = computed(
    () => new Map(pitSections.value.map((section) => [String(section.id), section])),
  );
  const modelsById = computed(
    () => new Map(machineryModels.value.map((model) => [String(model.id), model])),
  );

  async function fetchCatalogs() {
    loading.value = true;
    error.value = "";
    try {
      const [sectionsResponse, modelsResponse] = await Promise.all([
        sectionApi.getPitSections(),
        sectionApi.getMachineryModels(),
      ]);
      pitSections.value = PitSectionAssembler.toEntities(sectionsResponse.data);
      machineryModels.value = MachineryModelAssembler.toEntities(modelsResponse.data);
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : String(cause);
    } finally {
      loading.value = false;
    }
  }

  return {
    pitSections,
    machineryModels,
    loading,
    error,
    sectionsById,
    modelsById,
    fetchCatalogs,
  };
});

export default useSectionStore;
