<template>
  <q-table
    title="Tabla RP: Propietario"
    :rows="list_RP"
    :columns="columns"
    row-key="name"
    v-model:pagination="pagination"
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
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
        (x) => x.tipo_Candidato == "RP" && x.partido_Id == props.partido_Id
      );
      break;
    case "REG":
      list_RP.value = list_Candidatos.value.filter(
        (x) =>
          x.tipo_Candidato == "RP" &&
          x.municipio_Id == props.municipio_Id &&
          x.partido_Id == props.partido_Id
      );
      break;
    default:
      break;
  }
});

//--------------------------------------------------------------------

const columns = [
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
const filter = ref("");
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 5,
});
</script>

<style></style>
