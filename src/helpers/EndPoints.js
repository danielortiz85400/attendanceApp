export const url = {
  signIn: "http://localhost:4000/api/signIn",
  signUp: "http://localhost:4000/api/signUp",
  tokenRefresh: "http://localhost:4000/api/jwtRefresh",
  logout: "http://localhost:4000/api/logout",

  squad: {
    create: "http://localhost:4000/api/squads/createSquads",
    delete: "http://localhost:4000/api/squads/deleteSquads",
  },
  player: {
    create: "http://localhost:4000/api/players/playerSignUp",
    aPlayer: "http://localhost:4000/api/players/player",
    confirmation: "http://localhost:4000/api/players/confirmation",
    cancelConfirmation: "http://localhost:4000/api/players/cancelConfirmation",
  },
};
