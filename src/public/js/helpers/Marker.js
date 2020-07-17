/* eslint-disable no-param-reassign */
// return all text nodes that are contained within `el`
function getTextNodes(el) {
  el = el || document.body;

  const doc = el.ownerDocument || document;
  // eslint-disable-next-line no-undef
  const walker = doc.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  let node;

  // eslint-disable-next-line no-cond-assign
  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }
  return textNodes;
}

// return true if `rangeA` intersects `rangeB`
function rangesIntersect(rangeA, rangeB) {
  return (
    // eslint-disable-next-line no-undef
    rangeA.compareBoundaryPoints(Range.END_TO_START, rangeB) === -1 &&
    // eslint-disable-next-line no-undef
    rangeA.compareBoundaryPoints(Range.START_TO_END, rangeB) === 1
  );
}

// create and return a range that selects `node`
function createRangeFromNode(node) {
  const range = node.ownerDocument.createRange();
  try {
    range.selectNode(node);
  } catch (e) {
    range.selectNodeContents(node);
  }
  return range;
}

// return true if `node` is fully or partially selected by `range`
function rangeIntersectsNode(range, node) {
  if (range.intersectsNode) {
    return range.intersectsNode(node);
  }
  return rangesIntersect(range, createRangeFromNode(node));
}

// returns true if `node` has text content
function isNonEmptyTextNode(node) {
  return node.textContent.length > 0;
}

// return all non-empty text nodes fully or partially selected by `range`
function getRangeTextNodes(range) {
  const container = range.commonAncestorContainer;
  const nodes = getTextNodes(container.parentNode || container);

  return nodes.filter(
    (node) => rangeIntersectsNode(range, node) && isNonEmptyTextNode(node),
  );
}

// remove `el` from the DOM
function remove(el) {
  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

// replace `node` with `replacementNode`
function replaceNode(replacementNode, node) {
  remove(replacementNode);
  node.parentNode.insertBefore(replacementNode, node);
  remove(node);
}

// unwrap `el` by replacing itself with its contents
function unwrap(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  replaceNode(range.extractContents(), el);
}

// undo the effect of `wrapRangeText`, given a resulting array of wrapper `nodes`
function undo(nodes) {
  nodes.forEach((node) => {
    const parent = node.parentNode;
    unwrap(node);
    parent.normalize();
  });
}

// create a node wrapper function
function createWrapperFunction(wrapperEl, range) {
  let startNode = range.startContainer;
  let endNode = range.endContainer;
  let { startOffset } = range;
  let { endOffset } = range;

  return function wrapNode(node) {
    const currentRange = document.createRange();
    const currentWrapper = wrapperEl.cloneNode();

    currentRange.selectNodeContents(node);

    if (node === startNode && startNode.nodeType === 3) {
      currentRange.setStart(node, startOffset);
      startNode = currentWrapper;
      startOffset = 0;
    }
    if (node === endNode && endNode.nodeType === 3) {
      currentRange.setEnd(node, endOffset);
      endNode = currentWrapper;
      endOffset = 1;
    }

    currentRange.surroundContents(currentWrapper);
    return currentWrapper;
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function wrapRangeText(wrapperEl, range) {
  let nodes;

  const wrapperObj = {};

  if (typeof range === 'undefined') {
    // get the current selection if no range is specified
    range = window.getSelection().getRangeAt(0);
  }

  if (range.isCollapsed) {
    // nothing to wrap
    return [];
  }

  if (typeof wrapperEl === 'undefined') {
    wrapperEl = 'span';
  }

  if (typeof wrapperEl === 'string') {
    // assume it's a tagname
    wrapperEl = document.createElement(wrapperEl);
  }

  const wrapNode = createWrapperFunction(wrapperEl, range);

  nodes = getRangeTextNodes(range);
  nodes = nodes.map(wrapNode);

  wrapperObj.nodes = nodes;
  wrapperObj.unwrap = () => {
    if (this.nodes.length) {
      undo(this.nodes);
      this.nodes = [];
    }
  };

  return wrapperObj;
}

export default wrapRangeText;
