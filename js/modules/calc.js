function calc() {
  const result = document.querySelector('.calculating__result span')

  let sex = (localStorage.getItem('sex')) ? localStorage.getItem('sex') : 'female',
      height, weight, age,
      ratio = (localStorage.getItem('ratio')) ? localStorage.getItem('ratio') : 1.375

  initLocalSettings('#gender div', 'calculating__choose-item_active')
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

  calcTotal()

  getStaticInfo('#gender', 'calculating__choose-item_active')
  getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active')

  getDinamicInfo('#height')
  getDinamicInfo('#weight')
  getDinamicInfo('#age')

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____'
      return
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
    }
  }

  function getStaticInfo(parentSelector, activeClass) {
    const elems = document.querySelectorAll(`${parentSelector} div`)

    elems.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (elem.getAttribute('data-ratio')) {
          ratio = +elem.getAttribute('data-ratio')
          localStorage.setItem('ratio', ratio)


        } else {
          sex = elem.getAttribute('id')
          localStorage.setItem('sex', sex)

        }

        elems.forEach(elem => elem.classList.remove(activeClass))
        e.target.classList.add(activeClass)

        calcTotal()
      })
    })
  }

  function getDinamicInfo(selector) {
    const input = document.querySelector(`${selector}`)


    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red'
      } else {
        input.style.border = 'none'
      }
      switch (input.getAttribute('id')) {
        case ('height'):
          height = +input.value
          break
        case ('weight'):
          weight = +input.value
          break
        case ('age'):
          age = +input.value
          break
      }

      calcTotal()
    })
  }

  function initLocalSettings(selector, activeClass) {
    const elems = document.querySelectorAll(`${selector}`)

    elems.forEach(elem => {
      elem.classList.remove(activeClass)
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass)
      } else if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass)
      }
    })
  }
}
export default calc
