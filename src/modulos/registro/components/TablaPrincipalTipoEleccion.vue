<template>
  <div class="q-pa-sm">
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
          v-for="tipo in filtradoElecciones"
          :key="tipo"
          :name="tipo.siglas"
          :label="tipo.nombre"
          @click="eleccion_Id = tipo.id"
        />
      </q-tabs>
      <q-tab-panels v-model="tab" animated class="text-white">
        <q-tab-panel
          v-for="tipo in filtradoElecciones"
          :key="tipo"
          :name="tipo.siglas"
        >
          <q-table
            :grid="$q.screen.xs"
            flat
            bordered
            :rows="list_Candidatos_Filtrados"
            :columns="columns"
            :visible-columns="visisble_columns"
            row-key="name"
            :filter="filter"
            class="my-sticky-last-column-table"
            v-model:pagination="pagination"
            color="green"
          >
            <template v-slot:top-left>
              <div
                v-if="modulo == null ? false : modulo.registrar && fechaAprobar"
                class="text-center"
              >
                <q-checkbox color="green" v-model="selected" />
              </div>
              <q-btn
                v-if="modulo == null ? false : modulo.registrar && fechaAprobar"
                type="button"
                color="pink-1"
                icon-right="gavel"
                label="Aprobar"
                @click="aprobar"
              />
              <q-select
                filled
                color="pink"
                class="q-pl-md"
                v-model="estatus_Id"
                :options="list_Estatus"
                label="Selecciona estatus"
                hint="Filtrar por estatus"
                style="width: 260px"
              />
              <q-select
                v-if="tab == 'DIP' || tab == 'REG'"
                filled
                color="pink"
                class="q-pl-md"
                v-model="cargo_Id"
                :options="list_Cargo"
                label="Selecciona cargo"
                hint="Filtrar por cargo"
                style="width: 260px"
              />
              <q-select
                v-if="tab == 'DIP' && cargo_Id != 'RP'"
                filled
                color="pink"
                class="q-pl-md"
                v-model="distrito_Id"
                :options="list_Distritos_Todos"
                label="Selecciona distrito"
                hint="Filtrar por distrito"
                style="width: 260px"
              />
              <q-select
                v-if="tab != 'DIP'"
                filled
                color="pink"
                class="q-pl-md"
                v-model="municipio_Id"
                :options="list_Municipios_Filtro"
                label="Selecciona municipio"
                hint="Filtrar por municipio"
                style="width: 260px"
              />
              <q-select
                v-if="tab == 'REG' && cargo_Id == 'MR'"
                filled
                color="pink"
                class="q-pl-md"
                v-model="demarcacion_Id"
                :options="list_Demarcaciones_Todos"
                label="Selecciona demarcación"
                hint="Filtrar por demarcación"
                style="width: 260px"
              />
              <q-select
                filled
                color="pink"
                class="q-pl-md"
                v-model="coalicion_Id"
                :options="list_Coaliciones_Filtro"
                label="Selecciona coalición"
                hint="Filtrar por coalición"
                style="width: 260px"
              >
              </q-select>
              <q-select
                filled
                color="pink"
                class="q-pl-md"
                v-model="partido_Id"
                :options="list_Filtro_Partidos"
                label="Selecciona partido o candidatura común"
                hint="Filtrar por partidos o candidatura común"
                style="width: 260px"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar v-if="scope.opt.logo_URL != null">
                      <q-img :src="scope.opt.logo_URL" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </template>
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
            <!--TEMPLATE SCREEN XS-->
            <template v-if="$q.screen.xs" v-slot:item="props">
              <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              >
                <q-card bordered class="no-shadow">
                  <div class="q-pa-sm row">
                    <q-checkbox
                      v-if="
                        (props.row.estatus_Aprobado == false ||
                          props.row.estatus_Aprobado == null) &&
                        props.row.nombres != 'Pendiente de Registrar' &&
                        fechaAprobar
                      "
                      color="green"
                      v-model="props.row.aprobar"
                      @click="updateSelection(props.row)"
                    />
                    <q-icon
                      size="sm"
                      flat
                      round
                      :color="
                        props.row.estatus_Aprobado == null ||
                        props.row.estatus_Aprobado == false
                          ? 'red'
                          : 'green'
                      "
                      :name="
                        props.row.estatus_Aprobado == null ||
                        props.row.estatus_Aprobado == false
                          ? 'close'
                          : 'done'
                      "
                    />
                    <div
                      :class="
                        props.row.estatus_Aprobado == null ||
                        props.row.estatus_Aprobado == false
                          ? 'text-red'
                          : 'text-green'
                      "
                    >
                      {{
                        props.row.estatus_Aprobado == null ||
                        props.row.estatus_Aprobado == false
                          ? "Sin aprobar"
                          : "Aprobado"
                      }}
                    </div>
                  </div>
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar size="50px" v-if="props.row.url_Foto != null">
                        <img :src="props.row.url_Foto" />
                      </q-avatar>
                      <q-avatar size="50px" v-else>
                        <q-img
                          v-if="props.row.genero == 'Mujer'"
                          src="../../../assets/avatarmujer.jpg"
                        />
                        <q-img
                          v-if="props.row.genero == 'Hombre'"
                          src="../../../assets/avatarHombre.jpg"
                        />
                        <q-img
                          v-if="props.row.genero == 'No binario'"
                          src="../../../assets/noBinario.png"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-badge
                        color="red"
                        v-if="props.row.nombres == 'Pendiente de Registrar'"
                      >
                        {{ props.row.nombres }}
                      </q-badge>
                      <q-item-label v-else class="text-grey-8 text-weight-bold">
                        {{ props.row.nombre_Completo }}
                      </q-item-label>
                      <q-item-label caption>
                        Fecha de registro: {{ props.row.fecha_Registro }}
                      </q-item-label>
                      <q-item-label class="text-center">
                        <q-avatar style="width: auto; height: 28px" square>
                          <img
                            :src="
                              props.row.is_Coalicion == true
                                ? props.row.logo_Coalicion
                                : props.row.logo_Partido
                            "
                            alt=""
                          />
                          <q-tooltip>{{ props.row.coalicion }}</q-tooltip>
                        </q-avatar>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator></q-separator>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-grey-8 text-weight-bold"
                        >Candidatura:
                        {{ props.row.tipo_Candidato }}</q-item-label
                      >
                      <q-item-label
                        class="text-caption text-weight-bold text-grey-8"
                        >Correo: {{ props.row.correo }}</q-item-label
                      >
                      <q-item-label
                        class="text-caption text-weight-bold text-grey-8"
                      >
                        Género: {{ props.row.genero }}
                      </q-item-label>
                      <q-item-label
                        class="text-caption text-weight-bold text-grey-8"
                        v-if="props.row.distrito != null"
                      >
                        Distrito: {{ props.row.no_Distrito }}
                      </q-item-label>
                      <q-item-label
                        class="text-caption text-weight-bold text-grey-8"
                        v-if="props.row.municipio != null"
                      >
                        Municipio: {{ props.row.municipio }}
                      </q-item-label>
                      <q-item-label
                        class="text-caption text-weight-bold text-grey-8"
                        v-if="props.row.demarcacion != null"
                      >
                        Demarcación: {{ props.row.demarcacion }}
                      </q-item-label>
                      <q-item-label
                        class="text-grey-8"
                        v-if="props.row.coalicion != null"
                      >
                        Nombre coalición: {{ props.row.coalicion }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label>
                        <q-btn
                          v-if="
                            modulo == null
                              ? false
                              : modulo.actualizar &&
                                (perfil == 'Captura Prerrogativas'
                                  ? tab == 'DIP'
                                  : tab != 'GUB')
                          "
                          flat
                          round
                          color="pink-5"
                          icon="edit_square"
                          @click="editar(props.row)"
                        >
                          <q-tooltip>Editar información </q-tooltip>
                        </q-btn>
                        <q-btn
                          v-if="modulo == null ? false : modulo.leer"
                          flat
                          round
                          color="pink-5"
                          icon="visibility"
                          @click="verInformacion(props.row)"
                        >
                          <q-tooltip>Ver información</q-tooltip>
                        </q-btn>
                        <q-btn
                          v-if="
                            modulo == null
                              ? false
                              : modulo.registrar &&
                                (perfil == 'Captura Prerrogativas'
                                  ? tab == 'DIP'
                                  : tab != 'GUB')
                          "
                          flat
                          round
                          color="pink-5"
                          icon="sync_alt"
                          @click="modalSustituir(props.row.id)"
                        >
                          <q-tooltip>Sustituir</q-tooltip>
                        </q-btn>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </template>
            <!--TEMPLATE SCREEN DESKTOP-->
            <template v-else v-slot:body="props">
              <q-tr :props="props" :class="props.row.color ? '' : 'bg-grey-3'">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <div v-if="col.name === 'nombre_Completo'">
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar v-if="props.row.url_Foto != null">
                          <img :src="props.row.url_Foto" />
                        </q-avatar>
                        <q-avatar v-else>
                          <q-img
                            v-if="props.row.genero == 'Mujer'"
                            src="../../../assets/avatarmujer.jpg"
                          />
                          <q-img
                            v-if="props.row.genero == 'Hombre'"
                            src="../../../assets/avatarHombre.jpg"
                          />
                          <q-img
                            v-if="props.row.genero == 'No binario'"
                            src="../../../assets/noBinario.png"
                          />
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label
                          class="text-left"
                          v-if="props.row.nombres != 'Pendiente de Registrar'"
                          >{{ col.value }}</q-item-label
                        >
                        <q-badge color="red" v-else>{{ col.value }}</q-badge>
                        <q-item-label caption class="">{{
                          props.row.correo
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <div v-else-if="col.name === 'estatus_Aprobado'">
                    <q-icon
                      size="sm"
                      flat
                      round
                      :color="col.value == false ? 'red' : 'green'"
                      :name="col.value == false ? 'close' : 'done'"
                    />
                  </div>
                  <div v-else-if="col.name === 'logo_Coalicion'">
                    <q-avatar
                      style="width: auto; height: 35px"
                      square
                      v-if="
                        props.row.is_Coalicion == true ||
                        props.row.is_Comun == true
                      "
                    >
                      <img
                        :src="
                          props.row.is_Coalicion
                            ? col.value
                            : props.row.logo_Comun
                        "
                        alt=""
                      />
                    </q-avatar>
                  </div>
                  <div v-else-if="col.name === 'partido'">
                    <q-avatar v-if="props.row.partido_Id != null" square>
                      <img :src="props.row.logo_Partido" alt="" />
                      <q-tooltip>{{ props.row.partido }}</q-tooltip>
                    </q-avatar>
                  </div>
                  <div v-else-if="col.name === 'fecha_registro'">
                    <label>{{ props.row.fecha_registro }}</label>
                  </div>
                  <div v-else-if="col.name === 'id'">
                    <q-checkbox
                      v-if="
                        (props.row.estatus_Aprobado == false ||
                          props.row.estatus_Aprobado == null) &&
                        props.row.nombres != 'Pendiente de Registrar' &&
                        fechaAprobar &&
                        (perfil == 'Captura Prerrogativas'
                          ? tab == 'DIP'
                          : tab != 'GUB')
                      "
                      color="green"
                      v-model="props.row.aprobar"
                    />
                    <!-- (props.row.tipo_Candidato == 'RP'
                              ? !fechaSustitucionesMR
                              : !fechaSustitucionesRP) && -->
                    <q-btn
                      v-if="
                        modulo == null
                          ? false
                          : modulo.actualizar &&
                            (perfil == 'Captura Prerrogativas'
                              ? tab == 'DIP'
                              : tab != 'GUB')
                      "
                      flat
                      round
                      color="pink-5"
                      icon="edit_square"
                      @click="editar(props.row)"
                    >
                      <q-tooltip>Editar información</q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="modulo == null ? false : modulo.leer"
                      flat
                      round
                      color="pink-5"
                      icon="visibility"
                      @click="verInformacion(props.row)"
                    >
                      <q-tooltip>Ver información</q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="
                        modulo == null
                          ? false
                          : modulo.registrar &&
                            (perfil == 'Captura Prerrogativas'
                              ? tab == 'DIP'
                              : tab != 'GUB')
                      "
                      flat
                      round
                      color="pink-5"
                      icon="sync_alt"
                      @click="modalSustituir(props.row)"
                    >
                      <q-tooltip>Sustituir</q-tooltip>
                    </q-btn>
                  </div>
                  <label v-else>{{ col.value }}</label>
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <ModalRegistro :tab="tab" :tipo_Id="tipo.id" />
          <ModalSustituir :tab="tab" :tipo_Id="tipo.id" />
          <ModalAprobar :tipo_Id="tipo.id" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/auth-store";
import { useQuasar, QSpinnerCube, date } from "quasar";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useAprobarStore } from "src/stores/aprobar-store";
import { ref, onBeforeMount, watch, watchEffect } from "vue";
import { useConfiguracionStore } from "src/stores/configuracion-store";
import ModalRegistro from "../components/ModalRegistro.vue";
import ModalSustituir from "../components/ModalSustituir.vue";
import ModalAprobar from "../../aprobar/components/ModalComp.vue";
import TablaSuplentesComp from "../components/TablaSuplentesComp.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const configuracionStore = useConfiguracionStore();
const aprobarStore = useAprobarStore();
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SRC-REG-CL";
const {
  tipo_Elecciones,
  list_Partidos_Politicos_Todos,
  list_Coaliciones_Filtro,
  list_Distritos_Todos,
  list_Municipios_Todos,
  list_Demarcaciones_Todos,
  list_Municipios_Filtro,
} = storeToRefs(configuracionStore);
const { list_Candidatos, actualizar, puesto } = storeToRefs(candidatoStore);
const { list_Detalle } = storeToRefs(aprobarStore);
const visisble_columns = ref([]);
const expandedRow = ref(null);
const tab = ref(null);
const list_Candidatos_Filtro = ref([]);
const list_Candidatos_Filtrados = ref([]);
const listCandidatos = ref([]);
const municipio_Id = ref(null);
const demarcacion_Id = ref(null);
const distrito_Id = ref(null);
const partido_Id = ref(null);
const coalicion_Id = ref(null);
const list_Filtro_Partidos = ref([]);
const list_Cargo = ref(["Todos", "MR", "RP"]);
const cargo_Id = ref(null);
const selected = ref(false);
const transparent = ref("transparent");
const eleccion_Id = ref(null);
const timeStamp = Date.now();
const dateActual = ref(date.formatDate(timeStamp, "YYYY-MM-DD"));
const fechaSustitucionesMR = ref(
  dateActual.value >= "2024-04-24" ? true : false
);
const fechaSustitucionesRP = ref(
  dateActual.value >= "2024-04-25" ? true : false
);
const filtradoElecciones = ref([]);
const fechaAprobar = ref(dateActual.value < "2024-04-29" ? false : true);
const perfil = localStorage.getItem("perfil_Letra");
const estatus_Id = ref(null);
const list_Estatus = ref(["Todos", "Aprobado", "Sin aprobar"]);

//--------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
  leerPermisos();
});

