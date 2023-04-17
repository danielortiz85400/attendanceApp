<template>
  <q-card
    id="target-toast"
    style="width: 400px; height: 60vh; border-radius: 12px"
  >
    <div v-if="user?.squad?.length > 1">
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-table
          v-for="(ctr, i) in user?.squad"
          :key="i"
          :rows="ctr"
          :columns="columns"
          row-key="nick"
          hide-bottom
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
                        :color="tacticalIconColor(ctr[0]?.name_tactic)"
                        class="q-pl-md no-pointer-events shadow-3"
                      >
                        <q-avatar size="26px">
                          <q-img
                            style="
                              height: 23px;
                              width: 23px;
                              filter: invert(88%);
                            "
                            :src="`src/assets/${ctr[0]?.name_tactic}.svg`"
                            spinner-color="white"
                            spinner-size="10px"
                          />
                        </q-avatar>
                      </q-btn>

                      &nbsp;{{ ctr[0]?.name_tactic }}
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
    </div>
    <UserSkeleton v-else />
  </q-card>
  <q-btn @click="confirmation">confirmar</q-btn>
  <q-btn @click="cancelConfirm">Cancelar confirmacion</q-btn>
  <pre>{{ user?.user[0] }}</pre>
</template>

<script setup>
import AppBar from "@/slotComponents/AppBar.vue";
import UserSkeleton from "@/components/sekeltons/DashSquads.skeleton.vue";
import { url } from "@/helpers/EndPoints";
import { useUser } from "@/composables/useUser";
import { promiseSwal } from "@/utils/UsePromiseToast";
import { useFetch } from "@/composables/UseFetch";
const authStore = useAuth();

const { authUser } = storeToRefs(authStore);
const { user } = useUser(authUser.value?.user?.id);

const confirmation = async () => {
  await promiseSwal(
    "Confirmar?",
    "#target-toast",
    useFetch.bind(null, url.player.confirmation, "POST", user?.value?.user[0])
  );
};

const cancelConfirm = async () => {
  await promiseSwal(
    "Cancelar?",
    "#target-toast",
    useFetch.bind(
      null,
      url.player.cancelConfirmation,
      "POST",
      user?.value?.user[0]
    )
  );
};

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

<style scoped lang="scss">
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
