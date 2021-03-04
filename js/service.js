/* eslint-disable */
function getRandomNumber (from, to) {
  if (from === to) {
    console.log('Конечное значение диапазона cовпадает с начальным. Измените входные параметры.');
    return;
  }

  if (to < from) {
    console.log('Конечное значение диапазона меньше, чем его начало. Измените входные параметры.');
    return;
  }

  if (from < 0 || to < 0) {
    console.log('Конечное или начальное значения диапазона не могут быть отрицательными. Измените входные параметры.');
    return;
  }

  return Math.floor(Math.random() * (Math.floor(to) - Math.ceil(from) + 1)) + Math.ceil(from);
}

function getRandomNumberFloat (from, to, amountDigitals) {
  if (from === to) {
    console.log('Конечное значение диапазона cовпадает с начальным. Измените входные параметры.');
    return;
  }

  if (to < from) {
    console.log('Конечное значение диапазона меньше, чем его начало. Измените входные параметры.');
    return;
  }

  if (from < 0 || to < 0) {
    console.log('Конечное или начальное значения диапазона не могут быть отрицательными. Измените входные параметры.');
    return;
  }

  const result = amountDigitals == 0 ? Math.trunc(from + Math.random() * (to - from)) : +(from + Math.random() * (to - from)).toFixed(amountDigitals);
  if (result > to) {
    const numberIntoString = String(to);
    return +(numberIntoString.slice(0, numberIntoString.indexOf('.') + amountDigitals + 1));
  } else {
    return result;
  }
}

function shuffleArray (array) {
  const newArr = [...array].sort(() => Math.random() - 0.5);
  return newArr;
};

function cutArrayByRandomNumber (array) {
  array.length = getRandomNumber(1, array.length);
  return array;
};

function getRandomArrayElement (array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function deleteNode (node) {
  node.remove();
};

function wipeNode (node) {
  node.innerHTML = '';
}

function switchNodeContent (condition, node, value = condition, property = 'textContent') {
  condition ? node[property] = value : deleteNode(node);
}

function addClassToNode (node, nodeClass) {
  node.classList.add(nodeClass);
}

function deleteClassFromNode (node, nodeClass) {
  node.classList.remove(nodeClass);
}

function setNodeProperty (element, name, value) {
  element[name] = value;
}

function setElementsProperty (nodes, name, value) {
  [...nodes].map((node) => setNodeProperty(node, name, value));
}

function setElementProperties (element, names, values) {
  names.map((item, index) => element[item] = values[index])
}

export {getRandomNumber, getRandomNumberFloat, shuffleArray, cutArrayByRandomNumber, getRandomArrayElement, switchNodeContent, deleteNode, wipeNode, addClassToNode, setElementsProperty, deleteClassFromNode, setNodeProperty, setElementProperties};
/* eslint-enable */
