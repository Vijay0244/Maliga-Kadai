import toast from "react-hot-toast";

export const handleError = (err, setError, check) => {
  if (err.status == 500) {
    return toast.error("Internal Server Error");
  }
  if (
    check != "verify" &&
    (err.status == 401 ||
      err.status == 409 ||
      err.status == 400 ||
      err.status == 404)
  ) {
    return setError(err.response.data.error);
  }
  if (err.status == 429) {
    toast.error(err.response.data.error);
  }
};
