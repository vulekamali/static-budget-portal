export default function fetchWrapper(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(response);
        }

        const isText = options.json === 'false';
        const parse =  isText ? response.json() : response.text()

        parse
          .then((data) => {
            if (data.success === 'false') {
              reject('Requested failed inside CKAN');
            }

            resolve(data);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}
