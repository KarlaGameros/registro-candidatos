<template>
  <q-card>
    <q-card-section>
      <div class="text-subtitle2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        doloribus, explicabo maxime dicta deleniti blanditiis repudiandae
        pariatur harum deserunt libero provident totam quae. Eum quam
        exercitationem magnam, tempora animi velit.
      </div>
      <br />
      <div class="row">
        <div
          v-for="requisito in list_Requisitos"
          :key="requisito"
          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
        >
          <q-file
            v-if="requisito.activo == true && requisito.archivo == true"
            color="pink"
            outlined
            label-color="grey"
            :label="requisito.nombre"
            :hint="`Subir ${requisito.nombre}`"
          >
            <template v-slot:append>
              <q-icon name="attachment" color="pink" />
            </template>
          </q-file>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";

//--------------------------------------------------------------------

const $q = useQuasar();
const configuracionStore = useConfiguracionStore();
const { list_Requisitos } = storeToRefs(configuracionStore);
const props = defineProps({
  tipo_Id: { type: Number, required: true },
});

//--------------------------------------------------------------------

onMounted(() => {
  cargarData();
});

//--------------------------------------------------------------------

const cargarData = async () => {
  $q.loading.show();
  await configuracionStore.loadRequisitos(props.tipo_Id);
  $q.loading.hide();
};
</script>

<style></style>
