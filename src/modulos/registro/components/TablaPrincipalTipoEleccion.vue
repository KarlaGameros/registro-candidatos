<template>
  <div class="q-pa-md">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-2 text-grey-7"
        active-color="blue-grey-4"
        indicator-color="blue-grey-4"
        align="justify"
      >
        <q-tab
          v-for="tipo in tipo_Elecciones"
          :key="tipo"
          :name="tipo.siglas"
          :label="tipo.nombre"
        />
      </q-tabs>
      <q-tab-panels v-model="tab" animated class="text-white">
        <q-tab-panel
          v-for="tipo in tipo_Elecciones"
          :key="tipo"
          :name="tipo.siglas"
        >
          <q-table
            :grid="$q.screen.xs"
            flat
            bordered
            :rows="list_Candidatos_Filtro"
            :columns="columns"
            :visible-columns="visisble_columns"
            row-key="name"
            :filter="filter"
            class="my-sticky-last-column-table"
            v-model:pagination="pagination"
            :loading="loading"
            color="pink"
          >
            <template v-slot:top-left>
              <q-btn
                type="button"
                color="pink-1"
                icon-right="gavel"
                label="Aprobar"
                @click="aprobar"
              />
            </template>
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
            <!--TEMPLATE SCREEN XS-->
            <template v-if="$q.screen.xs" v-slot:item="props">
              <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              >
                <q-card bordered class="no-shadow">
                  <q-item>
                    <q-checkbox
                      v-if="props.row.validado == false"
                      color="green"
                      v-model="props.row.aprobar"
                      @click="updateSelection(props.row)"
                    />
                    <q-item-section avatar>
                      <q-avatar size="60px" class="shadow-10">
                        <img :src="props.row.url_Foto_Propietario" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-grey-8 text-weight-bold">
                        {{ props.row.nombre_Completo_Propietario }}
                      </q-item-label>
                      <q-item-label caption>
                        Fecha de registro: {{ props.row.fecha_registro }}
                      </q-item-label>
                      <q-item-label class="text-grey-8">
                        {{ props.row.correo_Propietario }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label>
                        <q-avatar size="30px" class="shadow-10">
                          <img :src="props.row.url_Logo_Partido_Propietario" />
                        </q-avatar>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator></q-separator>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-grey-8 text-weight-bold">
                        Género: {{ props.row.genero_Propietario }}
                      </q-item-label>
                      <q-item-label caption v-if="props.row.distrito != null">
                        Distrito: {{ props.row.distrito }}
                      </q-item-label>
                      <q-item-label caption v-if="props.row.municipio != null">
                        Municipio: {{ props.row.municipio }}
                      </q-item-label>
                      <q-item-label
                        caption
                        v-if="props.row.demarcacion != null"
                      >
                        Demarcación: {{ props.row.demarcacion }}
                      </q-item-label>
                      <q-item-label
                        class="text-grey-8"
                        v-if="props.row.nombre_Coalicion != null"
                      >
                        Nombre coalición: {{ props.row.nombre_Coalicion }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label>
                        <q-btn
                          flat
                          round
                          color="pink-5"
                          icon="edit_square"
                          @click="editar(props.row.id)"
                        >
                          <q-tooltip>Editar información</q-tooltip>
                        </q-btn>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </template>
            <!--TEMPLATE SCREEN DESKTOP-->
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <div v-if="col.name === 'id_Expand'">
                    <q-checkbox
                      v-if="props.row.validado == false"
                      color="green"
                      v-model="props.row.aprobar"
                      @click="updateSelection(props.row)"
                    />
                    <q-btn
                      size="sm"
                      color="pink-8"
                      round
                      dense
                      @click="toggleRowExpand(props.row)"
                      :icon="isRowExpanded(props.row) ? 'remove' : 'add'"
                    />
                  </div>
                  <div v-else-if="col.name === 'nombre_Completo_Propietario'">
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar>
                          <img :src="props.row.url_Foto_Propietario" />
                        </q-avatar>
                      </q-item-section>

                      <q-item-section class="text-left">
                        <q-item-label>{{
                          props.row.nombre_Completo_Propietario
                        }}</q-item-label>
                        <q-item-label caption class="">{{
                          props.row.correo_Propietario
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <div v-else-if="col.name === 'validado'">
                    <q-btn
                      flat
                      round
                      :color="props.row.validado == true ? 'green' : 'red'"
                      :icon="props.row.validado == true ? 'done' : 'close'"
                    >
                    </q-btn>
                  </div>
                  <div v-else-if="col.name === 'is_Coalicion'">
                    <q-avatar size="md">
                      <img
                        v-if="props.row.imgPartido2"
                        :src="props.row.imgPartido2"
                        alt=""
                      />
                    </q-avatar>
                  </div>
                  <div v-else-if="col.name === 'partido'">
                    <q-avatar>
                      <img
                        :src="props.row.url_Logo_Partido_Propietario"
                        alt=""
                      />
                      <q-tooltip>{{ props.row.partido }}</q-tooltip>
                    </q-avatar>
                  </div>
                  <div v-else-if="col.name === 'fecha_registro'">
                    <label>{{ props.row.fecha_registro }}</label>
                  </div>
                  <div v-else-if="col.name === 'id'">
                    <q-btn
                      flat
                      round
                      color="pink-5"
                      icon="edit_square"
                      @click="editar(col.value)"
                    >
                      <q-tooltip>Editar información</q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      round
                      color="pink-5"
                      icon="sync_alt"
                      @click="modalSustituir(col.value)"
                    >
                      <q-tooltip>Sustituir </q-tooltip>
                    </q-btn>
                  </div>
                  <label v-else>{{ col.value }}</label>
                </q-td>
              </q-tr>
              <q-tr v-show="isRowExpanded(props.row)" :props="props">
                <q-td colspan="100%">
                  <div class="row" v-if="suplente_1.nombres != null">
                    <div class="col-1 text-caption text-bold"></div>
                    <div class="col-3 text-caption text-bold">Nombre</div>
                    <div class="col-1 text-caption text-bold">Genero</div>
                    <div class="col-1 text-caption text-bold">Tipo</div>
                    <div class="col-1 text-caption text-bold">Partido</div>
                  </div>
                  <div v-else>No hay mas registros</div>
                  <div v-if="suplente_1.nombres != null" class="row q-pb-xs">
                    <div class="col-1">Suplente</div>
                    <div class="col-lg-3 col-md-3">
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar>
                            <img :src="suplente_1.url_Foto" />
                          </q-avatar>
                        </q-item-section>

                        <q-item-section class="text-left">
                          <q-item-label>{{
                            suplente_1.nombre_Completo
                          }}</q-item-label>
                          <q-item-label caption class="">{{
                            suplente_1.correo
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="col-1">{{ suplente_1.sexo }}</div>
                    <div class="col-1">{{ candidato.tipo_Candidato }}</div>
                    <div class="col-1">
                      <q-avatar>
                        <img :src="suplente_1.url_Logo_Partido" alt="" />
                        <q-tooltip>{{ suplente_1.partido_Suplente }}</q-tooltip>
                      </q-avatar>
                    </div>
                  </div>
                  <div v-if="propietario_2.nombres != null" class="row q-pb-xs">
                    <div class="col-1">Prop. Sindico</div>
                    <div class="col-lg-3 col-md-3">
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar>
                            <img :src="propietario_2.url_Foto" />
                          </q-avatar>
                        </q-item-section>

                        <q-item-section class="text-left">
                          <q-item-label>{{
                            propietario_2.nombre_Completo
                          }}</q-item-label>
                          <q-item-label caption class="">{{
                            propietario_2.correo
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="col-1">{{ propietario_2.sexo }}</div>
                    <div class="col-1">{{ candidato.tipo_Candidato }}</div>
                    <div class="col-1">
                      <q-avatar>
                        <img :src="propietario_2.url_Logo_Partido" alt="" />
                        <q-tooltip>{{
                          propietario_2.partido_Propietario_2
                        }}</q-tooltip>
                      </q-avatar>
                    </div>
                  </div>
                  <div v-if="suplente_2.nombres != null" class="row q-pb-xs">
                    <div class="col-1">Sup. Sindico</div>
                    <div class="col-lg-3 col-md-3">
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar>
                            <img :src="suplente_2.url_Foto" />
                          </q-avatar>
                        </q-item-section>

                        <q-item-section class="text-left">
                          <q-item-label>{{
                            suplente_2.nombre_Completo
                          }}</q-item-label>
                          <q-item-label caption class="">{{
                            suplente_2.correo
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="col-1">{{ suplente_2.sexo }}</div>
                    <div class="col-1">{{ candidato.tipo_Candidato }}</div>
                    <div class="col-1">
                      <q-avatar>
                        <img :src="suplente_2.url_Logo_Partido" alt="" />
                        <q-tooltip>{{
                          suplente_2.partido_Suplente_2
                        }}</q-tooltip>
                      </q-avatar>
                    </div>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <ModalRegistro :tab="tab" :tipo_Id="tipo.id" />
          <ModalSustituir :tab="tab" />
          <ModalAprobar :tipo_Id="tipo.id" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <!--PAGINATION-->
    <div class="row justify-center q-mt-md">
      <q-pagination v-model="pagination.page" :max="pagesNumber" input />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useAprobarStore } from "src/stores/aprobar-store";
import { computed, ref, onBeforeMount, watch } from "vue";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import ModalRegistro from "../components/ModalRegistro.vue";
import ModalSustituir from "../components/ModalSustituir.vue";
import ModalAprobar from "../../aprobar/components/ModalComp.vue";
//--------------------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const configuracionStore = useConfiguracionStore();
const aprobarStore = useAprobarStore();
const { tipo_Elecciones } = storeToRefs(configuracionStore);
const {
  list_Candidatos,
  candidato,
  propietario_2,
  suplente_1,
  suplente_2,
  loading,
} = storeToRefs(candidatoStore);
const { list_Detalle } = storeToRefs(aprobarStore);
const visisble_columns = ref("");
const expandedRow = ref(null);
const tab = ref("DIP");
const list_Candidatos_Filtro = ref({ ...list_Candidatos.value });
const listCandidatos = ref([]);

//--------------------------------------------------------------------

onBeforeMount(() => {
  candidatoStore.loadCandidatos();
  configuracionStore.loadTipoElecciones();
  cargarColumnas(tab.value);
});

//--------------------------------------------------------------------

watch(tab, (val) => {
  cargarColumnas(val);
  aprobarStore.initAprobacion();
});

watch(list_Candidatos, (val) => {
  if (val != null) {
    cargarColumnas(tab.value);
  }
});

//--------------------------------------------------------------------

const updateSelection = (row) => {
  const isSelected = listCandidatos.value.includes(row);
  if (!isSelected) {
    listCandidatos.value.push(row);
  } else {
    const index = listCandidatos.value.indexOf(row.id);
    listCandidatos.value.splice(index, 1);
  }
};

const cargarColumnas = (tab) => {
  switch (tab) {
    case "GUB": {
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "validado",
        "genero_Propietario",
        "tipo_Candidato",
        "coalicion",
        "partido",
        "fecha_registro",
        "orden",
        "id",
      ];
      list_Candidatos_Filtro.value = list_Candidatos.value.filter(
        (x) => x.tipo_Eleccion == "Gubernatura"
      );
      break;
    }
    case "DIP": {
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "validado",
        "genero_Propietario",
        "tipo_Candidato",
        "coalicion",
        "partido",
        "distrito",
        "fecha_registro",
        "orden",
        "id",
      ];
      list_Candidatos_Filtro.value = list_Candidatos.value.filter(
        (x) => x.tipo_Eleccion == "Diputaciones"
      );
      break;
    }
    case "PYS": {
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "validado",
        "genero_Propietario",
        "coalicion",
        "partido",
        "municipio",
        "fecha_registro",
        "id",
      ];
      list_Candidatos_Filtro.value = list_Candidatos.value.filter(
        (x) => x.tipo_Eleccion == "Presidencias y Sindicaturas"
      );
      break;
    }
    case "REG": {
      visisble_columns.value = [
        "id_Expand",
        "nombre_Completo_Propietario",
        "validado",
        "genero_Propietario",
        "tipo_Candidato",
        "coalicion",
        "partido",
        "municipio",
        "demarcacion",
        "fecha_registro",
        "orden",
        "id",
      ];
      list_Candidatos_Filtro.value = list_Candidatos.value.filter(
        (x) => x.tipo_Eleccion == "Regidurías"
      );
      break;
    }
  }
};

const editar = async (id) => {
  $q.loading.show();
  candidatoStore.actualizarModal(true);
  candidatoStore.updateEditar(true);
  await candidatoStore.loadCandidato(id);
  $q.loading.hide();
};

const aprobar = async () => {
  $q.loading.show();
  aprobarStore.actualizarModal(true);
  if (listCandidatos.value.length != 0) {
    listCandidatos.value.forEach((element) => {
      list_Detalle.value.push({
        candidato_Id: element.id,
        candidato: element.nombre_Completo_Propietario,
        partido_Logo: element.url_Logo_Partido_Propietario,
        coalicion_Logo: element.url_Logo_Coalicion,
      });
    });
  }
  //listCandidatos.value = [];
  $q.loading.hide();
};

const modalSustituir = (id) => {
  candidatoStore.actualizarModalSustituir(true);
  candidatoStore.loadCandidato(id);
};

const toggleRowExpand = (row) => {
  if (expandedRow.value === row) {
    expandedRow.value = null;
  } else {
    expandedRow.value = row;
    candidatoStore.loadCandidato(row.id);
  }
};

const isRowExpanded = (row) => {
  return expandedRow.value === row;
};

const pagesNumber = computed(() =>
  Math.ceil(list_Candidatos_Filtro.value.length / pagination.value.rowsPerPage)
);

//--------------------------------------------------------------------

const columns = [
  {
    name: "id_Expand",
    align: "center",
    label: "Ver más",
    field: "id_Expand",
    sortable: true,
  },
  {
    name: "nombre_Completo_Propietario",
    align: "center",
    label: "Nombre",
    field: "nombre_Completo_Propietario",
    sortable: true,
  },
  {
    name: "validado",
    align: "center",
    label: "Aprobado",
    field: "validado",
    sortable: true,
  },
  {
    name: "genero_Propietario",
    align: "center",
    label: "Género",
    field: "genero_Propietario",
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
    name: "municipio",
    align: "center",
    label: "Municipio",
    field: "municipio",
    sortable: true,
  },
  {
    name: "demarcacion",
    align: "center",
    label: "Demarcación",
    field: "demarcacion",
    sortable: true,
  },
  {
    name: "distrito",
    align: "center",
    label: "Distrito",
    field: "distrito",
    sortable: true,
  },
  {
    name: "orden",
    align: "center",
    label: "Orden de prelación",
    field: "orden",
    sortable: true,
  },
  {
    name: "coalicion",
    align: "center",
    label: "Coalición",
    field: "coalicion",
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
const filter = ref("");
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 5,
});
</script>
<style lang="sass">
.my-sticky-last-column-table
  thead tr:last-child th:last-child
    /* bg color is important for th; just specify one */
    background-color: white

  td:last-child
    background-color: white

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style>
