<template>
  <q-dialog
    v-model="modalAcuse"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          {{ `${list_Completo.length}/${list_Acuses.length}` }}
        </div>
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
      <q-card-section class="row">
        <q-list bordered class="rounded-borders col-6" separator>
          <q-item>
            <q-item-section>
              <q-item-label
                >Los archivos marcados <q-icon name="done" color="green" /> se
                subieron correctamente
              </q-item-label>
            </q-item-section>
          </q-item>

          <div v-for="acuse in list_Acuses" :key="acuse">
            <q-item v-if="acuse.estatus == true">
              <q-item-section avatar top>
                <q-avatar icon="done" color="green" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ acuse.archivo }}</q-item-label>
                <q-item-label caption>{{ acuse.candidato }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
        <q-list bordered class="rounded-borders col-6" separator>
          <q-item>
            <q-item-section>
              <q-item-label
                >Los archivos marcados
                <q-icon name="close" color="red" /> deberán subirse de nuevo
              </q-item-label>
            </q-item-section>
          </q-item>

          <div v-for="acuse in list_Acuses" :key="acuse">
            <q-item v-if="acuse.estatus == false">
              <q-item-section avatar top>
                <q-avatar icon="close" color="red" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ acuse.archivo }}</q-item-label>
                <q-item-label caption>{{ acuse.candidato }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAcusesStore } from "src/stores/acuses-store";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { watch, ref } from "vue";

//-----------------------------------------------------------------

const acuseStore = useAcusesStore();
const candidatosStore = useCandidatosStore();
const { modalAcuse, list_Acuses } = storeToRefs(acuseStore);
const list_Completo = ref([]);

//-----------------------------------------------------------------

watch(list_Acuses, (val) => {
  if (val != []) {
    list_Completo.value = val.filter((x) => x.estatus == true);
  }
});

const actualizarModal = (valor) => {
  acuseStore.actualizarModalAcuse(valor);
  acuseStore.initAcuse();
  list_Completo.value = [];
};
</script>
