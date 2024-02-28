<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle2">
        Favor de subir la documentación correspondiente
      </div>
      <br />
      <div class="row">
        <div
          v-for="requisito in list_Requisitos"
          :key="requisito"
          class="q-pr-md"
        >
          <q-btn
            @click="subirDocumento(requisito.id)"
            color="pink"
            dense
            outline
            class="q-pa-sm"
            :label="requisito.nombre"
            icon-right="cloud_upload"
          >
            <q-tooltip>Subir</q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <ModalSubirDoc :puesto="props.puesto" :candidato_Id="candidato.id" />
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import ModalSubirDoc from "../components/ModalSubirDoc.vue";
import { useGeneroStore } from "src/stores/genero-store";

//--------------------------------------------------------------------

const $q = useQuasar();
const configuracionStore = useConfiguracionStore();
const candidatoStore = useCandidatosStore();
const generoStore = useGeneroStore();
const { list_Requisitos } = storeToRefs(configuracionStore);
const { candidato } = storeToRefs(candidatoStore);
const props = defineProps({
  tipo_Id: { type: Number, required: true },
  puesto: { type: Number, required: true },
});

//--------------------------------------------------------------------

onMounted(() => {
  cargarData();
});

//--------------------------------------------------------------------

const onRejected = () => {
  $q.notify({
    type: "negative",
    message: "El tamaño del documento es muy lago",
  });
};

const cargarData = async () => {
  $q.loading.show();
  await configuracionStore.loadRequisitos(props.tipo_Id);
  $q.loading.hide();
};

const subirDocumento = async (id) => {
  $q.loading.show();
  await generoStore.loadRequerimientoId(id);
  await generoStore.getDocumentos(candidato.value.id, props.puesto, id);
  candidatoStore.actualizarModalDocumento(true);
  $q.loading.hide();
};
</script>
