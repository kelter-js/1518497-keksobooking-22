async function loadPromo(url) {
  const response = await fetch(url);

  if (response.ok) {
    const result = await response.json();
    result.length = 10;
    return result;
  }

  throw new Error(response.status);
}

const generatedPromos = loadPromo('https://22.javascript.pages.academy/keksobooking/data');
export {generatedPromos};
