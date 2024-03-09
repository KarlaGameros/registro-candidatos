<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle2">
        Favor de subir la documentación correspondiente
      </div>
      <br />
      <div class="row">
        <div
          v-for="requisito in list_Documentos"
          :key="requisito.requisito.id"
          class="q-pr-md"
        >
          <q-icon
            v-if="requisito.registrado == true"
            name="check_circle"
            size="sm"
            color="green"
          />
          <q-btn
            @click="subirDocumento(requisito.requisito.requisito_Id)"
            color="pink"
            dense
            outline
            class="q-pa-sm"
            :label="requisito.requisito.requisito"
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
import { defineProps, onMounted, ref } from "vue";
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
const { list_Documentacion_Genero } = storeToRefs(generoStore);
const props = defineProps({
  tipo_Id: { type: Number, required: true },
  puesto: { type: Number, required: true },
});
const list_Documentos = ref([]);

//--------------------------------------------------------------------

onMounted(() => {
  cargarData();
});

//--------------------------------------------------------------------

const cargarData = async () => {
  $q.loading.show();
  await generoStore.getDocumentos(candidato.value.id, props.puesto, null);
  await configuracionStore.loadRequisitos(props.tipo_Id);
  for (var requisito of list_Requisitos.value) {
    let documento = list_Documentacion_Genero.value.find(
      (x) => x.requisito_Id == requisito.id
    );
    list_Documentos.value.push({
      registrado: documento.registrado,
      requisito: documento,
    });
  }
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
