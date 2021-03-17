const START_INDEX = 0;
const END_INDEX = 10;
async function loadPromo(url) {
  const response = await fetch(url);

  if (response.ok) {
    const result = await response.json();
    return result.slice(START_INDEX, END_INDEX);
  }

  throw new Error(response.status);
}

const generatedPromos = loadPromo('https://22.javascript.pages.academy/keksobooking/data');
export {generatedPromos};
