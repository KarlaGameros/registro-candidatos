<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Aprobar" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <ModalComp />
    <TablaComp />
  </q-page>
</template>
<script setup>
import ModalComp from "../components/ModalComp.vue";
import TablaComp from "../components/TablaComp.vue";

//--------------------------------------------------------------------
</script>

<style scope></style>