//--------------------------------------------------------------------

watch(eleccion_Id, (val) => {
  if (val != null) {
    cargarCandidatos();
  }
});

watch(actualizar, (val) => {
  if (val == true) {
    cargarCandidatos();
    selected.value = false;
    actualizar.value = false;
  }
});

watch(coalicion_Id, (val) => {
  if (val != null) {
    partido_Id.value = { value: 0, label: "Todos" };
  }
});

watch(tab, (val) => {
  if (val != null) {
    limpiarFiltros();
    cargarColumnas(val);
    candidatoStore.initCandidato();
    expandedRow.value = null;
    selected.value = false;
  }
});

watch(selected, (val) => {
  if (val == true) {
    list_Candidatos_Filtrados.value.forEach((element) => {
      if (
        element.estatus_Aprobado == false &&
        element.aprobar == false &&
        element.nombres != "Pendiente de Registrar"
      ) {
        element.aprobar = true;
      }
    });
  } else {
    list_Candidatos_Filtrados.value.forEach((element) => {
      if (
        element.estatus_Aprobado == false &&
        element.nombres != "Pendiente de Registrar"
      ) {
        element.aprobar = false;
      }
    });
    list_Detalle.value = [];
  }
});

watch(tipo_Elecciones, (val) => {
  if (val.length > 0) {
    tab.value = val[0].siglas;
    eleccion_Id.value = val[0].id;
    if (localStorage.getItem("perfil_Letra") == "Capturista DIP") {
      filtradoElecciones.value = val.filter((x) => x.siglas == "DIP");
    } else {
      filtradoElecciones.value = val;
    }
  }
});

