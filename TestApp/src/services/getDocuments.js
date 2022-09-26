export default async function getDocuments() {
  const url = 'http://localhost:8080/documents';

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
    });
}
