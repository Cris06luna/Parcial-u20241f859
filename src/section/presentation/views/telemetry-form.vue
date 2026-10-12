<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import usePublishingStore from "../../application/section.store.js";
import {computed, onMounted, ref} from "vue";
import {Telemetry} from "../../domain/model/telemetry.entity.js";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const store = usePublishingStore();
const {errors, addTelemetry, updateTelemetry} = store;

const form = ref({name: ''});
const isEdit = computed(() => !!route.params.id);

onMounted(() => {
  console.log(route.params.id);
  if (isEdit.value) {
    const telemetry = getTelemetryById(route.params.id);
    console.log(telemetry);
    if (telemetry) form.value.name = telemetry.name; else router.push({name: 'section-telemetry'});
  }
});

/**
 * Retrieves a telemetry by its ID.
 * @param {string} id - The ID of the telemetry.
 * @returns {Telemetry|null} - The telemetry object if found, null otherwise.
 */
function getTelemetryById(id) {
  return store.getTelemetryById(id);
}

/**
 * Saves the telemetry, either by adding a new one or updating an existing one.
 */
const saveTelemetry = () => {
  const telemetry = new Telemetry({
    id: isEdit.value ? route.params.id : null,
    name: form.value.name,
  });
  if (isEdit.value) updateTelemetry(telemetry); else addTelemetry(telemetry);
  navigateBack();
};

/**
 * Navigates back to the publishing categories list.
 */
const navigateBack = () => {
  router.push({name: 'section-telemetry'});
};
</script>

<template>
  <div class="p-4">
    <h1>{{ isEdit ? t('telemetry.edit-title') : t('telemetry.new-title') }}</h1>
    <form @submit.prevent="saveTelemetry">
      <div class="field mb-3">
        <label for="name">{{ t('telemetry.name') }}</label>
        <pv-input-text id="name" v-model="form.name" class="w-full" required/>
      </div>
      <pv-button :label="t('telemetry.save')" icon="pi pi-save" type="submit"/>
      <pv-button :label="t('telemetry.cancel')" class="ml-2" severity="secondary" @click="navigateBack"/>
    </form>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
  </div>
</template>

<style scoped>

</style>