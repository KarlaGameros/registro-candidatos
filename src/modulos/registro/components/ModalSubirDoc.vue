<template>
  <q-dialog
    v-model="modalDocumento"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 700px; max-width: 70vw">
      <q-card-section class="row">
        <div class="text-h6">Subir documento</div>
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
        <q-form class="q-col-gutter-xs" @submit="onSubmit">
          <div class="row">
            <q-file
              class="col-6"
              filled
              bottom-slots
              v-model="requisito_File"
              label="Documento"
              accept=".jpg, image/*, .pdf"
              color="pink"
              lazy-rules
              :rules="[(val) => !!val || 'El documento es requerido']"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="requisito_File = null"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:hint> Subir documento </template>
            </q-file>
          </div>
          <div class="col-12">
            <iframe
              v-if="documento.url != ''"
              :src="documento.url"
              width="100%"
              height="650"
            ></iframe>
            <div
              v-else
              class="text-subtitle2 text-bold text-center text-red q-pa-lg"
            >
              Favor de subir el documento
            </div>
          </div>
          <q-space />
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
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { ref, defineProps } from "vue";
import { storeToRefs } from "pinia";
import { useGeneroStore } from "src/stores/genero-store";

//-----------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const generoStore = useGeneroStore();
const { modalDocumento } = storeToRefs(candidatoStore);
const { requisito, documento } = storeToRefs(generoStore);
const requisito_File = ref(null);
const props = defineProps({
  puesto: { type: Number, required: true },
  candidato_Id: { type: Number, required: true },
});

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  candidatoStore.actualizarModalDocumento(valor);
  requisito_File.value = null;
};

const onSubmit = async () => {
  $q.loading.show();
  let resp = null;
  let requisitoFormData = new FormData();
  requisitoFormData.append("Candidato_Id", props.candidato_Id);
  requisitoFormData.append("Puesto_Candidato", props.puesto);
  requisitoFormData.append("Requisito_Id", requisito.value.id);
  requisitoFormData.append("Archivo", requisito_File.value);
  resp = await candidatoStore.subirRequisito(requisitoFormData);
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    requisito_File.value = null;
    actualizarModal(false);
  } else {
    $q.notify({
      position: "top-right",
      type: "negative",
      message: resp.data,
    });
  }
  $q.loading.hide();
};
</script>

<style></style>
