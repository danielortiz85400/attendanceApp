import { defineStore } from "pinia";

export const usePlayers = defineStore("players", {
  state: () => ({
    allPlayers: [],
  }),
});
