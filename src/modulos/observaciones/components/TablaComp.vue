<template>
  <div class="q-pa-md">
    <div class="q-pb-md">
      <q-banner
        inline-actions
        class="text-justify bg-grey-2"
        style="border-radius: 20px"
      >
        <template v-slot:avatar>
          <q-icon name="info" color="grey" />
        </template>
        Módulo que muestra las observaciones realizadas
      </q-banner>
    </div>
    <div class="bg-blue-grey-4" style="border-radius: 3px">
      <div class="text-h6 text-center text-white">Observaciones</div>
    </div>
    <q-table
      :rows="list"
      :columns="columns"
      :filter="filter"
      row-key="name"
      v-model:pagination="pagination"
      color="pink"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name === 'id'">
              <q-btn
                v-if="props.row.acuerdo_Url != null"
                flat
                round
                color="pink"
                icon="visibility"
                @click="verDocumento(props.row)"
              >
                <q-tooltip>Ver acuerdo</q-tooltip>
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
import { ref } from "vue";

//-----------------------------------------------------------

const list = ref([1, 2]);

const columns = [
  {
    name: "usuario",
    align: "center",
    label: "Usuario",
    field: "usuario",
    sortable: true,
  },
  {
    name: "acuerdo",
    align: "center",
    label: "Acuerdo",
    field: "acuerdo",
    sortable: true,
  },
  {
    name: "fecha_Aprobacion",
    align: "center",
    label: "Fecha aprobación",
    field: "fecha_Aprobacion",
    sortable: true,
  },
  {
    name: "fecha_Registro",
    align: "center",
    label: "Fecha registro",
    field: "fecha_Registro",
    sortable: true,
  },
  {
    name: "id",
    align: "center",
    label: "Acciones",
    field: "id",
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
