<template>
  <q-dialog
    v-model="modalSustituir"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 1100px; max-width: 110vw">
      <q-card-section class="row">
        <div class="text-h6">Sustituir</div>
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false)"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <q-radio
          v-for="option in options"
          :key="option"
          v-model="sustituirPor"
          :val="option"
          :label="option"
          color="teal"
        />
      </q-card-section>
      <!-- <q-card-section
        v-if="sustituirPor == 'Propietario 2' || sustituirPor == 'Suplente 2'"
      >
        <q-radio
          v-model="sustituirPor"
          val="formula"
          label="Propietario 2"
          color="teal"
        />
        <q-radio
          v-model="sustituirPor"
          val="individual"
          label="Suplente 2"
          color="teal"
        />
      </q-card-section> -->
      <!-- <q-card-section v-if="sustituirPor == 'formula' && !is_Candidato">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-xs">
            <q-card>
              <q-card-section horizontal>
                <q-img class="col-3" :src="propietario_1.url_Foto" />
                <q-separator vertical />

                <q-card-section>
                  <div class="text-h6">
                    {{ propietario_1.nombre_Completo }}
                  </div>

                  <q-btn
                    @click="is_Candidato = !is_Candidato"
                    outline
                    style="color: goldenrod"
                    label="Sustituir"
                  />
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-xs">
            <q-card>
              <q-card-section horizontal>
                <q-img class="col-3" :src="candidato.url_Foto_Suplente" />
                <q-separator vertical />

                <q-card-section>
                  <div class="text-h6">
                    {{ candidato.nombre_Completo_Suplente }}
                  </div>

                  <q-btn outline style="color: goldenrod" label="Sustituir" />
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section> -->
      <q-card-section v-if="sustituirPor == 'formula'">
        <div class="row q-pb-sm" v-if="sustituirPor == 'propietario'">
          <div class="col-5">
            <q-card>
              <q-card-section horizontal>
                <q-img class="col-2" :src="propietario_1.url_Foto" />
                <q-separator vertical />
                <q-card-section>
                  <div class="text-h6">
                    Sustituir a:
                    {{ propietario_1.nombre_Completo }}
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <q-form @submit="onSubmit">
          <q-tabs
            v-if="sustituirPor == 'formula'"
            v-model="tabTab"
            class="bg-grey-4"
            style="border-radius: 5px"
            dense
            align="justify"
          >
            <q-tab
              v-for="tab in tabs"
              :key="tab"
              class="text-blue-grey"
              :name="tab"
              :label="tab"
            />
          </q-tabs>
          <q-tab-panels
            v-model="tabTab"
            animated
            class="shadow-2 rounded-borders"
          >
            <!--PROPIETARIO-->
            <q-tab-panel name="propietario">
              <q-list bordered class="rounded-borders col-12">
                <q-expansion-item
                  v-model="expansion"
                  @show="expansion2 = false"
                  @hide="expansion2 = true"
                  expand-separator
                  icon="person"
                  label="Datos generales"
                >
                  <div class="row q-pl-md">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                      <q-select
                        v-model="partido_Id_prop"
                        :options="list_Partidos_Politicos"
                        label="Partido postulante"
                        hint="Seleccione el partido postulante"
                      />
                    </div>
                  </div>
                  <SustituirCandidato :tabTipo="tabTab" />
                </q-expansion-item>
                <!-- <q-expansion-item
                  v-model="expansion2"
                  @show="expansion = false"
                  @hide="expansion = true"
                  expand-separator
                  icon="folder_open"
                  label="Documentación Requerida"
                >
                  <FormularioDocumentacion />
                </q-expansion-item> -->
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
          <SustituirCandidato :tipo="sustituirPor" :tab="tab" />
          <q-space />
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                outline
                color="pink"
                @click="actualizarModal(false)"
              />
              <q-btn
                label="Guardar"
                type="submit"
                color="pink"
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCandidatosStore } from "src/stores/candidatos-store";
import { useQuasar } from "quasar";
import { useSustituirStore } from "src/stores/sustituir-store";
import SustituirCandidato from "../../sustituciones/components/SustituirCandidato.vue";

const $q = useQuasar();
const candidatoStore = useCandidatosStore();
const sustituirStore = useSustituirStore();
const { modalSustituir, candidato, propietario_1 } =
  storeToRefs(candidatoStore);
const { candidatoSustituir, sustitucion } = storeToRefs(sustituirStore);
const is_Candidato = ref(false);
const sustituirPor = ref(null);
const tabTab = ref(null);
const tabs = ref([
  "Propietario",
  "Suplente",
  "Propietario sindico",
  "Propietario suplente",
]);
const options = ref(["Formula", "Propietario", "Suplente"]);
const expansion = ref(true);
const expansion2 = ref(false);

const props = defineProps({
  tab: { type: String, required: true },
});

const actualizarModal = (valor) => {
  $q.loading.show();
  candidatoStore.actualizarModalSustituir(valor);
  $q.loading.hide();
};

