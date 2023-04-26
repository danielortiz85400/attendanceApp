import { toast } from "@/utils/useToast";
import { useFetch } from "@/composables/UseFetch";
import { url } from "@/helpers/EndPoints";

export const useSquadStore = defineStore("groups", {
  state: () => ({
    characters: [],
    squad: [],
    squadToEliminate: [],
  }),

  actions: {
    //CREATE SQUADS
    async createSquad(players) {
      await useFetch(url.squad.create, "POST", players, (result) => {
        toast(result);
      });
    },

    //DELETE SQUAD
    async deleteSquad(squadToDelete) {
      const { result } = await useFetch(
        url.squad.delete,
        "DELETE",
        squadToDelete
      );
      this.squadToEliminate = [];
      return { result };
    },
  },
});
