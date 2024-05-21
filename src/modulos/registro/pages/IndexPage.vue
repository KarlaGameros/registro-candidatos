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
    <div class="q-pa-sm">
      <q-banner
        inline-actions
        class="text-justify bg-grey-2"
        style="border-radius: 20px"
      >
        <template v-slot:avatar>
          <q-icon name="info" color="grey" />
        </template>
        Módulo para capturar la información general y documentación de las
        candidaturas
        <q-icon name="groups" color="pink" size="xs" />,
        <q-icon name="add_circle_outline" color="pink" size="xs" /> registrar
        una candidatura,
        <q-icon name="edit_square" color="pink" size="xs" /> editar la
        información de la candidatura,
        <q-icon name="visibility" color="pink" size="xs" /> ver la información
        de la candidatura,
        <q-icon name="sync_alt" color="pink" size="xs" /> sustituir.
      </q-banner>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-right">
          <q-btn
            v-if="modulo == null ? false : modulo.leer"
            type="button"
            color="pink-1"
            icon-right="sync"
            label="Actualizar"
            @click="actualizar(true)"
            class="q-mr-sm"
          />
          <q-btn
            v-if="modulo == null ? false : modulo.leer"
            type="button"
            color="pink-1"
            icon-right="download"
            label="Descargar Excel"
            @click="descargarExcel(true)"
          />
          <q-btn
            v-if="modulo == null ? false : modulo.eliminar"
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
    <TablaPrincipalTipoEleccion />
  </q-page>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useQuasar, QSpinnerCube } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useGeneroStore } from "src/stores/genero-store";
import { useAuthStore } from "src/stores/auth-store";
import TablaPrincipalTipoEleccion from "../components/TablaPrincipalTipoEleccion.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const generoStore = useGeneroStore();
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SRC-REG-CL";
const perfil = localStorage.getItem("perfil_Letra");

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

const actualizarModal = (valor) => {
  candidatoStore.actualizarModal(valor);
  candidatoStore.updateEditar(false);
  candidatoStore.initCandidato();
};

const actualizar = async (valor) => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  candidatoStore.actualizarTabla(valor);
  $q.loading.hide();
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
  await generoStore.downloadExcelPrerrogativas();
  const link = document.createElement("a");
  link.href = generoStore.documentoExcel;
  link.setAttribute("download", "BD_CANDIDATURAS_2024.xlsx");
  document.body.appendChild(link);
  link.click();
  $q.loading.hide();
};
</script>
