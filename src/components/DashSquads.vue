<template>
  <div class="flex flex-center">
    <DashMenu @handle-panels="handleCurrentTab" />
  </div>
  <q-card
    style="width: 450px; height: 465px; border-radius: 12px"
    class="q-mt-sm overflow-hidden"
    id="target-toast"
  >
    <q-card-section>
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="jump-up"
        transition-next="jump-down"
        class="bg-grey-1 rounded-borders text-center"
      >
        <q-tab-panel name="squads" class="q-pa-none">
          <q-layout
            container
            v-if="squad?.length"
            style="height: 450px"
            class="rounded"
          >
            <DataTable
              v-for="(ctr, i) in squad.map((squads) =>
                squads.sort((a, b) => b.leader - a.leader || 0)
              )"
              :key="i"
              :data="ctr"
            >
              <template #section="{ props }">
                <AppBar
                  :showCancelBttn="false"
                  :style="{ top: '110px', ['z-index']: '0' }"
                >
                  <!-- :disable="squadToEliminate?.length ? true : false" -->
                  <template #actions>
                    <q-checkbox
                      v-model="props.selected"
                      checked-icon="checklist"
                      unchecked-icon="delete_sweep"
                      :keep-color="true"
                      :color="props.selected ? 'red' : 'white'"
                      size="md"
                      @click.prevent="deleteSquad(squadToEliminate)"
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
                </AppBar>
              </template>
            </DataTable>
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

        <q-tab-panel name="players">
          <q-layout container class="rounded" style="height: 400px"
            ><DashPlayers
          /></q-layout>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import DashSquadsSkeleton from "./sekeltons/DashSquads.skeleton.vue";
import AppBar from "@/slotComponents/AppBar.vue";
import DataTable from "@/slotComponents/DataTable.vue";
import DashMenu from "./DashMenu.vue";

const squadStore = useSquadStore();
const { squad, squadToEliminate } = storeToRefs(squadStore);
const { deleteSquad } = squadStore;

const tab = ref("squads");
const handleCurrentTab = (data) => (tab.value = data);

watch(
  () => squadToEliminate.value.length,
  (length) => {
    if (length > 5) {
      squadToEliminate.value.splice(-5);
    }
  }
);
</script>

<style scoped lang="scss">
#custom-target {
  position: relative;
}
.position-absolute {
  position: absolute !important;
}
</style>
