export async function useFetch(url, opts, onSuccess) {
  try {
    const response = await fetch(url, opts);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const result = await response.json();

    onSuccess ? onSuccess(result) : false;
    return { result };
  } catch (error) {
    console.log(error);
  }
}