watch(municipio_Id, (val) => {
  if (val != null && tab.value == "REG") {
    configuracionStore.loadDemarcaciones(val.value, true);
  }
});

const filtrar = (list_Candidatos, filtro) => {
  list_Candidatos_Filtrados.value = list_Candidatos.filter((item) => {
    let cumple = true;
    if (filtro.estatus !== undefined) {
      if (filtro.estatus == "Todos" || filtro.estatus.label == "Todos") {
        cumple = true;
      } else {
        cumple = cumple && item.estatus_Aprobado === filtro.estatus;
      }
    }
    if (filtro.distrito !== undefined) {
      if (filtro.distrito == 0) {
        cumple = cumple && item.distrito_Id === item.distrito_Id;
      } else {
        cumple = cumple && item.distrito_Id === filtro.distrito;
      }
    }
    if (filtro.municipio !== undefined) {
      if (filtro.municipio == 0) {
        cumple = cumple && item.municipio_Id === item.municipio_Id;
      } else {
        cumple = cumple && item.municipio_Id === filtro.municipio;
      }
    }
    if (filtro.demarcacion !== undefined) {
      if (filtro.demarcacion == 0) {
        cumple = cumple && item.demarcacion_Id === item.demarcacion_Id;
      } else {
        cumple = cumple && item.demarcacion_Id === filtro.demarcacion;
      }
    }
    if (filtro.cargo !== undefined) {
      if (filtro.cargo == "Todos") {
        cumple = cumple && item.tipo_Candidato === item.tipo_Candidato;
      } else {
        cumple = cumple && item.tipo_Candidato === filtro.cargo;
      }
    }
    if (filtro.partido !== undefined) {
      if (filtro.partido.value == 0) {
        cumple = cumple && item.partido_Id === item.partido_Id;
      } else {
        if (filtro.partido.is_Comun == true) {
          cumple = cumple && item.comun_Id === filtro.partido.value;
        } else {
          cumple = cumple && item.partido_Id === filtro.partido.value;
        }
      }
    }
    if (filtro.coalicion !== undefined) {
      if (filtro.coalicion == 0) {
        cumple = cumple && item.coalicion_Id === item.coalicion_Id;
      } else {
        cumple = cumple && item.coalicion_Id === filtro.coalicion;
      }
    }
    return cumple;
  });
};

