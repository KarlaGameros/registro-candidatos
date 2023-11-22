<template>
  <q-layout view="lHh LpR lff">
    <q-header elevated class="bg-pink-1">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Registro de candidaturas </q-toolbar-title>

        <div>v.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <q-item
          clickable
          v-ripple
          class="text-grey-8"
          :to="{ name: 'inicio' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section> Inicio </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          class="text-grey-8"
          :to="{ name: 'registro' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="groups" />
          </q-item-section>

          <q-item-section> Registro de candidaturas </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          class="text-grey-8"
          :to="{ name: 'historial_sustituciones' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="sync_alt" />
          </q-item-section>

          <q-item-section> Historial de sustituciones </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-pink-1 text-white">
      <q-toolbar>
        <q-toolbar-title
          ><div class="text-body1">
            &#169; Unidad Técnica de Informática y Estadística
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scope>
.bg-pink-1 {
  background: #d1308a !important;
}
.text-pink-ieen-1 {
  color: #d1308a !important;
}
</style>
