import { toast } from "@/utils/useToast";

export const useSquadStore = defineStore("groups", {
  state: () => ({
    characters: [],
    squad: [],
    playersToEliminate: [],
  }),

  actions: {
    // ALL SQUADS
    // async allSquads() {
    //   const resp = await fetch("http://localhost:4000/api/squads/allSquads");
    //   const squads = await resp.json();
    //   this.squad = squads?.success.squads;
    // },
    //CREATE SQUADS
    async createSquad(players) {
      try {
        this.loadingSquads = true;
        const resp = await fetch(
          "http://localhost:4000/api/squads/createSquads",
          {
            method: "POST",
            body: JSON.stringify(players),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const result = await resp.json();

        toast(result);
        const { allconfirmPlayers, allSquads } = useOnSocket();
        allconfirmPlayers();
        allSquads();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },

    //DELETE SQUAD
    async deleteSquad(players) {
      const resp = await fetch(
        "http://localhost:4000/api/squads/deleteSquads",
        {
          method: "DELETE",
          body: JSON.stringify(players),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result = await resp.json();
      const { allconfirmPlayers, allSquads } = useOnSocket();
      allconfirmPlayers();
      allSquads();
      this.playersToEliminate = [];
      console.log(result);
      return { result };
    },

    //SIGNUP PLAYERS
    async playerSignUp(player) {
      const resp = await fetch(
        "http://localhost:4000/api/players/playerSignUp",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(player),
        }
      );

      const result = await resp.json();
      console.log(result);
      return { result };
    },
  },
});
