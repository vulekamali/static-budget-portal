export default function fetchWrapper(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(response);
        }

        response.json()
          .then((data) => {
            resolve(data);
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}