watchEffect(() => {
  const filtro = {};
  if (tab.value != null)
    filtro.eleccion =
      tab.value == "PYS"
        ? "Presidencias y Sindicaturas"
        : tab.value == "REG"
        ? "Regidurías"
        : "Diputaciones";
  if (estatus_Id.value != null)
    filtro.estatus =
      estatus_Id.value == "Aprobado"
        ? true
        : estatus_Id.value == "Sin aprobar"
        ? false
        : estatus_Id.value;
  if (distrito_Id.value != null) filtro.distrito = distrito_Id.value.value;
  if (municipio_Id.value != null) filtro.municipio = municipio_Id.value.value;
  if (demarcacion_Id.value != null)
    filtro.demarcacion = demarcacion_Id.value.value;
  if (cargo_Id.value != null) filtro.cargo = cargo_Id.value;
  if (partido_Id.value != null) filtro.partido = partido_Id.value;
  if (coalicion_Id.value != null) {
    filtro.coalicion = coalicion_Id.value.value;
    if (coalicion_Id.value.value != 0) {
      list_Filtro_Partidos.value = list_Partidos_Politicos_Todos.value.filter(
        (x) => x.coalicion_Id == coalicion_Id.value.value
      );
      list_Filtro_Partidos.value.splice(0, 0, {
        value: 0,
        label: "Todos",
      });
    } else {
      list_Filtro_Partidos.value = list_Partidos_Politicos_Todos.value;
    }
  }
  filtrar(list_Candidatos.value, filtro);
});

