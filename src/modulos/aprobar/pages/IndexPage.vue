<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el
              icon="list_alt"
              label="Historial de aprobaciones"
            />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <div class="q-pa-sm">
      <q-banner
        inline-actions
        class="text-justify bg-grey-2"
        style="border-radius: 20px"
      >
        <template v-slot:avatar>
          <q-icon name="info" color="grey" />
        </template>
        Módulo que muestra las aprobaciones realizadas, la opción de subir el
        acuerdo correspondiente
        <q-icon name="upload_file" color="pink" size="sm" /> y la opción de
        visualizarlo después de subirlo<q-icon
          name="visibility"
          color="pink"
          size="sm"
        />.
      </q-banner>
    </div>
    <div class="row">
      <div class="col q-pb-sm text-right">
        <q-btn
          type="button"
          color="pink-1"
          icon-right="sync"
          label="Actualizar"
          @click="actualizar()"
          class="q-mr-sm"
        />
      </div>
    </div>
    <ModalComp />
    <TablaComp />
  </q-page>
</template>
<script setup>
import { useQuasar, QSpinnerCube } from "quasar";
import { useAprobarStore } from "src/stores/aprobar-store";
import ModalComp from "../components/ModalComp.vue";
import TablaComp from "../components/TablaComp.vue";

const $q = useQuasar();
const aprobarStore = useAprobarStore();

const actualizar = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  await aprobarStore.loadAprobacionCandidaturas();
  $q.loading.hide();
};
</script>
