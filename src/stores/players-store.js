import { defineStore } from "pinia";

export const usePlayers = defineStore("players", {
  state: () => ({
    allPlayers: [],
    newConfirmation: [],
  }),
  actions: {
    //SIGNUP PLAYERS
    async playerSignUp(player) {
      const { result } = await useFetch(url.player.create, "POST", player);
      return { result };
    },
  },
});
