<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Acuse</div>
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
        <q-card-section class="row q-col-gutter-xs flex-center">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-file
              filled
              bottom-slots
              v-model="acuse_File"
              label="Acuse"
              accept=".jpg, image/*, .pdf"
              color="pink"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="acuse_File = null"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:hint> Subir acuse </template>
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

//-----------------------------------------------------------

const $q = useQuasar();
const acusesStore = useAcusesStore();
const { modal } = storeToRefs(acusesStore);
const acuse_File = ref(null);

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  $q.loading.show();
  acusesStore.actualizarModal(valor);
  $q.loading.hide();
};
</script>
