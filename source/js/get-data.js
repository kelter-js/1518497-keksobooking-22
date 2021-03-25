const MAX_PROMOS_LENGTH = 10;

async function loadPromo(url) {
  const response = await fetch(url);

  if (response.ok) {
    const result = await response.json();
    return result.slice(0, MAX_PROMOS_LENGTH);
  }

  throw new Error(response.status);
}

const generatedPromos = loadPromo('https://22.javascript.pages.academy/keksobooking/data');

export {generatedPromos};
