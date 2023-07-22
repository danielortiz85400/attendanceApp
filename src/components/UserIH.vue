<template>
  <q-page class="flex flex-center">
    <q-card
      class="flex flex-center bg-grey-1 q-pa-md shadow-1"
      style="border-radius: 12px"
    >
      <q-card
        class="column flex-center q-pa-sm q-py-md bg-white"
        style="border-radius: 12px"
      >
        <!-- ESTADO DE ASISTENCIA -->
        <q-card class="column flex-center no-shadow">
          <q-btn v-if="!stateSquad" class="no-pointer-events" push>
            <q-chip
              class="text-weight-bold"
              square
              color="grey-1"
              :text-color="stateAttendance === true ? 'green-13' : 'red-5'"
              :icon-right="stateAttendance ? 'star' : 'priority_high'"
            >
              {{ stateAttendance ? "Confirmado" : "Sin confirmar" }}
            </q-chip>
          </q-btn>
          <q-btn v-if="stateSquad" class="no-pointer-events" push>
            <q-chip
              class="text-weight-bold"
              size="md"
              square
              color="grey-1"
              :text-color="stateSquad ? 'green-13' : 'red-5'"
            >
              {{ stateSquad ? "En grupo " : "Sin grupo aún" }}
            </q-chip>
          </q-btn>
        </q-card>
        <!-- INFORMACIÓN DE JUGADOR -->
        <v-card
          class="ma-4 no-pointer-events elevation-2"
          width="230"
          height="400px"
          style="border-radius: 10px"
        >
          <AppBar :showCancelBttn="false">
            <template #mainContent>
              <div class="card-appbar__title q-mt-sm">PLAYER</div>
              <div class="flex flex-start items-center">
                <v-timeline side="end">
                  <v-timeline-item
                    v-for="({ nick, ctr, phone, name_server }, i) in authUser
                      ?.player?.user"
                    :key="i"
                    dot-color="indigo"
                    fill-dot
                  >
                    <template #icon>
                      <q-btn
                        round
                        icon="mdi-card-account-details-star"
                        class="glossy shadow-4 no-pointer-events red"
                      >
                      </q-btn>
                    </template>
                    <q-item>
                      <q-item-section>
                        <q-item-label
                          class="text-uppercase text-weight-medium card-player__titles"
                        >
                          <q-badge
                            outline
                            color="blue-grey-5"
                            class="shadow-2"
                            label="Nick"
                        /></q-item-label>
                        <q-item-label caption> {{ nick }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label
                          class="text-uppercase text-weight-medium card-player__titles"
                          ><q-badge
                            outline
                            color="blue-grey-5"
                            class="shadow-2"
                            label="Clase"
                        /></q-item-label>
                        <q-item-label caption> {{ ctr }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label
                          class="text-uppercase text-weight-medium card-player__titles"
                          ><q-badge
                            outline
                            color="blue-grey-5"
                            class="shadow-2"
                            label="Teléf"
                        /></q-item-label>
                        <q-item-label caption> {{ phone }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label
                          class="text-uppercase text-weight-medium card-player__titles"
                          ><q-badge
                            outline
                            color="blue-grey-5"
                            class="shadow-2"
                            label="Server"
                        /></q-item-label>
                        <q-item-label caption> {{ name_server }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </v-timeline-item>
                </v-timeline>
              </div>
            </template>
          </AppBar>
        </v-card>

        <!-- ASISTENCIA -->
        <q-card
          class="text-center pt-4 elevation-2"
          style="border-radius: 12px; line-height: 1.2; width: 230px"
        >
          <p class="card-appbar__title q-ma-none no-pointer-events">ASISTIR</p>
          <p class="text-bold">
            <q-item-label
              ><q-badge
                outline
                color="blue-grey-5"
                class="no-pointer-events text-uppercase shadow-2 card-player__titles"
                label="Castle siege:" />
              <q-toggle
                toggle-indeterminate
                v-model="assistance"
                color="green-12"
                keep-color
                size="lg"
            /></q-item-label>
          </p>
        </q-card>
      </q-card>

      <!-- GRUPO/SQUAD -->
      <q-card
        class="no-shadow q-py-md card-squad"
        id="target-toast"
        style="
          width: 450px;
          max-width: 410px;
          height: auto;
          border-radius: 12px;
        "
      >
        <div v-if="authUser?.player?.squad[0]?.length">
          <DataTable
            v-for="(ctr, i) in authUser?.player?.squad.map((squads) =>
              squads.sort((a, b) => b.leader - a.leader || 0)
            )"
            :key="i"
            :data="ctr"
          >
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
            <template #party>{{ ctr[0].id_squad.slice(-4) }}</template>
          </DataTable>
        </div>
        <UserSkeleton v-else />
      </q-card>
    </q-card>
  </q-page>
</template>
<script setup>
import AppBar from "@/slotComponents/AppBar.vue";
import DataTable from "@/slotComponents/DataTable.vue";
import UserSkeleton from "@/components/sekeltons/DashSquads.skeleton.vue";
import { url } from "@/helpers/EndPoints";
import { promiseSwal } from "@/utils/UsePromiseToast";
import { useFetch } from "@/composables/UseFetch";

const authStore = useAuth();
const { authUser } = storeToRefs(authStore);

const { userInit } = useOnSocket();

const assistance = ref(null);

onMounted(() => userInit());

const stateAttendance = computed(() => {
  return authUser.value?.player?.user[0]?.attendance === 1;
});

const stateSquad = computed(() => {
  return Object.entries(authUser.value?.player?.squad[0])?.length > 0;
});

watch(assistance, async (newAssis) => {
  if (newAssis === false) {
    await promiseSwal(
      "Cancelar?",
      "#target-toast",
      useFetch.bind(null, url.player.cancelConfirmation, "POST", {
        ...authUser.value?.player?.user[0],
      })
    );

    assistance.value = null;
  } else if (newAssis === true) {
    await promiseSwal(
      "Confirmar?",
      "#target-toast",
      useFetch.bind(null, url.player.confirmation, "POST", {
        ...authUser.value?.player?.user[0],
      })
    );
    assistance.value = null;
  }
});
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");
.card-player__titles {
  color: rgba(0, 0, 0, 0.6);
  font-family: "Slackey", cursive;
  -webkit-text-stroke: 0.6px rgba(36, 48, 132, 0.4);
}

.card-squad::before {
  content: "";
  position: absolute;
  height: 90%;
  width: 95%;
  left: 33%;
  top: 5%;
  margin-left: -30%;
  background: linear-gradient(
    45deg,
    #fb0094,
    #0000ff,
    #00ff00,
    #ffff00,
    #fb0094,
    #0000ff,
    #00ff00
  );
  background-size: 250%;
  filter: blur(14px);
  opacity: 0.3;
}
</style>
