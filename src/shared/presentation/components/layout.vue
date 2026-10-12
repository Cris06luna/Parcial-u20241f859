<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./language-switcher.vue";

const { t } = useI18n();
const sidebarOpen = ref(false);

const navigationItems = [
  { label: "option.home", to: "/home", icon: "pi pi-home" },
  { label: "option.telemetry", to: "/telemetry/new", icon: "pi pi-chart-line" },
];
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />
  <div class="app-shell">
    <button
      class="sidebar-toggle"
      type="button"
      :aria-label="t('navigation.toggle')"
      @click="sidebarOpen = !sidebarOpen"
    >
      <i class="pi pi-bars" aria-hidden="true"></i>
    </button>
    <button
      v-if="sidebarOpen"
      class="sidebar-backdrop"
      type="button"
      :aria-label="t('navigation.close')"
      @click="sidebarOpen = false"
    ></button>

    <aside class="app-sidebar" :class="{ 'app-sidebar--open': sidebarOpen }">
      <router-link class="brand" to="/home" @click="sidebarOpen = false">
        <span class="brand-mark"><i class="pi pi-compass" aria-hidden="true"></i></span>
        <span>GeoMine</span>
      </router-link>

      <nav class="sidebar-navigation" :aria-label="t('navigation.main')">
        <router-link
          v-for="item in navigationItems"
          :key="item.to"
          class="sidebar-link"
          :to="item.to"
          @click="sidebarOpen = false"
        >
          <i :class="item.icon" aria-hidden="true"></i>
          <span>{{ t(item.label) }}</span>
        </router-link>
      </nav>

      <div class="sidebar-language">
        <span class="sidebar-language-label">{{ t("navigation.language") }}</span>
        <LanguageSwitcher />
      </div>
    </aside>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>
