import { serverURI } from './global-variables';

const createDraft = async () => {
  const response = await fetch(serverURI + '/blog/create-draft', { method: 'POST' });
  if (!response.ok) {
    const err = new Error(
      `There was an error. Status returned is ${response.status}.`
    );
    err.status = response.status;
    throw err;
  }

  const { blog_id } = await response.json();
  return blog_id;
}

const saveDataToServer = async (url, data) => {
  const response = await fetch(serverURI + url, {
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    method: 'POST',
  });

  if (!response.ok) {
    const err = new Error(
      `Something wrong occurred! The status code is ${response.status}`
    );
    err.status = response.status;
    throw err;
  }

  return { status: response.status, success: true };
}

export { createDraft, saveDataToServer };