<template>
  <q-dialog
    v-model="modal"
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
      <q-card-section v-if="!candidato">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-xs">
            <q-card>
              <q-card-section horizontal>
                <q-img
                  class="col-3"
                  src="https://www.w3schools.com/howto/img_avatar.png"
                />
                <q-separator vertical />

                <q-card-section>
                  <div class="text-h6">Propietario</div>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
                  fuga ipsam incidunt, quos fugit modi dicta. Minima placeat
                  molestiae accusantium laborum vel dolore. Blanditiis dicta
                  quisquam itaque at nulla unde!
                  <q-btn
                    @click="candidato = !candidato"
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
                <q-img
                  class="col-3"
                  src="https://www.w3schools.com/howto/img_avatar.png"
                />
                <q-separator vertical />

                <q-card-section>
                  <div class="text-h6">Suplente</div>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
                  fuga ipsam incidunt, quos fugit modi dicta. Minima placeat
                  molestiae accusantium laborum vel dolore. Blanditiis dicta
                  quisquam itaque at nulla unde!
                  <q-btn outline style="color: goldenrod" label="Sustituir" />
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
      <q-card-section v-else>
        <q-form class="q-col-gutter-xs" @submit="onSubmit">
          <!-------------------------------------------------------------------------->
          <q-tabs
            v-model="tabTab"
            class="bg-grey-4"
            style="border-radius: 5px"
            dense
            align="justify"
          >
            <q-tab
              class="text-blue-grey"
              name="propietario"
              label="Propietario"
            />
          </q-tabs>
          <q-tab-panels
            v-model="tabTab"
            animated
            class="shadow-2 rounded-borders"
          >
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
                  <q-card>
                    <q-card-section>
                      <div class="row">
                        <div
                          class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pr-xs"
                        >
                          <q-select
                            v-model="tipo_Eleccion"
                            :options="elecciones"
                            label="Partido postulante"
                          />
                        </div>
                        <div
                          class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pr-xs"
                        >
                          <q-file
                            accept=".jpg, .jpeg, .png"
                            max-file-size="700"
                            bottom-slots
                            v-model="model"
                            label="Fotografía"
                            counter
                          >
                            <template v-slot:prepend>
                              <q-icon name="cloud_upload" @click.stop.prevent />
                            </template>
                            <template v-slot:append>
                              <q-icon
                                name="close"
                                @click.stop.prevent="model = null"
                                class="cursor-pointer"
                              />
                            </template>

                            <template v-slot:hint> Field hint </template>
                          </q-file>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-input
                            label="Nombre(s)"
                            hint="Ingrese su nombre"
                            autogrow
                            lazy-rules
                            :rules="[
                              (val) => !!val || 'El nombre es requerido',
                            ]"
                          >
                          </q-input>
                        </div>
                        <div
                          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-input
                            label="Apellido paterno"
                            hint="Ingrese su apellido paterno"
                            autogrow
                          >
                          </q-input>
                        </div>
                        <div
                          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-input
                            label="Apellido Materno"
                            hint="Ingrese su apellido materno"
                            autogrow
                          >
                          </q-input>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <q-input
                            label="Mote"
                            hint="Ingrese su sobrenombre"
                            autogrow
                          >
                          </q-input>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="col-lg-4 col-md-4 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-input
                            v-model.trim="claveElector"
                            label="Clave de elector"
                            hint="Ingrese su clave de elector"
                            counter
                            maxlength="18"
                            autogrow
                            lazy-rules
                            :rules="[
                              (val) =>
                                !!val || 'La clave de elector es requerida',
                              (val) =>
                                val.length >= 18 ||
                                'Ingrese los 18 caracteres de la clave',
                            ]"
                          >
                          </q-input>
                        </div>
                        <div
                          class="col-lg-4 col-md-4 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-input
                            v-model.trim="curp"
                            label="CURP"
                            hint="Ingrese su CURP"
                            autogrow
                            lazy-rules
                            counter
                            maxlength="18"
                            :rules="[
                              (val) => !!val || 'La CURP es requerida',
                              (val) =>
                                val.length >= 18 ||
                                'Ingrese los 18 caracteres de la CURP',
                            ]"
                          >
                          </q-input>
                        </div>
                        <div
                          class="col-lg-4 col-md-4 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-input
                            v-model.trim="rfc"
                            label="RFC"
                            hint="Ingrese su RFC"
                            counter
                            maxlength="13"
                            autogrow
                            lazy-rules
                            :rules="[
                              (val) => !!val || 'El RFC es requerido',
                              (val) =>
                                val.length >= 18 ||
                                'Ingrese los 13 caracteres deL RFC',
                            ]"
                          >
                          </q-input>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-input
                            v-model="date"
                            mask="date"
                            :rules="['date']"
                            label="Fecha de nacimiento"
                          >
                            <template v-slot:append>
                              <q-icon
                                name="event"
                                color="pink"
                                class="cursor-pointer"
                              >
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-date
                                    v-model="date"
                                    color="pink-4"
                                    :options="optionsDate"
                                  >
                                    <div class="row items-center justify-end">
                                      <q-btn
                                        v-close-popup
                                        label="Close"
                                        color="pink"
                                        flat
                                      />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                        <div
                          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-input
                            readonly
                            v-model.number="edad"
                            type="number"
                            label="Edad"
                            hint="Ingrese su edad"
                          >
                          </q-input>
                        </div>
                        <div
                          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-select
                            v-model="genero"
                            :options="optionsGenero"
                            label="Género"
                            lazy-rules
                            :rules="[
                              (val) => !!val || 'El género es requerido',
                            ]"
                          />
                        </div>

                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                          <q-input
                            label="Ocupación"
                            hint="Ingrese su ocupación"
                          >
                          </q-input>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-input
                            v-model.trim="correo"
                            type="email"
                            label="Correo electrónico"
                            hint="Correo electrónico para recibir avisos y comuniados "
                            autogrow
                            lazy-rules
                            :rules="[
                              (val) =>
                                !!val || 'El correo electronico es requerido',
                            ]"
                          >
                            <template v-slot:prepend>
                              <q-icon name="email" color="pink" />
                            </template>
                          </q-input>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                          <q-input
                            v-model.number="telefono"
                            label="Teléfono"
                            mask="(###) ### - ####"
                            hint="Da enter para agregar teléfono"
                            @keydown.enter.prevent="getPhone(telefono)"
                          >
                            <template v-slot:prepend>
                              <q-icon name="phone" color="pink" />
                            </template>
                            <q-chip
                              dense
                              v-for="(item, index) in arrayPhone"
                              :key="index"
                              removable
                              v-model="arrayPhone[index]"
                              color="pink-4"
                              text-color="white"
                            >
                              {{ item }}
                            </q-chip>
                          </q-input>
                        </div>
                      </div>

                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <br />
                        <q-checkbox
                          left-label
                          label="¿Pertenece a un grupo en situación de vulnerabilidad?"
                          checked-icon="task_alt"
                          unchecked-icon="highlight_off"
                          size="lg"
                          v-model="situacion"
                          color="pink"
                        />
                      </div>
                      <div class="row" v-if="situacion">
                        <div
                          class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs"
                        >
                          <q-input
                            label="Personas de pueblos y comunidades indígenas"
                          >
                          </q-input>
                          <q-input label="Diversidad sexual"> </q-input>
                        </div>
                        <div
                          class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pr-xs"
                        >
                          <q-input label="Personas con discapacidad"> </q-input>
                          <q-input label="Otro"> </q-input>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  v-model="expansion2"
                  @show="expansion = false"
                  @hide="expansion = true"
                  expand-separator
                  icon="folder_open"
                  label="Documentación Requerida"
                >
                  <q-card>
                    <q-card-section>
                      <div class="text-subtitle2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Facere, perspiciatis aspernatur eum temporibus quo
                        perferendis corporis illum facilis. Quibusdam sint unde
                        eum aliquid soluta non earum voluptatem dolor provident
                        quidem!
                      </div>
                      <br />
                      <div class="row">
                        <div
                          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-file
                            color="pink"
                            outlined
                            label-color="grey"
                            v-model="actaNacimiento"
                            label="Acta de nacimiento"
                          >
                            <template v-slot:append>
                              <q-icon name="attachment" color="pink" />
                            </template>
                          </q-file>
                        </div>
                        <div
                          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-file
                            color="pink"
                            outlined
                            label-color="grey"
                            v-model="actaNacimiento"
                            label="CURP"
                          >
                            <template v-slot:append>
                              <q-icon name="attachment" color="pink" />
                            </template>
                          </q-file>
                        </div>
                        <div
                          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-file
                            color="pink"
                            outlined
                            label-color="grey"
                            v-model="actaNacimiento"
                            label="Clave de elector"
                          >
                            <template v-slot:append>
                              <q-icon name="attachment" color="pink" />
                            </template>
                          </q-file>
                        </div>
                        <div
                          class="col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pr-xs"
                        >
                          <q-file
                            color="pink"
                            outlined
                            label-color="grey"
                            v-model="actaNacimiento"
                            label="RFC"
                          >
                            <template v-slot:append>
                              <q-icon name="attachment" color="pink" />
                            </template>
                          </q-file>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
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
import { storeToRefs } from "pinia";
import { useSustituirStore } from "src/stores/sustituir-store";
import { ref } from "vue";

const sustituirStore = useSustituirStore();
const { modal } = storeToRefs(sustituirStore);
const candidato = ref(false);
const situacion = ref(false);
const tabTab = ref("propietario");
const expansion = ref(true);
const expansion2 = ref(false);

const sustituir = (valor) => {
  sustituirStore.actualizarModal(false);
};
</script>

<style></style>
