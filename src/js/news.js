/* eslint-disable class-methods-use-this */
export default class News {
  constructor(elem, url) {
    if (typeof (elem) === 'string') {
      this.element = document.querySelector(elem);
    } else {
      this.element = elem;
    }
    this.url = url;
    this.feed = this.element.querySelector('.news-feed');
    this.btn = this.element.querySelector('.btn');

    this.btn.addEventListener('click', () => {
      this.feed.innerHTML = '';
      this.refresh();
    });
  }

  init() {
    (async () => {
      try {
        const response = await fetch(this.url);
        if (response.ok) {
          const json = await response.json();
          this.feed.innerHTML = '';
          json.forEach((el) => {
            this.feed.insertAdjacentHTML('afterbegin', this.itemFactory(el));
          });
        }
      } catch (e) {
        this.element.querySelector('.modal').classList.toggle('invalid');
      }
    })();
  }

  blackItemFactory() {
    return `
      <div class="news-item">
                <div class="item-timestamp black">
                    <span>Lorem</span>
                </div>
                <div class="item-body">
                    <div class="item-img black"></div>
                    <div class="item-text">
                        <h2 class="black">LoremLorem</h2>
                        <span class="black">LoremLoremLoremvLoremvLoremLoremLorem</span>
                    </div>
                </div>
            </div>
      `;
  }

  refresh() {
    for (let i = 0; i < 3; i += 1) {
      this.feed.insertAdjacentHTML('afterbegin', this.blackItemFactory());
    }
    this.init();
  }

  itemFactory(obj) {
    return `
      <div class="news-item">
            <div class="item-timestamp">
                <span>${obj.timestamp}</span>
            </div>
            <div class="item-body">
                <div class="item-img" style="background-color: ${obj.color}"></div>
                <div class="item-text">
                    <h2>${obj.header}</h2>
                    <span>${obj.text}</span>
                </div>
            </div>
        </div>
      `;
  }
}
