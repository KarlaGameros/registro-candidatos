<template>
  <q-dialog
    v-model="modalOficio"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Oficio - A4512</div>
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
        <iframe
          src="https://www.igp.minem.cu/sites/default/files/publicacion/prueba_5.pdf?current=/boletin-geomundo"
          width="100%"
          height="500"
        ></iframe>
        <div class="col-12 justify-end">
          <div class="text-right q-gutter-xs">
            <q-btn
              label="Cancelar"
              type="reset"
              color="negative"
              @click="actualizarModal(false)"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useSustituirStore } from "src/stores/sustituir-store";

//--------------------------------------------------------------------

const sustituirStore = useSustituirStore();
const { modalOficio } = storeToRefs(sustituirStore);

//--------------------------------------------------------------------

const actualizarModal = (valor) => {
  sustituirStore.actualizarModalOficio(valor);
};
</script>

<style></style>
