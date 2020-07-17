class DocSelection {
  static currentSelection;

  constructor(selection = window.getSelection()) {
    this.selection = selection;
    this.text = selection.toString();
    if (text !== '') {
      this.range = selection.getRangeAt(0);
    }
    DocSelection.currentSelection = this;
  }

  prepForReactNative() {
    const selection = JSON.stringify(this.selection);
    const range = JSON.stringify(this.range);
    return { selection, range, text: this.text };
  }

  collapse() {
    this.selection.collapseToEnd();
  }
}

export default DocSelection;
