import { serverURI } from './global-variables';

const createDraft = async () => {
  const response = await fetch(serverURI + '/create-draft', { method: 'POST' });
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

export { createDraft };