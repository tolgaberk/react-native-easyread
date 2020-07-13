const types: MessageType = {
  // WINDOW EVENTS
  ON_LOAD: 'ON_LOAD',
  ON_LOAD_END: 'ON_LOAD_END',
  ON_CLOSE: 'ON_CLOSE',
  CONFIRMATION: 'CONFIRMATION',
  NOOP: 'NOOP',
  ERROR: 'ERROR',

  GO_TO_PAGE: 'GO_TO_PAGE',
  GO_TO_PARAGRAPH: 'GO_TO_PARAGRAPH',

  ON_GO_TO_PAGE: 'ON_GO_TO_PAGE',
  ON_GO_TO_PARAGRAPH: 'ON_GO_TO_PARAGRAPH',

  // BOOKMARK EVENTS
  CREATE_BOOKMARK: 'CREATE_BOOKMARK',
  ON_CREATE_BOOKMARK: 'ON_CREATE_BOOKMARK',

  DELETE_BOOKMARK: 'DELETE_BOOKMARK',
  ON_DELETE_BOOKMARK: 'ON_DELETE_BOOKMARK',

  UPDATE_BOOKMARK: 'UPDATE_BOOKMARK',
  ON_UPDATE_BOOKMARK: 'ON_UPDATE_BOOKMARK',

  ON_BOOKMARK_SELECTED: 'ON_BOOKMARK_SELECTED',
  ALREADY_BOOKMARKED: 'ALREADY_BOOKMARKED',

  // HIGHLIGHT EVENTS
  CREATE_HIGHLIGHT: 'CREATE_HIGHLIGHT',
  ON_CREATE_HIGHLIGHT: 'ON_CREATE_HIGHLIGHT',

  DELETE_HIGHLIGHT: 'DELETE_HIGHLIGHT',
  ON_DELETE_HIGHLIGHT: 'ON_DELETE_HIGHLIGHT',

  UPDATE_HIGHLIGHT: 'UPDATE_HIGHLIGHT',
  ON_UPDATE_HIGHLIGHT: 'ON_UPDATE_HIGHLIGHT',

  ON_HIGHLIGHT_SELECTED: 'ON_HIGHLIGHT_SELECTED',
  ALREADY_HIGHLIGHTED: 'ALREADY_BOOKMARKED',

  // CUSTOMIZATION EVENTS
  CHANGE_BACKGROUND_COLOR: 'CHANGE_BACKGROUND_COLOR',
  CHANGE_FONTWEIGHT: 'CHANGE_FONTWEIGHT',
  CHANGE_FONTWEIGHT_OF_SELECTED: 'CHANGE_FONTWEIGHT_OF_SELECTED',
  CHANGE_TEXT_DECORATION_OF_SELECTED: 'CHANGE_TEXT_DECORATION_OF_SELECTED',
  CHANGE_FONT_SIZE: 'CHANGE_FONT_SIZE',
  CHANGE_LINEHEIGHT: 'CHANGE_LINEHEIGHT',
  CHANGE_PADDING: 'CHANGE_PADDING',
  CHANGE_FONTCOLOR: 'CHANGE_FONTCOLOR',
  CHANGE_FONT_FAMILY: 'CHANGE_FONT_FAMILY',
  CHANGE_TEXT_ALIGNMENT: 'CHANGE_TEXT_ALIGNMENT',
  CHANGE_TEXT_DIRECTION: 'CHANGE_TEXT_DIRECTION',
  COLORIZE_SENTENCES: 'COLORIZE_SENTENCES',

  // PAGE EVENTS
  CHANGE_PAGE_FORWARD: 'CHANGE_PAGE_FORWARD',
  ON_CHANGE_PAGE_FORWARD: 'ON_CHANGE_PAGE_FORWARD',

  CHANGE_PAGE_BACKWARD: 'CHANGE_PAGE_BACKWARD',
  ON_CHANGE_PAGE_BACKWARD: 'ON_CHANGE_PAGE_BACKWARD',

  TOGGLE_AUTO_SCROLL: 'TOGGLE_AUTO_SCROLL',
  ON_SCROLL_CHANGE: 'ON_SCROLL_CHANGE',

  // POINTER EVENTS
  ON_MOUSE_UP: 'ON_MOUSE_UP',
  ON_MOUSE_DOWN: 'ON_MOUSE_DOWN',
  ON_POINTER_DOWN: 'ON_POINTER_DOWN',
  ON_POINTER_MOVE: 'ON_POINTER_MOVE',
  ON_POINTER_CANCEL: 'ON_POINTER_CANCEL',

  ON_SELECTION: 'ON_SELECTION',
  ON_SELECTION_CHANGE: 'ON_SELECTION_CHANGE',

  ON_ORIENTATION_CHANGE: 'ON_ORIENTATION_CHANGE',
};

export default types;

type MessageType = {
  [key: string]: string;
};