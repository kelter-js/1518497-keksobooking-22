import {onFailToLoad} from './error.js';

async function loadPromo(url) {
  const response = await fetch(url);

  if (response.ok) {
    const result = await response.json();
    return result;
  }

  throw new Error(response.status);
}

const generatedPromos = loadPromo('https://22.javascript.pages.academy/keksobooking/data').catch(onFailToLoad);
export {generatedPromos};
