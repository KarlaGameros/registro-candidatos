<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Género" />
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
    <TablaComp />
  </q-page>
</template>
<script setup>
import TablaComp from "../components/TablaComp.vue";

//-----------------------------------------------------------
</script>