//--------------------------------------------------------------------

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const limpiarFiltros = () => {
  estatus_Id.value = { value: 0, label: "Todos" };
  distrito_Id.value = { value: 0, label: "Todos" };
  municipio_Id.value = { value: 0, label: "Todos" };
  demarcacion_Id.value = { value: 0, label: "Todos" };
  coalicion_Id.value = { value: 0, label: "Todos" };
  partido_Id.value = { value: 0, label: "Todos" };
  cargo_Id.value = "Todos";
};

const cargarData = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  await configuracionStore.loadMunicipiosFiltro();
  await configuracionStore.loadMunicipios();
  await configuracionStore.loadDistritos(true);
  await configuracionStore.loadPartidosPoliticosTodos();
  await configuracionStore.loadTipoElecciones();
  await configuracionStore.loadPartidosPoliticos();
  await configuracionStore.loadCoaliciones();
  await configuracionStore.loadCoalicionesFiltro();
  cargarCandidatos();
  limpiarFiltros();
  $q.loading.hide();
};

const cargarCandidatos = async () => {
  $q.loading.show({
    spinner: QSpinnerCube,
    spinnerColor: "pink",
    spinnerSize: 140,
    backgroundColor: "purple-2",
    message: "Espere un momento porfavor...",
    messageColor: "black",
  });
  filter.value = "";
  await candidatoStore.loadCandidatosIndividual(eleccion_Id.value);
  cargarColumnas(tab.value);
  $q.loading.hide();
};

