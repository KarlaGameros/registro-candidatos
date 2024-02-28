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
        <q-icon name="groups" color="pink" size="xs" />, en el icono
        <q-icon name="add_circle" color="pink" size="xs" /> puede visulizar la
        formula completa.
      </q-banner>
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
    <TablaPrincipalTipoEleccion />
  </q-page>
</template>
<script setup>
import { useCandidatosStore } from "src/stores/candidatos-store";
import TablaPrincipalTipoEleccion from "../components/TablaPrincipalTipoEleccion.vue";

//--------------------------------------------------------------------

const candidatoStore = useCandidatosStore();

//--------------------------------------------------------------------

const actualizarModal = (valor) => {
  candidatoStore.actualizarModal(valor);
  candidatoStore.updateEditar(false);
  candidatoStore.initCandidato();
};

//--------------------------------------------------------------------
</script>

<style scope></style>
