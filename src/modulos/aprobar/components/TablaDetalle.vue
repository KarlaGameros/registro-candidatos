<template>
  <q-table
    :rows="list_Detalle"
    :columns="columns"
    :filter="filter"
    row-key="name"
    :pagination="pagination"
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
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <div v-if="col.name === 'partido_Logo'">
            <q-avatar>
              <img :src="props.row.partido_Logo" alt="" />
              <q-tooltip>{{ props.row.partido_Siglas }}</q-tooltip>
            </q-avatar>
          </div>
          <div v-else-if="col.name === 'coalicion_Logo'">
            <q-avatar v-if="props.row.coalicion_Logo != ''">
              <img :src="props.row.coalicion_Logo" alt="" />
              <q-tooltip>{{ props.row.coalicion_Siglas }}</q-tooltip>
            </q-avatar>
          </div>
          <label v-else>{{ col.value }}</label>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAprobarStore } from "src/stores/aprobar-store";

//-----------------------------------------------------------

const aprobarStore = useAprobarStore();
const { list_Detalle } = storeToRefs(aprobarStore);

//-----------------------------------------------------------

const columns = [
  {
    name: "candidato",
    align: "center",
    label: "Candidato",
    field: "candidato",
    sortable: true,
  },
  {
    name: "partido_Logo",
    align: "center",
    label: "Partio",
    field: "partido_Logo",
    sortable: true,
  },
  {
    name: "coalicion_Logo",
    align: "center",
    label: "Coalición",
    field: "coalicion_Logo",
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
