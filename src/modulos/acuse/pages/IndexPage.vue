<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Acuses" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <div>
      <q-banner
        inline-actions
        class="text-justify bg-grey-2"
        style="border-radius: 20px"
      >
        <template v-slot:avatar>
          <q-icon name="info" color="grey" />
        </template>
        <slot
          >Favor de subir los acuse firmados por cada candidatura en el botón
          "Subir acuse <q-icon name="upload" size="sm" color="pink" />".</slot
        >
      </q-banner>
    </div>
    <div class="row q-pb-sm">
      <div class="col">
        <div class="text-right">
          <q-btn
            type="button"
            color="pink-1"
            icon-right="sync"
            label="Actualizar"
            @click="actualizar()"
            class="q-mr-sm"
          />
          <q-btn
            v-if="modulo == null ? false : modulo.registrar"
            type="button"
            class="q-ma-sm"
            color="pink-1"
            icon-right="upload"
            label="Subir acuses"
            @click="actualizarModal(true)"
          />
        </div>
      </div>
    </div>
    <TablaComp />
    <ModalComp />
    <ModalAcuse />
  </q-page>
</template>
<script setup>
import { useQuasar, QSpinnerCube } from "quasar";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/auth-store";
import { useAcusesStore } from "src/stores/acuses-store";
import TablaComp from "../components/TablaComp.vue";
import ModalComp from "../components/ModalComp.vue";
import ModalAcuse from "../components/ModalAcuse.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const acusesStore = useAcusesStore();
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SRC-ACU-CU";

//--------------------------------------------------------------------

onBeforeMount(() => {
  leerPermisos();
});

//--------------------------------------------------------------------

const actualizar = () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  acusesStore.actualizarTabla(true);
  $q.loading.hide();
};

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const actualizarModal = (valor) => {
  acusesStore.actualizarModal(valor);
};
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
progress {
  display: block;
  width: 100px;
  height: 7px;
  border-radius: 10px;
}
progress::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 10px;
}

progress::-webkit-progress-value {
  background-color: #10b981;
  border-radius: 10px;
}
</style>
