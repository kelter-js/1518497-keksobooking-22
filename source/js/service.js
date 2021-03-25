const deleteNode = (node) => node.remove();

const wipeNode = (node) => node.innerHTML = '';

const setNodeContent = (node, elements) => elements.map((element) => node.append(element));

const findSubElement = (node, subClass) => node.querySelector(subClass);

const switchSubNodeContent = (condition, node, subClass, value = condition, property = 'textContent') => {
  const subElement = findSubElement(node, subClass);
  condition ? subElement[property] = value : deleteNode(subElement);
}

const addClassToNode = (node, nodeClass) => node.classList.add(nodeClass);

const deleteClassFromNode = (node, nodeClass) => node.classList.remove(nodeClass);

const setNodeProperty = (element, name, value) => element[name] = value;

const setElementsProperty = (nodes, name, value) => [...nodes].map((node) => setNodeProperty(node, name, value));

const setElementProperties = (element, names, values) => names.map((item, index) => element[item] = values[index]);

const pluralSelector = ({one, few, many}, selector, minValue, maxValue, firstCondition = selector === minValue, secondCondition = selector <= maxValue) => {
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

