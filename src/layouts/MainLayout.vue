<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="showHeader" elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <q-btn
          v-if="showBtnsDash"
          color="indigo-6"
          icon="notifications_active"
          glossy
        >
          <q-badge color="green-13" floating>{{ attNotify.length }}</q-badge>
          <q-menu persistent max-height="4000px">
            <q-list separator class="no-scroll" style="height: 400px">
              <div class="dropdown-title q-pa-lg">Notify</div>
              <q-separator spaced />
              <q-scroll-area style="height: 250px; width: 300px">
                <q-item
                  v-for="ctr in attNotify"
                  :key="ctr.id"
                  tag="label"
                  v-ripple
                >
                  <q-item-section class="q-ma-sm">
                    <q-item-label class="text-weight-medium"
                      ><q-chip
                        outline
                        class="shadow-1 bg-grey-2"
                        color="green-13"
                        >{{ ctr.nick }}</q-chip
                      ></q-item-label
                    >
                    <q-item-label caption>Clase: {{ ctr.ctr }}</q-item-label>
                    <q-item-label caption
                      >Confirmación de asistencia</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side top>
                    <q-item-label caption>5 min ago</q-item-label>
                    <q-checkbox
                      v-model="removeNotification"
                      :val="ctr"
                      color="green-13"
                    />
                  </q-item-section>
                </q-item>
              </q-scroll-area>
              <q-separator spaced />
            </q-list>
          </q-menu>
        </q-btn>

        <q-fab
          glossy
          square
          padding="sm md"
          icon="admin_panel_settings"
          direction="down"
          color="indigo-6"
          class="shadow-6 q-ml-md"
        >
          <q-fab-action
            v-if="showBtnsDash"
            color="indigo-6"
            glossy
            icon="person_add"
            label="Signup player"
            external-label
            label-class="bg-grey-3 text-grey-8"
            label-position="left"
            @click="showPlayerSignup"
          />
          <q-fab-action
            v-if="showBtnsDash"
            color="indigo-6"
            glossy
            icon=" manage_accounts"
            label="Signup adm"
            external-label
            label-class="bg-grey-3 text-grey-8"
            label-position="left"
            @click="showSignUp"
          />
          <q-fab-action
            color="indigo-6"
            glossy
            icon="exit_to_app"
            label="Salir"
            external-label
            label-class="bg-grey-3 text-grey-8"
            label-position="left"
            @click="logOut"
          />
        </q-fab>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import signUp from "@/components/signUp.vue";
import playerSignup from "@/components/PlayersSignup.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const store = useAuth();
const playerStore = usePlayers();

const { authUser } = storeToRefs(store);
const { attNotify } = storeToRefs(playerStore);

const { logOut } = store;

const removeNotification = ref([]);

const showHeader = computed(() => Object.keys(authUser.value)?.length);
const showBtnsDash = computed(() =>
  ["ADMINISTRADOR", "MODERADOR"].includes(authUser.value?.user?.user_role)
);

const showSignUp = () => {
  $q.dialog({
    component: signUp,
  })
    .onOk(() => {
      console.log("OK");
    })
    .onCancel(() => {
      console.log("Cancel");
    });
};
const showPlayerSignup = () => {
  $q.dialog({
    component: playerSignup,
  })
    .onOk(() => {
      console.log("OK");
    })
    .onCancel(() => {
      console.log("Cancel");
    });
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");

.dropdown-title {
  @include titleAuth-style;
  font-size: 27px;
  text-transform: capitalize;
  font-family: "Slackey", cursive;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
