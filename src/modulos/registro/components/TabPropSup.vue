<template>
  <q-tabs
    v-model="tabTab"
    class="bg-grey-4"
    style="border-radius: 5px"
    dense
    align="justify"
  >
    <q-tab class="text-blue-grey" name="propietario" label="Propietario" />
    <q-tab class="text-blue-grey" name="suplente" label="Suplente" />
    <q-tab
      v-if="props.tab == 'presidenciaSindicatura'"
      class="text-blue-grey"
      name="sindico_propietario"
      label="Sindico propietario"
    />
    <q-tab
      v-if="props.tab == 'presidenciaSindicatura'"
      class="text-blue-grey"
      name="sindico_suplente"
      label="Sindico suplenete"
    />
  </q-tabs>
  <q-tab-panels v-model="tabTab" animated class="shadow-2 rounded-borders">
    <q-tab-panel name="propietario">
      <q-list bordered class="rounded-borders col-12">
        <q-expansion-item
          v-model="expansion"
          @show="expansion2 = false"
          @hide="expansion2 = true"
          expand-separator
          icon="person"
          label="Datos generales"
        >
          <ExpansionDatosGenerales :coalicion="coalicion" />
          <TablaRP v-if="tipo == 'RP'" />
        </q-expansion-item>
        <q-expansion-item
          v-model="expansion2"
          @show="expansion = false"
          @hide="expansion = true"
          expand-separator
          icon="folder_open"
          label="Documentación Requerida"
        >
          <ExpansionDocumentacion />
        </q-expansion-item>
      </q-list>
    </q-tab-panel>
    <q-tab-panel name="suplente" class="row">
      <q-list bordered class="rounded-borders col-12">
        <q-expansion-item
          v-model="expansion"
          @show="expansion2 = false"
          @hide="expansion2 = true"
          expand-separator
          icon="person"
          label="Datos generales"
        >
          <ExpansionDatosGenerales :coalicion="coalicion" />
        </q-expansion-item>

        <q-expansion-item
          v-model="expansion2"
          @show="expansion = false"
          @hide="expansion = true"
          expand-separator
          icon="folder_open"
          label="Documentación Requerida"
        >
          <ExpansionDocumentacion />
        </q-expansion-item>
      </q-list>
    </q-tab-panel>
    <!-- PRESIDENCIAS Y SINDICATURAS -->
    <q-tab-panel name="sindico_propietario" class="row">
      <q-list bordered class="rounded-borders col-12">
        <q-expansion-item
          v-model="expansion"
          @show="expansion2 = false"
          @hide="expansion2 = true"
          expand-separator
          icon="person"
          label="Datos generales"
        >
          <ExpansionDatosGenerales :coalicion="coalicion" />
        </q-expansion-item>

        <q-expansion-item
          v-model="expansion2"
          @show="expansion = false"
          @hide="expansion = true"
          expand-separator
          icon="folder_open"
          label="Documentación Requerida"
        >
          <ExpansionDocumentacion />
        </q-expansion-item>
      </q-list>
    </q-tab-panel>
    <q-tab-panel name="sindico_suplente" class="row">
      <q-list bordered class="rounded-borders col-12">
        <q-expansion-item
          v-model="expansion"
          @show="expansion2 = false"
          @hide="expansion2 = true"
          expand-separator
          icon="person"
          label="Datos generales"
        >
          <ExpansionDatosGenerales :coalicion="coalicion" />
        </q-expansion-item>

        <q-expansion-item
          v-model="expansion2"
          @show="expansion = false"
          @hide="expansion = true"
          expand-separator
          icon="folder_open"
          label="Documentación Requerida"
        >
          <ExpansionDocumentacion />
        </q-expansion-item>
      </q-list>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref, defineProps } from "vue";
import ExpansionDatosGenerales from "./ExpansionDatosGenerales.vue";
import ExpansionDocumentacion from "./ExpansionDocumentacion.vue";
import TablaRP from "./TablaRP.vue";
//--------------------------------------------------------------------

const tabTab = ref("propietario");
const expansion = ref(true);
const expansion2 = ref(false);
const props = defineProps({
  coalicion: { type: Boolean, required: true },
  tab: { type: String, required: true },
  tipo: { type: String, required: true },
});

//--------------------------------------------------------------------
</script>

<style></style>
