export function useOnSocket() {
  const squadStore = useSquadStore();
  const playerStore = usePlayers();
  const authStore = useAuth();
  const serverStore = useServers()

  const { socket } = useSocket();

  // EMITS DE INICIALIZACIÓN
  const allPlayers = () => {
    socket.on("allSignupPlayers", (players) => {
      console.log("Datos players recibidos", players);
      playerStore.$patch((state) => {
        state.allPlayers = players;
      });
    });
  };
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
  const allServers = () => {
    socket.on("allServers", (servers) => {
      console.log("Servidores actuales:", servers);
      serverStore.$patch((state) => {
        state.servers = servers;
      });
    });
  };
  const allNotifications = () => {
    socket.on("allNotifications", (notifications) => {
      console.log("Notificaciones de confirmacion:", notifications);
      playerStore.$patch((state) => {
        state.attNotify = notifications;
      });
    });
  };

  // EMITS DE RUTAS (API)
  const userInit = () => {
    socket.on("userInit", (userUpdate) => {
      console.log("Confirmacion actualizada", userUpdate);
      authStore.$patch((state) => {
        state.authUser = userUpdate?.success;
      });
    });
  };
  const assisConfirmation = () => {
    socket.on("assisConfirmation", (newPlayer) => {
      console.log("Nuevo usuario recibido", newPlayer);
      squadStore.$patch((state) => {
        state.characters.push(newPlayer);
      });
    });
  };
  const attNotify = () => {
    socket.on("attNotify", (notify) => {
      console.log("attNotify", notify);
      playerStore.$patch((state) => state.attNotify.push(notify));
    });
  };
  // EMITS DE ARRANQUE
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
    allPlayers,
    allconfirmPlayers,
    allSquads,
    allServers,
    allNotifications,

    userInit,
    assisConfirmation,
    attNotify,

    disconnectSocket,
    socketConnect,
    socketAuth,
  };
}
