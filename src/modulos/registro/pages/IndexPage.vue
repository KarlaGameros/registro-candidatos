<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Registro" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- <div class="bg-blue-grey-3 text-white col-12" style="border-radius: 10px">
        <q-toolbar>
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el label="Regidurias" />
            <q-breadcrumbs-el label="Diputaciones" />
            <q-breadcrumbs-el label="Presidencias y Sindicaturas" />
          </q-breadcrumbs>
          <q-btn icon="cloud_download" flat class="absolute-right"></q-btn>
        </q-toolbar>
      </div> -->
    </div>
    <TablaComp />
    <ModalComp />
  </q-page>
</template>
<script setup>
import TablaComp from "../components/TablaComp.vue";
import ModalComp from "../components/ModalComp.vue";
</script>

<style></style>
