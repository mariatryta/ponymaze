export default function fetchData(
  url,
  method = "GET",
  headers = null,
  body = null
) {
  const req = {
    method,
    ...(headers && { headers }),
    ...(body && { body })
  };

  return fetch(url, req).then(async (res) => {
    if (res.ok) {
      return await res.json();
    } else {
      const error = `Something went wrong while fetching data from ${url}`;

      return Promise.reject(error);
    }
  });
}
