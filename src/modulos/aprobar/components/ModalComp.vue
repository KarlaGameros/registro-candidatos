<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          {{ !isEditar ? "Registrar" : "Editar" }}
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
      <q-form @submit="onSubmit">
        <q-card-section class="row q-col-gutter-xs">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="aprobacion.acuerdo"
              label="Acuerdo"
              hint="Ingrese nombre del acuerdo"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre del distrito es requerido']"
            >
            </q-input>
          </div>
          <div v-if="isEditar" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input v-model="aprobacion.fecha_Aprobacion">
              <template v-slot:prepend>
                <q-icon color="pink" name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      disable
                      v-model="aprobacion.fecha_Aprobacion"
                      mask="YYYY-MM-DD HH:mm"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:append>
                <q-icon color="pink" name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div v-else class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input v-model="date">
              <template v-slot:prepend>
                <q-icon color="pink" name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:append>
                <q-icon color="pink" name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-file accept=".pdf" v-model="acuerdoArchivo" label="Acuerdo">
              <template v-slot:append>
                <q-icon name="attachment" color="pink" />
              </template>
            </q-file>
          </div>
        </q-card-section>
        <q-card-section>
          <TablaDetalle />
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
import { defineProps, ref } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useAprobarStore } from "src/stores/aprobar-store";
import TablaDetalle from "./TablaDetalle.vue";
import { useCandidatosStore } from "src/stores/candidatos-store";

//-----------------------------------------------------------

const $q = useQuasar();
const aprobarStore = useAprobarStore();
const candidatosStore = useCandidatosStore();
const { modal, isEditar, aprobacion, list_Detalle } = storeToRefs(aprobarStore);
const props = defineProps({
  tipo_Id: { type: Number },
});
const acuerdoArchivo = ref(null);
const dateActual = new Date();
const year = dateActual.getFullYear();
const month = String(dateActual.getMonth() + 1).padStart(2, "0");
const day = String(dateActual.getDate()).padStart(2, "0");
const hours = String(dateActual.getHours());
const minutes = String(dateActual.getMinutes());
const seconds = String(dateActual.getSeconds());
const date = ref(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}`);

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  $q.loading.show();
  list_Detalle.value = [];
  acuerdoArchivo.value = null;
  aprobarStore.actualizarModal(valor);
  aprobarStore.updateEditar(false);
  aprobarStore.initAprobacion();
  $q.loading.hide();
};

const onSubmit = async () => {
  let aprobarFormData = new FormData();
  let resp = null;
  let respUpdate = null;
  if (list_Detalle.value.length == 0 && isEditar.value == false) {
    $q.dialog({
      title: "Atención",
      message: "Debe de agregar mínimo una candidatura a la lista",
      icon: "Warning",
      persistent: true,
      transitionShow: "scale",
      transitionHide: "scale",
    });
  } else {
    if (isEditar.value == false) {
      aprobarFormData.append("Acuerdo", aprobacion.value.acuerdo);
      aprobarFormData.append("Fecha_Aprobacion", date.value);
      aprobarFormData.append("Archivo_Acuerdo", acuerdoArchivo.value);
      list_Detalle.value.forEach((element) => {
        aprobarFormData.append("Detalle[]", element.candidato_Id);
      });

      $q.dialog({
        title: "Aprobar candidatos",
        message: `¿Está seguro de aprobar ${list_Detalle.value.length} fórmulas?`,
        icon: "Warning",
        persistent: true,
        transitionShow: "scale",
        transitionHide: "scale",
        ok: {
          color: "positive",
          label: "¡Sí!, aprobar",
        },
        cancel: {
          color: "negative",
          label: " No Cancelar",
        },
      }).onOk(async () => {
        $q.loading.show();
        resp = await aprobarStore.aprobarCandidatos(
          aprobarFormData,
          props.tipo_Id
        );
        if (resp.success) {
          $q.notify({
            position: "top-right",
            type: "positive",
            message: resp.data,
          });
          await aprobarStore.loadAprobacionCandidaturas();
          aprobarStore.initAprobacion();
          actualizarModal(false);
        } else {
          $q.notify({
            position: "top-right",
            type: "negative",
            message: resp.data,
          });
        }
        $q.loading.hide();
      });
    } else {
      aprobarFormData.append("Consentimiento", acuerdoArchivo.value);
    }
  }
  $q.loading.show();
  if (isEditar.value == true) {
    if (
      acuerdoArchivo.value != null &&
      aprobacion.value.archivo_Acuerdo != null
    ) {
      $q.dialog({
        title: "Atención",
        message: "Ya existe un archivo, si acepta se remplazará.",
        icon: "Warning",
        persistent: true,
        transitionShow: "scale",
        transitionHide: "scale",
        ok: {
          color: "positive",
          label: "¡Sí!, aceptar",
        },
        cancel: {
          color: "negative",
          label: " No Cancelar",
        },
      }).onOk(async () => {
        $q.loading.show();
        resp = await aprobarStore.subirAcuerdo(
          aprobacion.value.id,
          aprobarFormData
        );
        respUpdate = await aprobarStore.updateAprobacion(aprobacion.value);
        if (resp.success) {
          $q.notify({
            position: "top-right",
            type: "positive",
            message: resp.data,
          });
          await candidatosStore.loadCandidatos();
          aprobarStore.initAprobacion();
          candidatosStore.actualizarTabla(true);
          actualizarModal(false);
        } else {
          $q.notify({
            position: "top-right",
            type: "negative",
            message: resp.data,
          });
        }
      });
    }
  }

  $q.loading.hide();
};
</script>

<style></style>
