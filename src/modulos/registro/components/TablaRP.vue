<template>
  <q-table
    class="my-table"
    title="Tabla RP: Propietarios"
    :rows="list_Propietarios"
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
    :rows="list_Suplentes"
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
  tipo_Id: { type: Number, required: true },
  tab: { type: String, required: true },
  partido_Id: { type: Number, required: true },
  municipio_Id: { type: Number, required: true },
});
const list_Propietarios = ref([]);
const list_Suplentes = ref([]);

//--------------------------------------------------------------------

watchEffect(() => {
  switch (props.tab) {
    case "DIP":
      list_RP.value = list_Candidatos.value.filter(
        (x) => x.tipo_Candidato == "RP" && x.partido_Id == props.partido_Id
      );
      list_RP.value.sort(function (a, b) {
        return a.orden - b.orden;
      });
      list_Propietarios.value = list_RP.value.filter((x) => x.puesto == 0);
      list_Suplentes.value = list_RP.value.filter((x) => x.puesto == 1);
      break;
    case "REG":
      list_RP.value = list_Candidatos.value.filter(
        (x) =>
          x.tipo_Candidato == "RP" &&
          x.municipio_Id == props.municipio_Id &&
          x.partido_Id == props.partido_Id
      );
      list_RP.value.sort(function (a, b) {
        return a.orden - b.orden;
      });
      list_Propietarios.value = list_RP.value.filter((x) => x.puesto == 0);
      list_Suplentes.value = list_RP.value.filter((x) => x.puesto == 1);
      break;
    default:
      break;
  }
});

//--------------------------------------------------------------------

const columnsPropietario = [
  {
    name: "nombres",
    align: "center",
    label: "Nombres",
    field: "nombres",
    sortable: true,
  },
  {
    name: "apellido_Paterno",
    align: "center",
    label: "Apellido paterno",
    field: "apellido_Paterno",
    sortable: true,
  },
  {
    name: "apellido_Materno",
    align: "center",
    label: "Apellido materno",
    field: "apellido_Materno",
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
    name: "nombres",
    align: "center",
    label: "Nombres",
    field: "nombres",
    sortable: true,
  },
  {
    name: "apellido_Paterno",
    align: "center",
    label: "Apellido paterno",
    field: "apellido_Paterno",
    sortable: true,
  },
  {
    name: "apellido_Materno",
    align: "center",
    label: "Apellido materno",
    field: "apellido_Materno",
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
