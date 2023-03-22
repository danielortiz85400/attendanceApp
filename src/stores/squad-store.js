import { toast } from "@/utils/useToast";
import { useFetch } from "src/composables/UseFetch";
import { requestOptions } from "../helpers/RequestOptions";
import { url } from "../helpers/EndPoints";

export const useSquadStore = defineStore("groups", {
  state: () => ({
    characters: [],
    squad: [],
    playersToEliminate: [],
  }),

  actions: {
    //CREATE SQUADS
    async createSquad(players) {
      await useFetch(
        url.squad.create,
        requestOptions.postSquad(players),
        (result) => {
          toast(result);
          const { allconfirmPlayers, allSquads } = useOnSocket();
          allconfirmPlayers();
          allSquads();
        }
      );
    },

    //DELETE SQUAD
    async deleteSquad(players) {
      const { result } = await useFetch(
        url.squad.delete,
        requestOptions.delete(players),
        () => {
          const { allconfirmPlayers, allSquads } = useOnSocket();
          allconfirmPlayers();
          allSquads();
        }
      );
      this.playersToEliminate = [];
      return { result };
    },

    //SIGNUP PLAYERS
    async playerSignUp(player) {
      const { result } = await useFetch(
        url.player.create,
        requestOptions.postSquad(player)
      );
      return { result };
    },
  },
});
