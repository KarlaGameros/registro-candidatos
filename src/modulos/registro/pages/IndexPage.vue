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
    <div class="q-pt-md"></div>
    <TablaPrincipalTipoEleccion />
  </q-page>
</template>
<script setup>
import { useCandidatosStore } from "src/stores/candidatos-store";
import TablaPrincipalTipoEleccion from "../components/TablaPrincipalTipoEleccion.vue";

//--------------------------------------------------------------------

const candidatoStore = useCandidatosStore();

//--------------------------------------------------------------------

const actualizarModal = () => {
  candidatoStore.actualizarModal(true);
};

//--------------------------------------------------------------------
</script>

<style scope></style>
