const request = async (endpoint, method = 'GET', body) => {
  const resp = await fetch(`${endpoint}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (resp.status > 300) {
    console.error(resp.status, resp.message);
  }

  const data = await resp.json();
  return data;
};

const updateWithClosure = () => {
  let lastUpdated = 0;
  let lastChatId = '';
  const MIN_SECONDS_BETWEEN_UPDATE = 10;

  const makeRequest = async (userId, activeChatId) => {
    if (!userId || !activeChatId) return;
    const secondsSinceLastUpdate = (Date.now() - lastUpdated) / 1000;
    const isSameChat = lastChatId === activeChatId;

    if (secondsSinceLastUpdate < MIN_SECONDS_BETWEEN_UPDATE && isSameChat) {
      console.log(
        `wait ${MIN_SECONDS_BETWEEN_UPDATE - secondsSinceLastUpdate} seconds before trying again`
      );
      return;
    }
    await request('/chat/update/activity', 'PUT', {
      userId,
      activeChatId,
    });
    lastUpdated = Date.now();
    lastChatId = activeChatId;
  };

  return makeRequest;
};

const updateChatActivity = updateWithClosure();

const Client = {
  request,
  updateChatActivity,
};

export default Client;
