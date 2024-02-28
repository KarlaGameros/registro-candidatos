<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Acuses" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <TablaComp />
    <ModalComo />
    <ModalVerAcuse />
  </q-page>
</template>
<script setup>
import TablaComp from "../components/TablaComp.vue";
import ModalComo from "../components/ModalComp.vue";
import ModalVerAcuse from "../components/ModalVerAcuse.vue";
</script>

<style scope>
.user__info {
  display: flex;
  align-items: left;
  gap: 12px;
}
.user__name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  text-align: left;
}
.user__email {
  font-size: 12px;
  color: #4b5563;
}
progress {
  display: block;
  width: 100px;
  height: 7px;
  border-radius: 10px;
}
progress::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 10px;
}

progress::-webkit-progress-value {
  background-color: #10b981;
  border-radius: 10px;
}
</style>
