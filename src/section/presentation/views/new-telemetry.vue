<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section class="telemetry-page">
    <p class="eyebrow">{{ t("telemetry.eyebrow") }}</p>
    <h1>{{ t("telemetry.title") }}</h1>
  </section>
</template>
