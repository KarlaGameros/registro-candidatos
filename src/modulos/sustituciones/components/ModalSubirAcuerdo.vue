<template>
  <q-dialog
    v-model="modalSubirAcuerdo"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Subir acuerdo</div>
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
              lazy-rules
              :rules="[(val) => !!val || 'El acuerdo es obligatorio ']"
              bottom-slots
              v-model="acuerdo"
              label="Acuerdo"
              counter
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="acuerdo = null"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:hint> Subir acuerdo </template>
            </q-file>
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
      <!-- <q-card-section>
        <iframe
          src="https://www.igp.minem.cu/sites/default/files/publicacion/prueba_5.pdf?current=/boletin-geomundo"
          width="100%"
          height="500"
        ></iframe>
        <div class="col-12 justify-end">
          <div class="text-right q-gutter-xs">
            <q-btn
              label="Cancelar"
              type="reset"
              color="negative"
              @click="actualizarModal(false)"
            />
          </div>
        </div>
      </q-card-section> -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useSustituirStore } from "src/stores/sustituir-store";
import { ref } from "vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const sustituirStore = useSustituirStore();
const { modalSubirAcuerdo, sustitucion } = storeToRefs(sustituirStore);
const acuerdo = ref(null);

//--------------------------------------------------------------------

const actualizarModal = (valor) => {
  sustituirStore.actualizarSubirAcuerdo(valor);
};

const onSubmit = async () => {
  $q.loading.show();
  let resp = null;
  let acuerdoFormData = new FormData();
  acuerdoFormData.append("Acuerdo", sustitucion.value.No_Acuerdo);
  acuerdoFormData.append("Acuerdo_Sustitucion", acuerdo.value);
  resp = await sustituirStore.subirAcuerdo(acuerdoFormData);
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    acuerdo.value = null;
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
