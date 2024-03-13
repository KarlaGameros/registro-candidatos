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
                    <q-avatar v-if="props.row.url_Foto != null">
                      <img :src="props.row.url_Foto" />
                    </q-avatar>
                    <q-avatar v-else>
                      <q-img
                        v-if="props.row.sexo == 'Mujer'"
                        src="../../../assets/avatarmujer.jpg"
                      />
                      <q-img
                        v-if="props.row.sexo == 'Hombre'"
                        src="../../../assets/avatarHombre.jpg"
                      />
                      <q-img
                        v-if="props.row.sexo == 'No binario'"
                        src="../../../assets/noBinario.png"
                      />
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
              <div v-else-if="col.name == 'estatus'">
                <q-icon
                  size="sm"
                  flat
                  round
                  :color="
                    props.row.estatus != 'Registro Aprobado' ? 'red' : 'green'
                  "
                  :name="
                    props.row.estatus != 'Registro Aprobado' ? 'close' : 'done'
                  "
                />
              </div>
              <div v-else-if="col.name === 'partido'">
                <q-avatar square>
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
    name: "edad",
    align: "center",
    label: "Edad",
    field: "edad",
    sortable: true,
  },
  {
    name: "estatus",
    align: "center",
    label: "Aprobado",
    field: "estatus",
    sortable: true,
  },
  {
    name: "sexo",
    align: "center",
    label: "Género",
    field: "sexo",
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
