import { toast } from "@/utils/useToast";
import { useFetch } from "@/composables/UseFetch";
import { url } from "@/helpers/EndPoints";

export const useSquadStore = defineStore("groups", {
  state: () => ({
    characters: [],
    squad: [],
    playersToEliminate: [],
  }),

  actions: {
    //CREATE SQUADS
    async createSquad(players) {
      await useFetch(url.squad.create, "POST", players, (result) => {
        toast(result);
      });
    },

    //DELETE SQUAD
    async deleteSquad(players) {
      const { result } = await useFetch(url.squad.delete, "DELETE", players);
      this.playersToEliminate = [];
      return { result };
    },

    //SIGNUP PLAYERS
    async playerSignUp(player) {
      const { result } = await useFetch(url.player.create, "POST", player);
      return { result };
    },
  },
});
