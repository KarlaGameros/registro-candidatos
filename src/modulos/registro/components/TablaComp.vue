<template>
  <div id="right_panel" class="q-pt-md">
    <div class="wrap-table">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-2 text-grey-7"
          active-color="blue-grey-4"
          indicator-color="blue-grey-4"
          align="justify"
        >
          <q-tab name="mails" label="Diputaciones" />
          <q-tab name="alarms" label="Presidencia y Sindicaturas" />
          <q-tab name="movies" label="Regidurias" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="text-white">
          <q-tab-panel name="mails">
            <TablaTipoEleccion />
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <TablaTipoEleccion />
          </q-tab-panel>

          <q-tab-panel name="movies">
            <TablaTipoEleccion />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TablaTipoEleccion from "./TablaTipoEleccion.vue";

const tab = ref("mails");
</script>

<style scope>
.user__info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user__name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.user__email {
  font-size: 12px;
  color: #4b5563;
}

/* .wrap-table {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow-x: auto;
  width: 100%;
  container-type: inline-size;
  container-name: table;
}

table {
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
}

th {
  font-weight: 700;
  color: #374151;
  font-size: 14px;
  padding: 12px 14px;
  text-align: left;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

td {
  padding: 12px 14px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.user__photo {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 100px;
}

.logo_partido {
  width: 48px;
  height: 48px;
  align-items: center;
}



.user_badge_green {
  width: max-content;
  background: #dcfce7;
  border-radius: 6px;
  border: 1px solid #15803d;
  color: #15803d;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
}
.user_badge_red {
  width: max-content;
  background: #ffcccc;
  border-radius: 6px;
  border: 1px solid #ff4646;
  color: #ff4646;
  padding: 4px;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
}
.user_badge_yellow {
  width: max-content;
  background: #fffbea;
  border-radius: 6px;
  border: 1px solid #ffdf32;
  color: #ffdf32;
  padding: 4px;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
}

.user__edit {
  display: block;
  padding: 4px 12px;
  text-decoration: none;
}

input {
  display: none;
}

input + span {
  display: block;
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  transition: 0.3s;
  cursor: pointer;
}

input + span > svg {
  opacity: 0;
}

input:checked + span {
  background: #dcfce7;
  border: 2px solid #15803d;
  color: #15803d;
}

input:checked + span > svg {
  opacity: 1;
}

progress {
  display: block;
  width: 100px;
  height: 7px;
  border-radius: 10px;
}

progress::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 10px;
}

progress::-webkit-progress-value {
  background-color: #10b981;
  border-radius: 10px;
}

.user__edit {
  padding: 8px 12px;
  border-radius: 6px;
  background: #6366f1;
  color: #fff;
  text-align: center;
  font-weight: 500;
}

@container table (min-width: 400px) {
  .sticky-col {
    position: sticky;
    left: 0;
  }

  .sticky-col-right {
    right: 0;
  }
}

@container table (max-width: 400px) {
  td::before {
    content: attr(data-label);
    font-weight: 700;
    color: #374151;
    font-size: 14px;
  }

  label {
    display: none;
  }

  td {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: none;
  }

  td:first-child {
    background: #f9fafb;
  }

  th {
    display: none;
  }
}

#right_panel {
  position: relative;
} */
</style>
