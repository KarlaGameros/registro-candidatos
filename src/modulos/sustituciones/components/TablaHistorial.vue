<template>
  <div class="q-pa-md">
    <div class="bg-blue-grey-4" style="border-radius: 3px">
      <div class="text-h6 text-center text-white">
        Historial de sustituciones
      </div>
    </div>
    <q-table :rows="rows" :columns="columns" row-key="name">
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
            <div v-if="col.name === 'documento'">
              <q-btn
                flat
                round
                color="pink"
                icon="description"
                @click="verOficio(true)"
              >
                <q-tooltip>Ver oficio</q-tooltip>
              </q-btn>
            </div>
            <label v-else>{{ col.value }}</label>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useSustituirStore } from "src/stores/sustituir-store";
import { ref } from "vue";

const sustituirStore = useSustituirStore();

const rows = [
  {
    actual: "Karla",
    anterior: "Jazmin",
    capturista: "Jose",
    fecha: "20/01/2023",
    oficio: "A745896",
  },
  {
    actual: "Karla",
    anterior: "Jazmin",
    capturista: "Jose",
    fecha: "20/01/2023",
    oficio: "A745896",
  },
  {
    actual: "Karla",
    anterior: "Jazmin",
    capturista: "Jose",
    fecha: "20/01/2023",
    oficio: "A745896",
  },
  {
    actual: "Karla",
    anterior: "Jazmin",
    capturista: "Jose",
    fecha: "20/01/2023",
    oficio: "A745896",
  },
  {
    actual: "Karla",
    anterior: "Jazmin",
    capturista: "Jose",
    fecha: "20/01/2023",
    oficio: "A745896",
  },

  {
    actual: "Karla",
    anterior: "Jazmin",
    capturista: "Jose",
    fecha: "20/01/2023",
    oficio: "A745896",
  },
  {
    actual: "Karla",
    anterior: "Jazmin",
    capturista: "Jose",
    fecha: "20/01/2023",
    oficio: "A745896",
  },
];
const columns = [
  {
    name: "actual",
    align: "center",
    label: "Actual",
    field: "actual",
    sortable: true,
  },
  {
    name: "anterior",
    align: "center",
    label: "Anterior",
    field: "anterior",
    sortable: true,
  },
  {
    name: "capturista",
    align: "center",
    label: "Capturista",
    field: "capturista",
    sortable: true,
  },
  {
    name: "fecha",
    align: "center",
    label: "Fecha de sustitución",
    field: "fecha",
    sortable: true,
  },
  {
    name: "oficio",
    align: "center",
    label: "Oficio",
    field: "oficio",
    sortable: true,
  },
  {
    name: "documento",
    align: "center",
    label: "Ver oficio",
    field: "documento",
    sortable: true,
  },
];

const verOficio = (valor) => {
  sustituirStore.actualizarModalOficio(valor);
};
</script>

<style></style>
