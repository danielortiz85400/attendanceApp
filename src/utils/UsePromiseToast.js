/**
 * Composable que muestra un toast (sweetAlert2) con confirmación.
 * @param{string} texto pregunta.
 * @param{string} posición del toast.
 * @param{string} función a ejecutar.
 * @param{string} parámetros de la función.
 * @returns {object} - value
 * @property { string } - mssg
 * @property { string } - status
 */

import Swal from "sweetalert2";

export const promiseSwal = async (text, target, fn) => {
  const matchOptions = {
    width: 260,
    target,
    customClass: {
      container: "position-absolute",
    },
    toast: true,
    position: "bottom-right",
  };

  return Swal.fire({
    ...matchOptions,
    icon: "question",
    text,
    showCancelButton: true,
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        const { result } = await fn();
        console.log(result);
        const { [result?.status]: optToast } = {
          [200]: { icon: "success", text: result?.resp?.mssg },
          [400]: { icon: "error", text: result?.resp?.mssg },
        };

        Swal.fire({
          ...matchOptions,
          ...optToast,
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
        return { result };
      } catch (error) {
        console.log(error);
      }
    },
  });
};
