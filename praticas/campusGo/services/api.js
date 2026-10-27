const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(path, options) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/${path}`, options);
  } catch (err) {
    throw new Error(
      'Não foi possível conectar ao servidor. Verifique a URL e a internet.'
    );
  }
  if (!response.ok) {
    throw new Error(`Erro ao acessar o servidor (HTTP ${response.status}).`);
  }
  return response.json();
}

export const api = {
  get: (path) => request(path),
  create: (resource, body) =>
    request(resource, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(body),
    }),
};