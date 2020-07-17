/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Bookmark from './Bookmark';

class Paragraph {
  static Paragraphs = {};

  constructor({
    paragraphId,
    bookId,
    pageNo,
    contentMarkDown: contentHtml,
    languageId,
  }) {
    this.paragraphId = paragraphId;
    this.bookId = bookId;
    this.pageNo = pageNo;
    this.contentHtml = contentHtml;
    this.languageId = languageId;
    this.bookmarked = false;
    this.highlightInfo = null;
    Paragraph.Paragraphs[this.paragraphId] = this;
  }

  createElement() {
    this.htmlElement = document.createElement('p');
    this.htmlElement.className = 'paragraph';
    this.htmlElement.setAttribute('pid', this.paragraphId.toString());
    this.htmlElement.innerHTML = this.contentHtml;
    return this.htmlElement;
  }

  appendToRoot() {
    document.getElementById('root').appendChild(this.htmlElement);
  }

  appendToElement(selector = '#root') {
    document.querySelector(selector).appendChild(this.htmlElement);
  }

  bookmark() {
    Bookmark(this.paragraphId);
    this.bookmarked = true;
  }
}
export default Paragraph;
