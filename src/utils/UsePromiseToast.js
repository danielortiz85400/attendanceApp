import Swal from "sweetalert2";
/**
 * @param {string} text - Pregunta(?)
 * @param {string} target - Posición del toast
 * @param {Function} fn Función a ejecutar.
 * @returns  Swal.fire (toast)
 */

export const promiseSwal = async (text, target, fn) => {
  const matchOptions = {
    toast: true,
    width: 260,
    target,
    customClass: {
      container: "position-absolute",
    },
    position: "bottom-right",
  };

  return new Promise((resolve, reject) => {
    Swal.fire({
      ...matchOptions,
      icon: "question",
      text,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const { result } = await fn();

          const { [result?.status]: optToast } = {
            [200]: { icon: "success", text: result?.resp?.mssg },
            [400]: { icon: "error", text: result?.resp?.mssg },
            [422]: { icon: "error", text: result?.resp?.mssg },
          };

          Swal.fire({
            ...matchOptions,
            ...optToast,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });

          resolve(result);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      },
    }).then((opt) => {
      if (!opt.value) return resolve({ result: false });
    });
  });
};
