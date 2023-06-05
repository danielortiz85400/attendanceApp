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
              size="md"
              square
              color="grey-1"
              :text-color="stateSquad ? 'green-13' : 'red-5'"
              icon-right="star"
            >
              {{ stateSquad ? "En grupo " : "Sin grupo aún" }}
            </q-chip>
          </q-btn>
        </q-card>
        <!-- INFORMACIÓN DE JUGADOR -->
        <v-card
          class="ma-2 no-pointer-events elevation-2"
          width="230"
          height="260px"
          style="border-radius: 10px"
        >
          <app-bar :showCancelBttn="false">
            <template #mainContent>
              <div class="card-appbar__title q-mt-sm">PLAYER</div>
              <q-list
                v-for="({ nick, name, ctr, phone, name_server }, i) in authUser
                  ?.player?.user"
                :key="i"
              >
                <q-item>
                  <q-item-section class="text-center text-center">
                    <q-item-label class="text-weight-bold">
                      <q-chip
                        outline
                        square
                        color="white"
                        class="bg-indigo-4 glossy"
                      >
                        {{ nick }}
                      </q-chip>
                    </q-item-label>
                    <q-item-label caption class="text-capitalize"
                      >Nombre: {{ name }}</q-item-label
                    >
                    <q-item-label caption
                      >Clase personaje: {{ ctr }}</q-item-label
                    >
                    <q-item-label caption
                      >Server actual: {{ name_server }}</q-item-label
                    >
                    <q-item-label caption>Tel: {{ phone }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </template>
          </app-bar>
        </v-card>

        <!-- ASISTENCIA -->
        <v-card
          class="text-center pt-4 elevation-2"
          style="border-radius: 12px; line-height: 1.2; width: 230px"
        >
          <p class="card-appbar__title q-ma-none no-pointer-events">ASISTIR</p>
          <p class="text-caption text-bold">
            <q-item-label caption
              >Castle siege:
              <q-toggle
                toggle-indeterminate
                v-model="assistance"
                color="green-12"
                keep-color
                size="lg"
            /></q-item-label>
          </p>
        </v-card>
      </q-card>

      <!-- GRUPO/SQUAD -->
      <q-card
        class="no-shadow"
        id="target-toast"
        style="width: 400px; height: auto; border-radius: 12px"
      >
        <div v-if="authUser?.player?.squad[0]?.length">
          <TableSlot :data="authUser?.player?.squad">
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
          </TableSlot>
        </div>
        <UserSkeleton v-else />
      </q-card>
    </q-card>
    <!-- <pre>{{ authUser }}</pre> -->
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

const assistance = ref(null);

onMounted(() => userInit());

const stateAttendance = computed(() => {
  return authUser.value?.player?.user[0].attendance === 1;
});

const stateSquad = computed(() => {
  return Object.entries(authUser.value?.player?.squad[0])?.length > 0;
});

watch(assistance, async (newAssis) => {
  if (newAssis === false) {
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

    assistance.value = null;
  } else if (newAssis === true) {
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
    assistance.value = null;
  }
});
</script>
