<template>
  <q-dialog
    v-model="modalDocumento"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 700px; max-width: 70vw">
      <q-card-section class="row">
        <div class="text-h6">
          {{ requisito.nombre }}
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
      <q-card-section>
        <div class="text-subtitle1 text-bold text-red">
          Descripción detallada del documento
        </div>
        <div class="text-subtitle1 text-justify">
          {{ requisito.descripcion }}
        </div>
        <br />
        <q-form class="q-col-gutter-xs" @submit="onSubmit">
          <div
            class="row"
            v-if="
              modulo == null
                ? false
                : modulo.registrar &&
                  (perfil == 'Captura Prerrogativas'
                    ? props.tipo_Eleccion == 'DIP'
                    : props.tipo_Eleccion != 'GUB')
            "
          >
            <q-file
              class="col-6"
              filled
              bottom-slots
              v-model="requisito_File"
              label="Documento"
              accept=".jpg, image/*, .pdf"
              color="pink"
              lazy-rules
              max-file-size="20000000"
              @rejected="onRejected"
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
          <div
            v-if="
              perfil == 'Super Administrador' &&
              documento.url != '' &&
              documento.url != null
            "
            class="col-6"
          >
            <q-btn
              v-if="modulo == null ? false : modulo.eliminar"
              icon="delete"
              @click="eliminar(documento.id)"
              label="Eliminar documento"
              color="red"
            ></q-btn>
          </div>
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                v-if="
                  modulo == null
                    ? false
                    : modulo.registrar &&
                      (perfil == 'Captura Prerrogativas'
                        ? props.tipo_Eleccion == 'DIP'
                        : props.tipo_Eleccion != 'GUB')
                "
                label="Guardar"
                type="submit"
                color="secondary"
                class="q-ml-sm"
              />
            </div>
          </div>
          <div class="col-12">
            <iframe
              v-if="documento.url != '' && documento.url != null"
              :src="documento.url"
              width="100%"
              height="650"
            ></iframe>
            <div
              v-else
              class="text-subtitle2 text-bold text-center text-red q-pa-lg"
            >
              Sin documento
            </div>
          </div>
          <q-space />
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
import { useAuthStore } from "src/stores/auth-store";

//-----------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const generoStore = useGeneroStore();
const { modalDocumento, visualizar, isEditarRequisito } =
  storeToRefs(candidatoStore);
const { requisito, documento } = storeToRefs(generoStore);
const requisito_File = ref(null);
const props = defineProps({
  puesto: { type: Number, required: true },
  candidato_Id: { type: Number, required: true },
  tipo_Eleccion: { type: String, required: true },
});
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SRC-REG-CL";
const perfil = localStorage.getItem("perfil_Letra");

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  candidatoStore.actualizarModalDocumento(valor);
  requisito_File.value = null;
};

const onRejected = () => {
  $q.notify({
    type: "negative",
    message: "El tamaño del documento es muy lago",
  });
};

const eliminar = async (id) => {
  $q.loading.show();
  $q.dialog({
    title: "Eliminar documento",
    message: "¿Está seguro de eliminar el documento?",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, eliminar",
    },
    cancel: {
      color: "negative",
      label: " No Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    let resp = await generoStore.deleteDocumento(id);
    if (resp.success) {
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      actualizarModal(false);
      $q.loading.hide();
    } else {
      $q.notify({
        position: "top-right",
        type: "negative",
        message: resp.data,
      });
      $q.loading.hide();
    }
  });

  $q.loading.hide();
};

const onSubmit = async () => {
  $q.loading.show();
  let resp = null;
  let requisitoFormData = new FormData();
  requisitoFormData.append("Candidato_Id", props.candidato_Id);
  requisitoFormData.append("Puesto_Candidato", props.puesto);
  requisitoFormData.append("Requisito_Id", requisito.value.id);
  requisitoFormData.append("Archivo", requisito_File.value);
  if (isEditarRequisito.value == true) {
    resp = await candidatoStore.updateRequisito(requisitoFormData);
  } else {
    resp = await candidatoStore.subirRequisito(requisitoFormData);
  }

  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    requisito_File.value = null;
    actualizarModal(false);
    candidatoStore.actualizarDocs(true);
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
