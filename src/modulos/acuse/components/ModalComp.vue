<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Acuses</div>
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
      <q-form @submit="onSubmit">
        <q-card-section class="row q-col-gutter-xs">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-select
              v-model="tipo_Eleccion_Id"
              :options="tipo_Elecciones"
              label="Tipo de elección"
              lazy-rules
              :rules="[(val) => !!val || 'El tipo de elección es requerido']"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-file
              bottom-slots
              v-model="files"
              use-chips
              multiple
              label="Acuses"
              accept=".jpg, image/*, .pdf"
              color="pink"
              :rules="[(val) => !!val || 'Favor de subir los acuses']"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="files = null"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:hint> Subir acuses </template>
            </q-file>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                color="red"
                @click="actualizarModal(false)"
              />
              <q-btn
                label="Guardar"
                type="submit"
                color="secondary"
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useAcusesStore } from "src/stores/acuses-store";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { useCandidatosStore } from "src/stores/candidatos-store";

//-----------------------------------------------------------

const $q = useQuasar();
const acusesStore = useAcusesStore();
const configuracionStore = useConfiguracionStore();
const candidatosStore = useCandidatosStore();
const { modal } = storeToRefs(acusesStore);
const { tipo_Elecciones } = storeToRefs(configuracionStore);
const files = ref(null);
const tipo_Eleccion_Id = ref(null);

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  $q.loading.show();
  acusesStore.actualizarModal(valor);
  files.value = null;
  tipo_Eleccion_Id.value = null;
  $q.loading.hide();
};

const onSubmit = async () => {
  let acusesFormData = new FormData();
  acusesFormData.append("Archivos", files.value);
  files.value.forEach((row) => {
    acusesFormData.append("Archivos", row);
  });
  let resp = null;
  $q.loading.show();
  resp = await acusesStore.subirAcuses(
    tipo_Eleccion_Id.value.value,
    acusesFormData
  );
  if (resp.data.length > 0) {
    acusesStore.actualizarModalAcuse(true);
  } else {
    if (resp.success) {
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
    } else {
      $q.notify({
        position: "top-right",
        type: "negative",
        message: resp.data,
      });
    }
  }
  await candidatosStore.loadCandidatosByEleccion(tipo_Eleccion_Id.value.value);
  actualizarModal(false);

  $q.loading.hide();
};
</script>