const cargarColumnas = (tab) => {
  switch (tab) {
    case "GUB": {
      visisble_columns.value = [
        "nombre_Completo",
        "candidatura",
        "edad",
        "genero",
        "estatus_Aprobado",
        "tipo_Candidato",
        "postulacion",
        "logo_Coalicion",
        "partido",
        "fecha_Registro",
        "orden",
        "id",
      ];
      break;
    }
    case "DIP": {
      visisble_columns.value = [
        "nombre_Completo",
        "candidatura",
        "edad",
        "genero",
        "estatus_Aprobado",
        "tipo_Candidato",
        "postulacion",
        "logo_Coalicion",
        "partido",
        "no_Distrito",
        "fecha_Registro",
        "orden",
        "id",
      ];
      break;
    }
    case "PYS": {
      visisble_columns.value = [
        "nombre_Completo",
        "candidatura",
        "edad",
        "genero",
        "estatus_Aprobado",
        "tipo_Candidato",
        "postulacion",
        "logo_Coalicion",
        "partido",
        "municipio",
        "fecha_Registro",
        "id",
      ];
      break;
    }
    case "REG": {
      visisble_columns.value = [
        "nombre_Completo",
        "candidatura",
        "edad",
        "genero",
        "estatus_Aprobado",
        "tipo_Candidato",
        "postulacion",
        "logo_Coalicion",
        "partido",
        "municipio",
        "demarcacion",
        "fecha_Registro",
        "orden",
        "id",
      ];
      break;
    }
  }
  pagination.value = {
    sortBy: "desc",
    descending: false,
    page: 1,
    rowsPerPage: 8,
  };
};

const editar = async (row) => {
  $q.loading.show();
  candidatoStore.actualizarModal(true);
  candidatoStore.updateEditar(true);
  puesto.value =
    row.puesto == 0
      ? "propietario"
      : row.puesto == 1
      ? "suplente"
      : row.puesto == 2
      ? "sindico_propietario"
      : "sindico_suplente";
  await candidatoStore.loadCandidato(row.id);
  $q.loading.hide();
};

const verInformacion = async (row) => {
  $q.loading.show();
  candidatoStore.actualizarModal(true);
  candidatoStore.actualizarVisualizar(true);
  puesto.value =
    row.puesto == 0
      ? "propietario"
      : row.puesto == 1
      ? "suplente"
      : row.puesto == 2
      ? "sindico_propietario"
      : "sindico_suplente";
  await candidatoStore.loadCandidato(row.id);
  $q.loading.hide();
};

