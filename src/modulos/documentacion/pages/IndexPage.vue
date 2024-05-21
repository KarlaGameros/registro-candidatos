<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Documentación" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <div class="q-pa-sm">
      <q-banner
        inline-actions
        class="text-justify bg-grey-2"
        style="border-radius: 20px"
      >
        <template v-slot:avatar>
          <q-icon name="info" color="grey" />
        </template>
        En este apartado se podrá visualizar las candidaturas con expediente
        completo e incompleto <q-icon name="folder" color="pink" size="xs" />.
      </q-banner>
    </div>
    <div class="row">
      <div class="col q-pb-sm text-right">
        <q-btn
          type="button"
          color="pink-1"
          icon-right="sync"
          label="Actualizar"
          @click="actualizar(true)"
          class="q-mr-sm"
        />
      </div>
    </div>
    <TablaComp />
  </q-page>
</template>
<script setup>
import { useQuasar, QSpinnerCube } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import TablaComp from "../components/TablaComp.vue";

//-----------------------------------------------------------

const $q = useQuasar();
const candidatosStore = useCandidatosStore();

const actualizar = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  await candidatosStore.loadDocumentacionCompleta();
  $q.loading.hide();
};
</script>
