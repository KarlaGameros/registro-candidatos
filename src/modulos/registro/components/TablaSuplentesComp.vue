<template>
  <div class="q-pt-md">
    <q-card>
      <q-table
        :grid="$q.screen.xs"
        flat
        bordered
        :rows="list_Suplentes"
        :columns="columns"
        row-key="name"
        hide-bottom
      >
        <template v-if="$q.screen.xs" v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          >
            <q-card bordered class="no-shadow">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="props.row.url_Foto" />
                  </q-avatar>
                </q-item-section>

                <q-item-section class="text-left">
                  <q-item-label class="text-grey-8 text-weight-bold">{{
                    props.row.nombre_Completo
                  }}</q-item-label>
                  <q-item-label caption class="text-grey-8">{{
                    props.row.correo
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator></q-separator>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-grey-8 text-weight-bold">
                    Género: {{ props.row.sexo }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </template>
        <template v-else v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name === 'nombre_Completo'">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="props.row.url_Foto" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section class="text-left">
                    <q-item-label>{{ props.row.nombre_Completo }}</q-item-label>
                    <q-item-label caption class="">{{
                      props.row.correo
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div v-else-if="col.name === 'partido'">
                <q-avatar>
                  <img :src="props.row.url_Logo_Partido" alt="" />
                </q-avatar>
              </div>
              <label v-else>{{ col.value }}</label>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";

//-----------------------------------------------------------------

const candidatosStore = useCandidatosStore();
const { list_Suplentes } = storeToRefs(candidatosStore);

//-----------------------------------------------------------------

const columns = [
  {
    name: "tipo",
    align: "center",
    label: "Tipo",
    field: "tipo",
    sortable: true,
  },
  {
    name: "nombre_Completo",
    align: "center",
    label: "Nombre",
    field: "nombre_Completo",
    sortable: true,
  },
  {
    name: "tipo_Eleccion",
    align: "center",
    label: "Tipo de elección",
    field: "tipo_Eleccion",
    sortable: true,
  },
  {
    name: "tipo_Candidato",
    align: "center",
    label: "Tipo",
    field: "tipo_Candidato",
    sortable: true,
  },
  {
    name: "partido",
    align: "center",
    label: "Partido político",
    field: "partido",
    sortable: true,
  },
];
</script>
