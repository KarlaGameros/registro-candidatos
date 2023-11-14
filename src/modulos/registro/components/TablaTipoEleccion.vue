<template>
  <!-- <table>
    <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Partido político</th>
        <th scope="col">Estatus</th>
        <th scope="col">Progeso</th>
        <th scope="col">Fecha registro</th>
        <th scope="col" class="sticky-col sticky-col-right">Acciones</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="list in listCandidatos" :key="list">
        <td class="sticky-col" scope="row" data-label="Nombre">
          <div class="user__info">
            <img class="user__photo" :src="list.fotografia" alt="" />
            <div>
              <div class="user__name">{{ list.nombre }}</div>
              <div class="user__email">correo@example.com</div>
            </div>
          </div>
        </td>

        <td data-label="Partido político">
          <img class="logo_partido" :src="list.imgPartido" alt="" />
        </td>
        <td data-label="Estatus">
          <div
            :class="
              list.estatus == 'Completo'
                ? 'user_badge_green'
                : list.estatus == 'Incompleto'
                ? 'user_badge_yellow'
                : 'user_badge_red'
            "
          >
            {{ list.estatus }}
          </div>
        </td>
        <td data-label="Progeso">
          <progress :value="list.progreso" max="100">32%</progress>
        </td>
        <td>
          <div style="color: black">{{ list.fecha_Registro }}</div>
        </td>
        <td data-label="Acciones" class="sticky-col sticky-col-right">
          <q-btn
            flat
            round
            color="pink-5"
            icon="edit_square"
            @click="actualizarModal(true)"
          >
            <q-tooltip>Editar información</q-tooltip>
          </q-btn>
        </td>
      </tr>
    </tbody>
  </table> -->

  <div class="q-pa-md">
    <q-table
      :grid="$q.screen.xs"
      flat
      bordered
      :rows="listCandidatos"
      :columns="columns"
      row-key="name"
      :filter="filter"
      class="my-sticky-last-column-table"
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

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name === 'nombre'">
              <div class="user__info">
                <q-avatar>
                  <img :src="props.row.fotografia" alt="" />
                </q-avatar>
                <div>
                  <div class="user__name">{{ props.row.nombre }}</div>
                  <div class="user__email">correo@example.com</div>
                </div>
              </div>
            </div>
            <div v-else-if="col.name === 'partido'">
              <q-avatar>
                <img :src="props.row.imgPartido" alt="" />
              </q-avatar>
            </div>
            <div v-else-if="col.name === 'progreso'">
              <progress :value="props.row.progreso" max="100">
                <q-tooltip>{{ props.row.progreso }}</q-tooltip>
              </progress>
            </div>
            <div v-else-if="col.name === 'fecha_registro'">
              <label>{{ props.row.fecha_Registro }}</label>
            </div>
            <div v-else-if="col.name === 'estatus'">
              <q-badge
                outline
                :color="obtenColor(props.row.estatus)"
                :label="props.row.estatus"
              />
            </div>
            <div v-else-if="col.name === 'id'">
              <q-btn
                flat
                round
                color="pink-5"
                icon="edit_square"
                @click="actualizarModal(true)"
              >
                <q-tooltip>Editar información</q-tooltip>
              </q-btn>
            </div>

            <label v-else>{{ col.value }}</label>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useExampleStore } from "src/stores/example-store";
import { computed, ref } from "vue";

const $q = useQuasar();
const exampleStore = useExampleStore();
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 3,
});

const pagesNumber = computed(() =>
  Math.ceil(listCandidatos.length / pagination.value.rowsPerPage)
);
const actualizarModal = () => {
  exampleStore.actualizarModal(true);
};

const obtenColor = (estatus) => {
  if (estatus.includes("Completo")) {
    return "green";
  } else if (estatus.includes("Incompleto")) {
    return "red";
  } else {
    return "yellow";
  }
};

const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "partido",
    align: "center",
    label: "Partido",
    field: "partido",
    sortable: true,
  },
  {
    name: "estatus",
    align: "center",
    label: "Estatus",
    field: "estatus",
    sortable: true,
  },
  {
    name: "progreso",
    align: "center",
    label: "Progreso",
    field: "progreso",
    sortable: true,
  },
  {
    name: "fecha_registro",
    align: "center",
    label: "Fecha de registro",
    field: "fecha_registro",
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
const listCandidatos = [
  {
    id: 1,
    nombre: "Nombre",
    tipo: "Tipo de elección",
    partido: "Partido",
    municipio_name: "Tepic",
    progreso: 30,
    estatus: "Incompleto",
    puntuacion: 30,
    fecha_Registro: "20/10/2023",
    fotografia: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    imgPartido:
      "https://www.prepnayarit2021.com/storage/actas_digitales/midaec/logos_partidos/PAN.png",
  },
  {
    id: 2,
    nombre: "Nombre",
    tipo: "Tipo de elección",
    partido: "Partido",
    municipio_name: "Tepic",
    progreso: 100,
    estatus: "Completo",
    puntuacion: 100,
    fecha_Registro: "20/10/2023",
    fotografia: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    imgPartido:
      "https://www.prepnayarit2021.com/storage/actas_digitales/midaec/logos_partidos/PRI.png",
  },
  {
    id: 3,
    nombre: "Nombre",
    tipo: "Tipo de elección",
    partido: "Partido",
    municipio_name: "Tepic",
    progreso: 80,
    estatus: "Con observaciones",
    puntuacion: 80,
    fecha_Registro: "20/10/2023",
    fotografia: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    imgPartido:
      "https://www.prepnayarit2021.com/storage/actas_digitales/midaec/logos_partidos/PRD.png",
  },
  {
    id: 4,
    nombre: "Nombre",
    tipo: "Tipo de elección",
    partido: "Partido",
    municipio_name: "Tepic",
    progreso: 80,
    estatus: "Incompleto",
    puntuacion: 80,
    fecha_Registro: "20/10/2023",
    fotografia: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    imgPartido:
      "https://www.prepnayarit2021.com/storage/actas_digitales/midaec/logos_partidos/MORENA.png",
  },
  {
    id: 5,
    nombre: "Nombre",
    tipo: "Tipo de elección",
    partido: "Partido",
    municipio_name: "Tepic",
    progreso: 80,
    estatus: "Incompleto",
    puntuacion: 80,
    fecha_Registro: "20/10/2023",
    fotografia: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    imgPartido:
      "https://www.prepnayarit2021.com/storage/actas_digitales/midaec/logos_partidos/MORENA.png",
  },
];
</script>
<style lang="sass">

.my-sticky-last-column-table
  thead tr:last-child th:last-child
    /* bg color is important for th; just specify one */
    background-color: #DFDCDC

  td:last-child
    background-color: #DFDCDC

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style>
