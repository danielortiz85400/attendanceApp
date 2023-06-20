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
</template>

<script setup>
const {
  assisConfirmation,
  allNotifications,
  attNotify,
  allconfirmPlayers,
  allSquads,
  allPlayers,
} = useOnSocket();

onMounted(() => {
  allSquads();
  allconfirmPlayers();
  assisConfirmation();
  allNotifications();
  attNotify();
  allPlayers();
});
</script>
