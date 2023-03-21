export function useOnSocket() {
  const squadStore = useSquadStore();
  const { socket } = useSocket();

  const allconfirmPlayers = () => {
    socket.on("allconfirmPlayers", (players) => {
      console.log("Datos iniciales recibidos", players);
      squadStore.$patch((state) => {
        state.characters = players;
      });
    });
  };
  const allSquads = () => {
    socket.on("allSquads", (squads) => {
      console.log("Squads iniciales recibidos", squads);
      squadStore.$patch((state) => {
        state.squad = squads;
      });
    });
  };
  const assisConfirmation = () => {
    socket.on("assisConfirmation", (newPlayers) => {
      console.log("Nuevo usuario recibido", newPlayers);
      squadStore.$patch((state) => state.characters.push(newPlayers));
    });
  };

  const socketConnect = () => {
    socket.on("connect", () => {
      console.log("Conectado al servidor");
    });
  };
  const socketAuth = () => {
    socket.on("connect_error", (error) => {
      console.log("Error al conectar al servidor de Socket.IO", error);
    });
  };
  const disconnectSocket = () => {
    socket.disconnect();
  };

  return {
    allconfirmPlayers,
    allSquads,
    assisConfirmation,
    disconnectSocket,
    socketConnect,
    socketAuth,
  };
}
