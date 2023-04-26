<template>
  <q-page class="flex flex-center">
    <div class="column flex-center">
      <v-card
        width="250"
        height="260px"
        class="ma-2"
        style="border-radius: 12px"
      >
        <app-bar :showCancelBttn="false">
          <template #mainContent>
            <div class="card-appbar__title q-mt-sm">Jugador</div>
            <q-list
              v-for="({ nick, name, ctr, phone, name_server }, i) in authUser
                ?.player?.user"
              :key="i"
            >
              <q-item>
                <q-item-section class="text-center text-justify">
                  <q-item-label class="text-weight-bold"
                    ><q-chip
                      square
                      outline
                      class="bg-indigo-5 text-white glossy"
                      >{{ nick }}
                    </q-chip>
                  </q-item-label>
                  <q-item-label caption class="text-capitalize"
                    >Nombre: {{ name }}</q-item-label
                  >
                  <q-item-label caption>Clase: {{ ctr }}</q-item-label>
                  <q-item-label caption>Tel: {{ phone }}</q-item-label>
                  <q-item-label caption>Server: {{ name_server }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </app-bar>
      </v-card>
      <q-card
        class="flex flex-center q-pt-md"
        style="border-radius: 12px; line-height: 1.2; width: 250px"
      >
        <p class="card-appbar__title q-ma-none">Confirmar</p>
        <p class="text-caption text-bold">
          <q-item-label caption
            >Castle siege:
            <q-toggle
              v-model="assistance"
              color="green-12
              keep-color
            "
          /></q-item-label>
        </p>
      </q-card>
    </div>

    <q-card
      id="target-toast"
      style="width: 400px; height: auto; border-radius: 12px"
    >
      <div v-if="authUser?.player?.squad[0]?.length">
        <table-slot :data="authUser?.player?.squad">
          <template #section="{ props }">
            <AppBar
              :showCancelBttn="false"
              :style="{ top: '100px', ['z-index']: '0' }"
              :image="'./src/assets/backConfirmed.png'"
              :density="'prominent'"
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
            </AppBar>
          </template>
        </table-slot>
        <!-- <transition-group
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-table
            v-for="(ctr, i) in authUser?.player?.squad"
            :key="i"
            :rows="ctr"
            :columns="columns"
            row-key="nick"
            hide-bottom
            bordered
            table-header-style="background-color:rgba(0,0,0,0.1);"
            table-header-class="glossy text-white"
            class="text-grey-8 q-ma-sm"
            style="border: 1px solid #fff; border-radius: 13px"
          >
            <template #header="props">
              <q-tr :props="props">
                <app-bar
                  :showCancelBttn="false"
                  :style="{ top: '90px', ['z-index']: '0' }"
                  :image="'./src/assets/backConfirmed.png'"
                  :density="'prominent'"
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
        </transition-group> -->
      </div>
      <UserSkeleton v-else />
    </q-card>
  </q-page>
</template>

<script setup>
import AppBar from "@/slotComponents/AppBar.vue";
import TableSlot from "@/slotComponents/TableSlot.vue";
import UserSkeleton from "@/components/sekeltons/DashSquads.skeleton.vue";
import { url } from "@/helpers/EndPoints";
import { promiseSwal } from "@/utils/UsePromiseToast";
import { useFetch } from "@/composables/UseFetch";

const authStore = useAuth();
const { authUser } = storeToRefs(authStore);

const { userInit } = useOnSocket();

const assistance = ref(false);

onMounted(() => userInit());

const confirmation = async () => {
  await promiseSwal(
    "Confirmar?",
    "#target-toast",
    useFetch.bind(
      null,
      url.player.confirmation,
      "POST",
      authUser.value?.player?.user[0]
    )
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
      authUser.value?.player?.user[0]
    )
  );
};

watch(assistance, (val) => {
  if (!val) {
    cancelConfirm();
  } else {
    confirmation();
  }
});
</script>
