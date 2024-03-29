<template>
  <div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-table
        :rows="props.data"
        :columns="columns"
        row-key="nick"
        hide-bottom
        v-model:selected="squadToEliminate"
        selection="multiple"
        bordered
        table-header-style="background-color:rgba(0,0,0,0.1);"
        table-header-class="glossy text-white"
        class="text-grey-8 q-ma-sm"
        style="border: 1px solid #fff; border-radius: 13px"
      >
        <template #header="props">
          <q-tr :props="props">
            <slot name="section" :props="props"></slot>
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
                      :color="tacticalIconColor(props.data[0]?.name_tactic)"
                      class="q-pl-md no-pointer-events shadow-3"
                    >
                      <q-avatar size="26px">
                        <q-img
                          style="height: 23px; width: 23px; filter: invert(88%)"
                          :src="`src/assets/${props.data[0]?.name_tactic}.svg`"
                          spinner-color="white"
                          spinner-size="10px"
                        />
                      </q-avatar>
                    </q-btn>

                    &nbsp;{{ props.data[0]?.name_tactic }}
                  </q-chip></q-item-label
                >
                <q-item-label
                  caption
                  class="no-pointer-events text-left q-pl-sm"
                >
                  <q-badge
                    style="font-size: 14px"
                    class="shadow-3 glossy"
                    outline
                    :color="tacticalIconColor(props.data[0]?.name_tactic)"
                    label="Táctica"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-space />
          <q-item class="no-pointer-events">
            <q-item-section>
              <q-item-label caption class="text-center">
                <q-badge
                  outline
                  class="shadow-3 glossy"
                  color="orange"
                  label="Party"
                >
                </q-badge
              ></q-item-label>
              <q-item-label class="table-slotTop__p no-pointer-events"
                ><slot name="party"></slot
              ></q-item-label>
            </q-item-section>
          </q-item>
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
                class="no-pointer-events rounded text-grey-6 font-days"
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
                <div class="flex flex-center font-days">
                  Nombre de jugador:
                  {{
                    props.row.name.charAt(0).toUpperCase() +
                    props.row.name.slice(1)
                  }}
                </div>
              </q-td>
            </q-tr>
          </transition>
        </template>
      </q-table>
    </transition>
  </div>
</template>

<script setup>
const squadStore = useSquadStore();
const { squadToEliminate } = storeToRefs(squadStore);

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

//TABLA
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

const tacticalIconColor = (tactical) => {
  const { [tactical]: color = "transparent" } = {
    ["Ataque"]: "red-12",
    ["Defensa"]: "light-blue-6",
    ["Sello"]: "deep-purple-6",
    ["Auras"]: "amber-5",
  };
  return color;
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Days+One&family=Gochi+Hand&display=swap");

.card-appbar__title,
.table-slotTop__p,
.table-slotTop--list__chip {
  @include titleAuth-style;
  font-size: 2em;
  font-family: "Slackey";

  &.table-slotTop--list__chip {
    font-size: 1.6em;
  }
  &.card-appbar__title {
    font-size: 1.6em;
  }
}

.font-days {
  font-family: "Days One", sans-serif;
  font-size: 12px;
}
</style>
