<template>
  <div class="flex flex-center">
    <DashMenu @handle-panels="handleCurrTab" />
  </div>
  <q-card
    style="width: 450px; height: 75vh; border-radius: 12px"
    class="q-ma-xs overflow-hidden"
  >
    <q-tabs
      alert
      dense
      align="center"
      class="text-white shadow-2 no-pointer-events"
      :breakpoint="0"
    >
      <q-tab :name="tab" class="card-tab__title">{{ tab }}</q-tab>
    </q-tabs>
    <q-card-section class="q-gutter-y-sm">
      <q-tab-panels
        v-model="tab"
        class="bg-grey-1 rounded-borders text-white text-center"
      >
        <q-tab-panel name="squads">
          <q-layout
            v-if="squad?.length"
            container
            class="rounded"
            style="height: 62vh"
            id="target-toast"
          >
            <transition-group
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <q-table
                v-for="(ctr, i) in squad"
                :key="i"
                :rows="ctr"
                :columns="columns"
                row-key="nick"
                selection="multiple"
                hide-bottom
                v-model:selected="playersToEliminate"
                bordered
                table-header-style="background-color:rgba(0,0,0,0.1);"
                table-header-class="glossy text-white"
                class="text-grey-8 q-mt-sm q-mx-sm"
                style="border: 1px solid #fff; border-radius: 13px"
              >
                <template #header="props">
                  <q-tr :props="props">
                    <app-bar
                      :showCancelBttn="false"
                      :style="{ top: '90px', ['z-index']: '0' }"
                    >
                      <template #buttons>
                        <q-checkbox
                          v-model="props.selected"
                          checked-icon="checklist"
                          unchecked-icon="delete_sweep"
                          :keep-color="true"
                          :color="props.selected ? 'red' : 'white'"
                          size="md"
                          :disable="playersToEliminate?.length ? true : false"
                          @click="delSquadDialog(playersToEliminate)"
                        />
                      </template>
                      <template #title>
                        <q-tr class="flex justify-around">
                          <q-th
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                          >
                            <q-chip
                              outline
                              color="teal-4"
                              square
                              class="glossy shadow-4 no-pointer-events q-pa-md text-white"
                            >
                              {{ col.label }}</q-chip
                            >
                          </q-th>
                        </q-tr>
                      </template>
                    </app-bar>
                  </q-tr>
                </template>
                <template #top>
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label
                          ><q-chip
                            square
                            class="no-pointer-events glossy text-white shadow-1 table-slotTop--list__chip"
                          >
                            <q-btn
                              push
                              round
                              glossy
                              :color="tacticalIconColor(ctr[0].name_tactic)"
                              class="q-pl-md no-pointer-events shadow-3"
                            >
                              <q-avatar size="26px">
                                <q-img
                                  style="
                                    height: 23px;
                                    width: 23px;
                                    filter: invert(88%);
                                  "
                                  :src="`src/assets/${ctr[0].name_tactic}.svg`"
                                  spinner-color="white"
                                  spinner-size="10px"
                                />
                              </q-avatar>
                            </q-btn>

                            &nbsp;{{ ctr[0].name_tactic }}
                          </q-chip></q-item-label
                        >
                        <q-item-label caption class="no-pointer-events"
                          >Táctica
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <q-space />
                  <p class="table-slotTop__p no-pointer-events">
                    {{ i + 1 }}
                  </p>
                </template>
                <template #body="props">
                  <q-tr :props="props">
                    <q-td auto-width>
                      <q-btn
                        size="sm"
                        color="indigo-3"
                        round
                        glossy
                        dense
                        @click="props.expand = !props.expand"
                        :icon="props.expand ? 'remove' : 'add'"
                      />
                    </q-td>
                    <q-td
                      v-for="{ name, label, value } in props.cols"
                      :key="name"
                      :props="props"
                    >
                      <q-btn
                        :ripple="false"
                        :flat="props.row.leader !== 1"
                        :label="props.value"
                        class="no-pointer-events"
                      >
                        {{ value }}
                        <q-badge
                          v-if="props.row.leader === 1 && label === 'NICK'"
                          color="green-13"
                          floating
                          transparent
                          class="text-capitalize"
                          >líder</q-badge
                        >
                      </q-btn>
                    </q-td>
                  </q-tr>
                  <transition
                    appear
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated fadeOut"
                  >
                    <q-tr v-show="props.expand" :props="props">
                      <q-td colspan="100%">
                        <div class="text-left flex">
                          Nombre de jugador:
                          <p class="text-capitalize q-ml-xs">
                            {{ props.row.name }}
                          </p>
                        </div>
                      </q-td>
                    </q-tr>
                  </transition>
                </template>
              </q-table>
            </transition-group>
            <div class="q-mt-md text-black">
              Selected: {{ JSON.stringify(playersToEliminate) }}
            </div>
            <q-page-scroller
              position="bottom-right"
              :scroll-offset="150"
              :offset="[18, 18]"
              style="z-index: 10"
            >
              <q-btn fab icon="keyboard_arrow_up" glossy color="indigo-6" />
            </q-page-scroller>
          </q-layout>
          <DashSquadsSkeleton v-else />
        </q-tab-panel>

        <q-tab-panel name="players"> <dash-players /> </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import DashSquadsSkeleton from "./sekeltons/DashSquads.skeleton.vue";
import { promiseSwal } from "@/utils/UsePromiseToast";
import AppBar from "@/slotComponents/AppBar.vue";
import DashMenu from "./DashMenu.vue";

const squadStore = useSquadStore();
const { squad, playersToEliminate } = storeToRefs(squadStore);

const { deleteSquad } = squadStore;

const delSquadDialog = async (squad) => {
  await promiseSwal("Eliminar?", "#target-toast", deleteSquad, squad);
};

const tab = ref("squads");
const handleCurrTab = (data) => (tab.value = data);
const columns = [
  {
    name: "desc",
    required: true,
    label: "NICK",
    align: "left",
    field: (row) => row.nick,
    format: (val) => `${val}`,
  },
  { name: "pj", align: "center", label: "CLASE", field: "ctr" },
];

watch(
  () => playersToEliminate.value.length,
  (length) => {
    if (length > 5) {
      playersToEliminate.value.splice(-5);
    }
  }
);

const tacticalIconColor = (tactical) => {
  const { [tactical]: color } = {
    ["Ataque"]: "red-12",
    ["Defensa"]: "light-blue-6",
    ["Sello"]: "deep-purple-6",
    ["Auras"]: "amber-5",
  };
  return color;
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");

#custom-target {
  position: relative;
}
.position-absolute {
  position: absolute !important;
}

.card-tab__title,
.table-slotTop__p,
.table-slotTop--list__chip {
  @include titleAuth-style;
  font-size: 2.5em;
  font-family: "Slackey";
  &.table-slotTop--list__chip {
    font-size: 1.3em;
  }
}
</style>
