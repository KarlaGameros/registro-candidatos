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
    <ModalVerOficio />
    <TablaHistorial />
  </q-page>
</template>
<script setup>
import { useSustituirStore } from "src/stores/sustituir-store";
import { ref } from "vue";
import ModalVerOficio from "../components/ModalVerOficio.vue";
import TablaHistorial from "../components/TablaHistorial.vue";

//--------------------------------------------------------------------
</script>

<style scope></style>