const aprobar = async () => {
  $q.loading.show();
  list_Detalle.value = [];
  if (list_Candidatos_Filtrados.value.length != 0) {
    list_Candidatos_Filtrados.value.forEach((element) => {
      if (element.aprobar == true) {
        list_Detalle.value.push({
          candidato_Id: element.id,
          candidato: `${element.nombres} ${element.apellido_Paterno} ${element.apellido_Materno}`,
          logo_Partido: element.logo_Partido,
          logo_Coalicion: element.logo_Coalicion,
          puesto: element.puesto,
          tipo_Candidato: element.tipo_Candidato,
          puesto_Letra:
            element.puesto == 0
              ? "Propietario"
              : element.puesto == 1
              ? "Suplente"
              : element.puesto == 2
              ? "Propietaria sindica"
              : "Suplente sindica",
          distrito: element.distrito,
          distrito_Id: element.distrito_Id,
          municipio: element.municipio,
          municipio_Id: element.municipio_Id,
          demarcacion: element.demarcacion,
          demarcacion_Id: element.demarcacion_Id,
        });
      }
    });
  }
  aprobarStore.actualizarModal(true);
  $q.loading.hide();
};

const modalSustituir = async (row) => {
  candidatoStore.actualizarModalSustituir(true);
  puesto.value =
    row.puesto == 0
      ? "propietario"
      : row.puesto == 1
      ? "suplente"
      : row.puesto == 2
      ? "sindico_propietario"
      : "sindico_suplente";
  await candidatoStore.loadCandidato(row.id);
  if (row.postulacion != "Partido político") {
    await configuracionStore.loadPartidosPoliticosCoalicionComun(
      row.is_Comun == true ? row.comun_Id : row.coalicion_Id,
      row.is_Coalicion == true ? true : false
    );
  }
};

const toggleRowExpand = (row) => {
  if (expandedRow.value === row) {
    expandedRow.value = null;
  } else {
    expandedRow.value = row;
    candidatoStore.loadCandidatoToArray(tab.value, row.id);
  }
};

const isRowExpanded = (row) => {
  candidatoStore.initCandidato();
  return expandedRow.value === row;
};

//--------------------------------------------------------------------

const columns = [
  {
    name: "nombre_Completo",
    align: "center",
    label: "Nombre",
    field: "nombre_Completo",
    sortable: false,
  },
  {
    name: "candidatura",
    align: "center",
    label: "Candidatura",
    field: "candidatura",
    sortable: false,
  },
  {
    name: "edad",
    align: "center",
    label: "Edad",
    field: "edad",
    sortable: false,
  },
  {
    name: "genero",
    align: "center",
    label: "Género",
    field: "genero",
    sortable: false,
  },
  {
    name: "estatus_Aprobado",
    align: "center",
    label: "Aprobado",
    field: "estatus_Aprobado",
    sortable: false,
  },
  {
    name: "tipo_Candidato",
    align: "center",
    label: "Cargo",
    field: "tipo_Candidato",
    sortable: false,
  },
  {
    name: "municipio",
    align: "center",
    label: "Municipio",
    field: "municipio",
    sortable: false,
  },
  {
    name: "demarcacion",
    align: "center",
    label: "Demarcación",
    field: "demarcacion",
    sortable: false,
  },
  {
    name: "no_Distrito",
    align: "center",
    label: "Distrito",
    field: "no_Distrito",
    sortable: false,
  },
  {
    name: "orden",
    align: "center",
    label: "Orden de prelación",
    field: "orden",
    sortable: false,
  },
  {
    name: "postulacion",
    align: "center",
    label: "Tipo",
    field: "postulacion",
    sortable: false,
  },
  {
    name: "logo_Coalicion",
    align: "center",
    label: "Coalición/Común",
    field: "logo_Coalicion",
    sortable: false,
  },
  {
    name: "partido",
    align: "center",
    label: "Partido",
    field: "partido",
    sortable: false,
  },
  {
    name: "fecha_Registro",
    align: "center",
    label: "Fecha de registro",
    field: "fecha_Registro",
    sortable: false,
  },
  {
    name: "color",
    align: "center",
    label: "color",
    field: "color",
    sortable: false,
  },
  {
    name: "id",
    align: "center",
    label: "Acciones",
    field: "id",
    sortable: false,
  },
];
const filter = ref("");
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 8,
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
