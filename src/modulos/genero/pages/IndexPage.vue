<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Género" />
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
        En este apartado se podrá visualizar la documentación de las
        candidaturas <q-icon name="folder" color="pink" size="xs" />.
      </q-banner>
    </div>
    <div class="row">
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
            v-if="modulo == null ? false : modulo.leer"
            type="button"
            color="pink-1"
            icon-right="download"
            label="Descargar herramienta"
            @click="descargarHerramienta(true)"
          />
          <q-btn
            v-if="modulo == null ? false : modulo.leer"
            type="button"
            color="pink-1"
            class="q-ma-sm"
            icon-right="download"
            label="Descargar Excel"
            @click="descargarExcel(true)"
          />
        </div>
      </div>
    </div>
    <TablaComp />
    <ModalComp />
    <ModalDetalle />
    <ModalHerramienta />
  </q-page>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { useGeneroStore } from "src/stores/genero-store";
import { useQuasar, QSpinnerCube } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { storeToRefs } from "pinia";
import TablaComp from "../components/TablaComp.vue";
import ModalComp from "../components/ModalComp.vue";
import ModalDetalle from "../components/ModalDetalle.vue";
import ModalHerramienta from "../components/ModalHerramienta.vue";

//-----------------------------------------------------------

const $q = useQuasar();
const generoStore = useGeneroStore();
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SRC-DOC-GEN";

//--------------------------------------------------------------------

onBeforeMount(() => {
  leerPermisos();
});

//--------------------------------------------------------------------

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const descargarHerramienta = (valor) => {
  generoStore.actualizarModalHerramienta(valor);
};

const descargarExcel = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  let resp = await generoStore.downloadExcel();
  if (resp.success == true) {
    const link = document.createElement("a");
    link.href = generoStore.documentoExcel;
    link.setAttribute("download", "BD_CANDIDATURAS_GENERO_2024.xlsx");
    document.body.appendChild(link);
    link.click();
  }

  $q.loading.hide();
};

const actualizar = () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  generoStore.actualizarTabla(true);
  $q.loading.hide();
};
</script>
