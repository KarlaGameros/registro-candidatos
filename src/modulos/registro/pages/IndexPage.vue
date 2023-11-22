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
      <div class="col">
        <div class="text-right">
          <q-btn
            type="button"
            class="q-ma-sm"
            color="pink-1"
            icon-right="add_circle_outline"
            label="Nuevo"
            @click="actualizarModal(true)"
          />
        </div>
      </div>
    </div>
    <div class="q-pt-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-2 text-grey-7"
          active-color="blue-grey-4"
          indicator-color="blue-grey-4"
          align="justify"
        >
          <q-tab name="diputaciones" label="Diputaciones" />
          <q-tab
            name="presidenciaSindicatura"
            label="Presidencia y Sindicaturas"
          />
          <q-tab name="regidurias" label="Regidurias" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="text-white">
          <q-tab-panel name="diputaciones">
            <TablaTipoEleccion :tab="'diputaciones'" />
          </q-tab-panel>

          <q-tab-panel name="presidenciaSindicatura">
            <TablaTipoEleccion :tab="'presidenciaSindicatura'" />
          </q-tab-panel>

          <q-tab-panel name="regidurias">
            <TablaTipoEleccion :tab="'regidurias'" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <ModalComp :tab="tab" />
  </q-page>
</template>
<script setup>
import { useExampleStore } from "src/stores/example-store";
import { ref } from "vue";
import TablaTipoEleccion from "../components/TablaTipoEleccion.vue";
import ModalComp from "../components/ModalComp.vue";

//--------------------------------------------------------------------

const exampleStore = useExampleStore();
const tab = ref("diputaciones");

//--------------------------------------------------------------------

const actualizarModal = () => {
  exampleStore.actualizarModal(true);
};

//--------------------------------------------------------------------
</script>

<style scope>
.user__info {
  display: flex;
  align-items: left;
  gap: 12px;
}
.user__name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  text-align: left;
}
.user__email {
  font-size: 12px;
  color: #4b5563;
}
</style>
