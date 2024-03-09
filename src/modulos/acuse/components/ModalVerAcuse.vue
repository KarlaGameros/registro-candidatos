<template>
  <q-dialog
    v-model="modalVerAcuse"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Ver acuse</div>
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false)"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <div class="col-12 justify-end">
          <iframe
            src="https://www.igp.minem.cu/sites/default/files/publicacion/prueba_5.pdf?current=/boletin-geomundo"
            width="100%"
            height="650"
          ></iframe>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAcusesStore } from "src/stores/acuses-store";

//-----------------------------------------------------------------

const acuseStore = useAcusesStore();
const { modalVerAcuse } = storeToRefs(acuseStore);

//-----------------------------------------------------------------

const actualizarModal = (valor) => {
  acuseStore.actualizarModalVerAcuse(valor);
};

//-----------------------------------------------------------------
</script>

<style></style>
