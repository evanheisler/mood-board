export function handleJSONResponse(response) {
  let json = response.json();
  if (response.status >= 200 && response.status < 300) {
    return json;
  } else {
    return json
      .catch(parseErr => {
        let errObj = {
          errors: [
            {
              title: parseErr.message,
              meta: parseErr
            }
          ]
        };
        throw errObj;
      })
      .then(errJSON => {
        throw errJSON;
      });
  }
}
