function deleteNode (node) {
  node.remove();
}

function wipeNode (node) {
  node.innerHTML = '';
}

function setNodeContent (node, elements) {
  elements.map((element) => node.append(element));
}

function findSubElement (node, subClass) {
  return node.querySelector(subClass);
}

function switchSubNodeContent (condition, node, subClass, value = condition, property = 'textContent') {
  const subElement = findSubElement(node, subClass);
  condition ? subElement[property] = value : deleteNode(subElement);
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

function pluralSelector ({one, few, many}, selector, minValue, maxValue, firstCondition = selector === minValue, secondCondition = selector <= maxValue) {
  if (firstCondition) {
    return one;
  }
  if (secondCondition) {
    return few;
  }
  return many;
}

export {
  switchSubNodeContent,
  findSubElement,
  deleteNode,
  wipeNode,
  addClassToNode,
  setElementsProperty,
  deleteClassFromNode,
  setNodeProperty,
  setElementProperties,
  pluralSelector,
  setNodeContent
};

