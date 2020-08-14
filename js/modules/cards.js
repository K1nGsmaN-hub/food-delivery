import {getResource} from '../services/services'

function cards() {

  class MenuItem {
    constructor(imgPath, imgAlt, title, text, price) {
      this.imgPath = imgPath
      this.imgAlt = imgAlt
      this.title = title
      this.text = text
      this.price = price
    }

    makeMenu() {
      const div = document.createElement('div')

      div.classList.add('menu__item')

      div.appendChild(this.makeImage())
      div.appendChild(this.makeTitle())
      div.appendChild(this.makeText())
      div.appendChild(this.makeDivider())
      div.appendChild(this.makePrice())

      document.querySelector('.menu__field .container').appendChild(div)

    }

    makeImage() {
      const img = document.createElement('img')

      img.src = this.imgPath
      img.alt = this.imgAlt

      return img
    }

    makeTitle() {
      const h3 = document.createElement('h3')

      h3.classList.add('menu__item-subtitle')
      h3.textContent = this.title

      return h3
    }

    makeText() {
      const div = document.createElement('div')

      div.classList.add('menu__item-descr')
      div.textContent = this.text

      return div
    }

    makeDivider() {
      const div = document.createElement('div')

      div.classList.add('menu__item-divider')

      return div
    }

    makePrice() {
      const div = document.createElement('div'),
          divCost = document.createElement('div'),
          divPrice = document.createElement('div'),
          total = document.createElement('span')

      div.classList.add('menu__item-price')

      divCost.classList.add('menu__item-cost')
      divCost.textContent = 'Цена:'

      divPrice.classList.add('menu__item-total')

      total.textContent = `${this.price}`

      divPrice.appendChild(total)
      divPrice.innerHTML += ' грн/день'

      div.appendChild(divCost)
      div.appendChild(divPrice)

      return div
    }
  }



  getResource('http://localhost:3000/menu')
      .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
          new MenuItem(img, altimg, title, descr, price).makeMenu()
        })
      })

}
export default cards
