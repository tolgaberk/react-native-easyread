/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class Bookmark {
  static Bookmarks = [];

  static Image =
    'https://www.vhv.rs/dpng/d/156-1563643_transparent-bookmark-icon-png-bookmark-icon-black-png.png';

  constructor(paragraphId) {
    this.paragraph = paragraphId;
  }

  createBookmark() {
    const paragraph = document.querySelector(`[pid="${this.paragraph}"]`);
    const paragraphPosition = paragraph.getBoundingClientRect();
    const bookmarkImage = document.createElement('img');
    bookmarkImage.src = Bookmark.Image;
    this.bookmarkWrapper = document.createElement('div');
    this.bookmarkWrapper.appendChild(bookmarkImage);
    this.bookmarkWrapper.style.position = 'absolute';
    this.bookmarkWrapper.style.top = paragraphPosition.top;
    this.bookmarkWrapper.style.right = paragraphPosition.right;
    document.getElementById('root').appendChild(this.bookmarkWrapper);
    Bookmark.Bookmarks.push(this.bookmarkWrapper);
  }

  remove() {
    this.bookmarkWrapper.remove();
  }

  static repositionBookmarks() {
    for (const bookmark of Bookmark.Bookmarks) {
      bookmark.remove();
    }
  }
}

export default Bookmark;
