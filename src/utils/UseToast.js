import Swal from "sweetalert2";

export const toast = (resp) => {
  const { [resp]: optToast } = {
    [resp?.error]: { icon: "error", text: resp?.error?.mssg },
    [resp?.success]: { icon: "success", text: resp?.success?.mssg },
    [resp?.validationError]: {
      icon: "warning",
      text: resp?.validationError?.mssg,
    },
    [resp?.errorConexion]: {
      icon: "warning",
      text: resp?.errorConexion?.mssg,
    },
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    width: 270,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  
  Toast.fire(optToast);
};
