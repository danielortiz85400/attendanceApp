import { toast } from "@/utils/useToast";
import { useFetch } from "@/composables/UseFetch";
import { url } from "@/helpers/EndPoints";
import { promiseSwal } from "@/utils/UsePromiseToast";

export const useSquadStore = defineStore("groups", {
  state: () => ({
    characters: [],
    squad: [],
    squadToEliminate: [],
  }),

  actions: {
    //CREATE SQUADS
    async createSquad(players) {
      const { result } = await useFetch(url.squad.create, "POST", {
        ...players,
      });
      toast(result);
    },

    //DISARM  SQUAD
    async deleteSquad(squad) {
      await promiseSwal(
        "Eliminar?",
        "#target-toast",
        useFetch.bind(null, url.squad.delete, "DELETE", {
          ...squad,
        })
      );
      this.squadToEliminate = [];
    },
  },
});
