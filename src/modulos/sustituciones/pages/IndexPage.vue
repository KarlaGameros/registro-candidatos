<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el
              icon="list_alt"
              label="Historial de sustituciones"
            />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <div class="q-pb-md">
      <q-banner
        inline-actions
        class="text-justify bg-grey-2"
        style="border-radius: 20px"
      >
        <template v-slot:avatar>
          <q-icon name="info" color="grey" />
        </template>
        Módulo que muestra el historial de sustituciones de las candidaturas.
      </q-banner>
    </div>
    <div class="row">
      <div class="col q-pb-sm text-right">
        <q-btn
          type="button"
          color="pink-1"
          icon-right="sync"
          label="Actualizar"
          @click="actualizar(true)"
          class="q-mr-sm"
        />
      </div>
    </div>
    <ModalVerOficio />
    <TablaHistorial />
    <ModalSubirAcuerdo />
  </q-page>
</template>
<script setup>
import { useQuasar, QSpinnerCube } from "quasar";
import { useSustituirStore } from "src/stores/sustituir-store";
import ModalVerOficio from "../components/ModalVerOficio.vue";
import TablaHistorial from "../components/TablaHistorial.vue";
import ModalSubirAcuerdo from "../components/ModalSubirAcuerdo.vue";

//-----------------------------------------------------------

const $q = useQuasar();
const sustituirStore = useSustituirStore();

//-----------------------------------------------------------

const actualizar = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  await sustituirStore.loadSustituciones();
  $q.loading.hide();
};
</script>