const onSubmit = async () => {
  let sustituirFormData = new FormData();

  sustituirFormData.append("Fecha_Sustitucion", "2023-12-05");
  sustituirFormData.append("Fecha_Registro", "2023-12-05");
  sustituirFormData.append("Empleado_Id", "1028");
  sustituirFormData.append("Tipo_Sustitucion", "Propietario 1");
  if (propietario_1.value.nombres != null)
    sustituirFormData.append("Nombres_Anterior", propietario_1.value.nombres);
  if (propietario_1.value.apellido_Paterno != null)
    sustituirFormData.append(
      "Apellido_Paterno_Anterior",
      propietario_1.value.apellido_Paterno
    );
  if (propietario_1.value.apellido_Materno != null)
    sustituirFormData.append(
      "Apellido_Materno_Anterior",
      propietario_1.value.apellido_Materno
    );
  if (propietario_1.value.mote != null)
    sustituirFormData.append("Mote_Anterior", propietario_1.value.mote);
  if (propietario_1.value.sexo != null)
    sustituirFormData.append("Sexo_Anterior", propietario_1.value.sexo);
  if (propietario_1.value.clave_Elector != null)
    sustituirFormData.append(
      "Clave_Elector_Anterior",
      propietario_1.value.clave_Elector
    );
  if (propietario_1.value.rfc != null)
    sustituirFormData.append("RFC_Anterior", propietario_1.value.rfc);
  if (propietario_1.value.curp != null)
    sustituirFormData.append("CURP_Anterior", propietario_1.value.curp);
  sustituirFormData.append("Fecha_Nacimiento_Anterior", "04-07-2001");
  if (propietario_1.value.ocupacion != null)
    sustituirFormData.append(
      "Ocupacion_Anterior",
      propietario_1.value.ocupacion
    );
  if (propietario_1.value.telefono != null)
    sustituirFormData.append("Telefono_Anterior", propietario_1.value.telefono);
  if (propietario_1.value.correo != null)
    sustituirFormData.append("Correo_Anterior", propietario_1.value.correo);

  sustituirFormData.append(
    "Pertenece_Grupo_Vulnerable_Anterior",
    propietario_1.value.pertenece_Grupo_Vulnerable
  );
  if (propietario_1.value.grupo_Vulnerable != null)
    sustituirFormData.append(
      "Grupo_Vulnerable_Anterior",
      propietario_1.value.grupo_Vulnerable
    );
  if (propietario_1.value.partido_Id != null)
    sustituirFormData.append(
      "Partido_Id_Anterior",
      propietario_1.value.partido_Id
    );
  if (sustitucion.value.Nombres_Nuevo != null)
    sustituirFormData.append("Nombres_Nuevo", sustitucion.value.Nombres_Nuevo);
  if (sustitucion.value.Apellido_Paterno_Nuevo != null)
    sustituirFormData.append(
      "Apellido_Paterno_Nuevo",
      sustitucion.value.Apellido_Paterno_Nuevo
    );
  if (sustitucion.value.Apellido_Materno_Nuevo != null)
    sustituirFormData.append(
      "Apellido_Materno_Nuevo",
      sustitucion.value.Apellido_Materno_Nuevo
    );
  if (sustitucion.value.Mote_Nuevo != null)
    sustituirFormData.append("Mote_Nuevo", sustitucion.value.Mote_Nuevo);
  if (sustitucion.value.Sexo_Nuevo != null)
    sustituirFormData.append("Sexo_Nuevo", sustitucion.value.Sexo_Nuevo);
  if (sustitucion.value.Clave_Elector_Nuevo != null)
    sustituirFormData.append(
      "Clave_Elector_Nuevo",
      sustitucion.value.Clave_Elector_Nuevo
    );
  if (sustitucion.value.RFC_Nuevo != null)
    sustituirFormData.append("RFC_Nuevo", sustitucion.value.RFC_Nuevo);
  if (sustitucion.value.CURP_Nuevo != null)
    sustituirFormData.append("CURP_Nuevo", sustitucion.value.CURP_Nuevo);
  if (sustitucion.value.Fecha_Nacimiento_Nuevo != null)
    sustituirFormData.append("Fecha_Nacimiento_Nuevo", "07-02-2005");
  if (sustitucion.value.Ocupacion_Nuevo != null)
    sustituirFormData.append(
      "Ocupacion_Nuevo",
      sustitucion.value.Ocupacion_Nuevo
    );
  if (sustitucion.value.Telefono_Nuevo != null)
    sustituirFormData.append(
      "Telefono_Nuevo",
      sustitucion.value.Telefono_Nuevo
    );
  if (sustitucion.value.Correo_Nuevo != null)
    sustituirFormData.append("Correo_Nuevo", sustitucion.value.Correo_Nuevo);
  sustituirFormData.append(
    "Pertenece_Grupo_Vulnerable_Nuevo",
    sustitucion.value.Pertenece_Grupo_Vulnerable_Nuevo
  );
  if (sustitucion.value.Grupo_Vulnerable_Nuevo != null)
    sustituirFormData.append(
      "Grupo_Vulnerable_Nuevo",
      sustitucion.value.Grupo_Vulnerable_Nuevo
    );
  sustituirFormData.append("Partido_Id_Nuevo", 8);
  if (sustitucion.value.Foto_Nuevo != null)
    sustituirFormData.append("Foto_Nuevo", sustitucion.value.Foto_Nuevo);

  let resp = null;
  $q.loading.show();

  resp = await sustituirStore.sustituirCandidato(
    candidato.value.id,
    sustituirFormData
  );
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    actualizarModal(false);
  } else {
    $q.notify({
      position: "top-right",
      type: "negative",
      message: resp.data,
    });
  }
  $q.loading.hide();
};
</script>

<style></style>
