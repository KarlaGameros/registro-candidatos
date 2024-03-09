<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Documentación</div>
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
        <q-list>
          <q-item
            class="q-pa-sm"
            v-for="item in list_Documentacion_Genero"
            :key="item.nombre"
            dense
          >
            <q-item-section>
              <q-item-label>{{ item.requisito }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                v-if="item.registrado == true"
                @click="verDocumento(item)"
                round
                color="pink"
                icon="visibility"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useGeneroStore } from "src/stores/genero-store";

//-----------------------------------------------------------------

const $q = useQuasar();
const generoStore = useGeneroStore();
const { modal, list_Documentacion_Genero } = storeToRefs(generoStore);

//-----------------------------------------------------------------

const actualizarModal = (valor) => {
  generoStore.actualizarModal(valor);
  generoStore.intiDocumento();
};

const verDocumento = async (requisito) => {
  $q.dialog({
    title: requisito.requisito,
    style: "width: 800px; max-width: 80vw",
    message: `<iframe
            src="${requisito.ruta}"
            width="100%"
            height="650"
          ></iframe>`,
    html: true,
    ok: "Cerrar",
  });
};

//-----------------------------------------------------------------
</script>

<style></style>
