const Client = {
  request: async (endpoint, method = 'GET', body) => {
      // fetch(`${endpoint}`, {
      //     method,
      //     body: JSON.stringify(body),
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      // })
      // .then(response => {console.log(response);response.json()})
      // .then(data => {
      //   console.log(data)
      // });
    const resp = await fetch(`${endpoint}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (resp.status !== 200) {
      return { status: resp.status, message: resp.message };
    }

    const data = await resp.json();
    return data;
  },
};

export default Client;
