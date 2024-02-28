<template>
  <q-dialog
    v-model="modalDetalle"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6"></div>
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
        <q-timeline
          v-if="candidato.pertenece_Grupo_Vulnerable_Propietario == true"
          color="purple-4"
        >
          <q-timeline-entry
            v-if="candidato.grupo_Vulnerable_1 != null"
            title="Personas de pueblos y comunidades indígenas"
          >
            <div>{{ candidato.grupo_Vulnerable_1 }}</div>
          </q-timeline-entry>
          <q-timeline-entry
            v-if="candidato.grupo_Vulnerable_2 != null"
            title="Diversidad sexual"
          >
            <div>{{ candidato.grupo_Vulnerable_2 }}</div>
          </q-timeline-entry>
          <q-timeline-entry
            v-if="candidato.grupo_Vulnerable_3 != null"
            title="Personas con discapacidad"
          >
            <div>{{ candidato.grupo_Vulnerable_3 }}</div>
          </q-timeline-entry>
          <q-timeline-entry
            v-if="candidato.grupo_Vulnerable_4 != null"
            title="Otro"
          >
            <div>{{ candidato.grupo_Vulnerable_4 }}</div>
          </q-timeline-entry>
        </q-timeline>
        <div v-else class="text-subtite2 text-bold" align="center">
          <q-icon name="error" color="pink" size="md" /> La candidatura indicó
          que no pertenece a algún grupo vulnerable.
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useGeneroStore } from "src/stores/genero-store";

//-----------------------------------------------------------------

const generoStore = useGeneroStore();
const candidatosStore = useCandidatosStore();
const { modalDetalle } = storeToRefs(generoStore);
const { candidato } = storeToRefs(candidatosStore);

//-----------------------------------------------------------------

const actualizarModal = (valor) => {
  generoStore.actualizarModalDetalle(valor);
};

//-----------------------------------------------------------------
</script>

<style></style>
