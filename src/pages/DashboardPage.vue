<template>
  <q-page class="flex flex-center">
    <div class="flex flex-center">
      <div><dash-attendance /></div>
      <div>
        <div><gauges-boxs /></div>

        <div class="q-mt-sm"><dash-squads /></div>
      </div>
    </div>
  </q-page>
  <q-btn @click="showSignUp">SIGN UP</q-btn>
  <q-btn @click="showPlayerSignup">PLAYER</q-btn>
</template>

<script setup>
import { useQuasar } from "quasar";
import signUp from "src/components/signUp.vue";
import playerSignup from "@/components/PlayersSignup.vue";

const $q = useQuasar();

const { disconnectSocket, ...initSockets } = useOnSocket();

onMounted(() => {
  Object.values(initSockets).forEach((func) => func());
});

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

onUnmounted(() => {
  disconnectSocket();
});
</script>
