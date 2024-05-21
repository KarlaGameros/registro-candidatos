<template>
  <template v-if="list_Documentos.length == 0">
    <div class="text-center">
      <q-spinner-cube color="pink" size="5.5em" />
    </div>
  </template>
  <template v-else>
    <q-card>
      <q-card-section>
        <div class="text-subtitle2">Subir la documentación correspondiente</div>
        <br />
        <div class="row">
          <div
            v-for="requisito in list_Documentos"
            :key="requisito.requisito.id"
            class="col-2 q-pa-xs"
          >
            <q-btn
              @click="subirDocumento(requisito.requisito)"
              :color="requisito.registrado == true ? 'green' : 'pink'"
              dense
              outline
              :label="requisito.requisito.requisito"
              :icon-right="
                requisito.registrado == true ? 'visibility' : 'cloud_upload'
              "
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <ModalSubirDoc
      :tipo_Eleccion="props.tipo_Eleccion"
      :puesto="props.puesto"
      :candidato_Id="candidato.id"
    />
  </template>
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from "vue";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useGeneroStore } from "src/stores/genero-store";
import ModalSubirDoc from "../components/ModalSubirDoc.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const configuracionStore = useConfiguracionStore();
const candidatoStore = useCandidatosStore();
const generoStore = useGeneroStore();
const { list_Requisitos } = storeToRefs(configuracionStore);
const { candidato, loadDocs } = storeToRefs(candidatoStore);
const { list_Documentacion_Genero } = storeToRefs(generoStore);
const props = defineProps({
  tipo_Eleccion: { type: String, required: true },
  tipo_Id: { type: Number, required: true },
  puesto: { type: Number, required: true },
  tabTipo: { type: String, required: true },
});
const list_Documentos = ref([]);

//--------------------------------------------------------------------

onMounted(() => {
  cargarData();
});

//--------------------------------------------------------------------

watch(loadDocs, (val) => {
  if (val == true) {
    cargarData();
    candidatoStore.actualizarDocs(false);
  }
});

//--------------------------------------------------------------------

const cargarData = async () => {
  $q.loading.show();
  candidatoStore.actualizarDocs(false);
  list_Documentos.value = [];
  list_Requisitos.value = [];
  list_Documentacion_Genero.value = [];

  await generoStore.getDocumentos(
    candidato.value.id,
    props.puesto,
    null,
    false
  );
  await configuracionStore.loadRequisitos(props.tipo_Id);
  for (var requisito of list_Requisitos.value) {
    let documento = list_Documentacion_Genero.value.find(
      (x) => x.requisito_Id == requisito.id
    );
    if (documento != undefined) {
      if (props.puesto == 1 || props.puesto == 3) {
        if (requisito.nombre != "Formulario de aceptación SNR") {
          list_Documentos.value.push({
            registrado: documento.registrado,
            requisito: documento,
          });
        }
      } else {
        list_Documentos.value.push({
          registrado: documento.registrado,
          requisito: documento,
        });
      }
    }
  }
  $q.loading.hide();
};

const subirDocumento = async (requisito) => {
  $q.loading.show();
  candidatoStore.updateRequisitoDoc(requisito.registrado);
  await generoStore.loadRequerimientoId(requisito.requisito_Id);
  await generoStore.getDocumentos(
    candidato.value.id,
    props.puesto,
    requisito.requisito_Id
  );
  candidatoStore.actualizarModalDocumento(true);
  $q.loading.hide();
};
</script>
