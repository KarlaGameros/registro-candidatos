<template>
  <q-table
    class="my-table"
    title="Tabla RP: Propietarios"
    :rows="list_RP"
    :columns="columnsPropietario"
    row-key="name"
    v-model:pagination="pagination"
    style="height: 300px"
    flat
    bordered
    :filter="filterPropietario"
    virtual-scroll
    :rows-per-page-options="[0]"
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filterPropietario"
        placeholder="Buscar"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
  <br />
  <q-table
    class="my-table"
    title="Tabla RP: Suplentes"
    :rows="list_RP"
    :columns="columnsSuplente"
    row-key="name"
    v-model:pagination="pagination"
    style="height: 300px"
    flat
    bordered
    virtual-scroll
    :rows-per-page-options="[0]"
    :filter="filterSuplente"
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filterSuplente"
        placeholder="Buscar"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { ref, defineProps, watchEffect } from "vue";

//--------------------------------------------------------------------

const candidatosStore = useCandidatosStore();
const { list_Candidatos, list_RP } = storeToRefs(candidatosStore);
const props = defineProps({
  tab: { type: String, required: true },
  partido_Id: { type: Number, required: true },
  municipio_Id: { type: Number, required: true },
});

//--------------------------------------------------------------------

watchEffect(() => {
  switch (props.tab) {
    case "DIP":
      list_RP.value = list_Candidatos.value.filter(
        (x) =>
          x.tipo_Candidato == "RP" &&
          x.partido_Id == props.partido_Id &&
          x.tipo_Eleccion_Id == 2
      );
      list_RP.value.sort(function (a, b) {
        return a.orden - b.orden;
      });
      break;
    case "REG":
      list_RP.value = list_Candidatos.value.filter(
        (x) =>
          x.tipo_Candidato == "RP" &&
          x.municipio_Id == props.municipio_Id &&
          x.partido_Id == props.partido_Id &&
          x.tipo_Eleccion_Id == 4
      );
      list_RP.value.sort(function (a, b) {
        return a.orden - b.orden;
      });
      break;
    default:
      break;
  }
});

//--------------------------------------------------------------------

const columnsPropietario = [
  {
    name: "nombres_Propietario",
    align: "center",
    label: "Nombres",
    field: "nombres_Propietario",
    sortable: true,
  },
  {
    name: "apellido_Paterno_Propietario",
    align: "center",
    label: "Apellido paterno",
    field: "apellido_Paterno_Propietario",
    sortable: true,
  },
  {
    name: "apellido_Materno_Propietario",
    align: "center",
    label: "Apellido materno",
    field: "apellido_Materno_Propietario",
    sortable: true,
  },
  {
    name: "orden",
    align: "center",
    label: "Orden",
    field: "orden",
    sortable: true,
  },
];
const columnsSuplente = [
  {
    name: "nombres_Suplente",
    align: "center",
    label: "Nombres",
    field: "nombres_Suplente",
    sortable: true,
  },
  {
    name: "apellido_Paterno_Suplente",
    align: "center",
    label: "Apellido paterno",
    field: "apellido_Paterno_Suplente",
    sortable: true,
  },
  {
    name: "apellido_Materno_Suplente",
    align: "center",
    label: "Apellido materno",
    field: "apellido_Materno_Suplente",
    sortable: true,
  },
  {
    name: "orden",
    align: "center",
    label: "Orden",
    field: "orden",
    sortable: true,
  },
];
const filterPropietario = ref("");
const filterSuplente = ref("");
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 5,
});
</script>
<style lang="sass">
.my-table
  .q-table__top
    background-color: #C3CCCA
</style>
