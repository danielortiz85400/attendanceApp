import { url } from "../helpers/EndPoints";
import { useOnSocket } from "../composables/useListeningSocket";

export const useUser = (id) => {
  const user = ref(null);

  try {
    watchEffect(async () => {
      const resp = await fetch(url.player.aPlayer, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const result = await resp.json();
      user.value = result.resp.body;
      const { confirmedPlayer } = useOnSocket();
      confirmedPlayer();
    });

    return { user };
  } catch (error) {
    console.log(error);
  }
};
