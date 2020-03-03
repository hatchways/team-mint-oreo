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
  const MIN_SECONDS_BETWEEN_UPDATE = 2;

  const makeRequest = async ({ userId, chatId, bypassLimit = false, socket }) => {
    if (!userId || !chatId) return;
    const secondsSinceLastUpdate = (Date.now() - lastUpdated) / 1000;
    const isSameChat = lastChatId === chatId;

    if (!bypassLimit && secondsSinceLastUpdate < MIN_SECONDS_BETWEEN_UPDATE && isSameChat) return;

    socket.emit('updateActivity', userId, chatId);
    console.log('updating activity');
    await request('/chat/update/activity', 'PUT', {
      userId,
      chatId,
    });
    lastUpdated = Date.now();
    lastChatId = chatId;
  };

  return makeRequest;
};

const updateChatActivity = updateWithClosure();

const Client = {
  request,
  updateChatActivity,
};

export default Client;
