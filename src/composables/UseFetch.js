export async function useFetch(url, method, data, onSuccess) {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
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
