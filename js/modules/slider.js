function slider({container, slides, prevArrow, nextArrow, curCounter, totCounter, wrapper, field}) {
  const offerSlider = document.querySelector(container),
      offerSlides = document.querySelectorAll(slides),
      prevBtn = document.querySelector(prevArrow),
      nextBtn = document.querySelector(nextArrow),
      curSliderCounter = document.querySelector(curCounter),
      totalSliderCounter = document.querySelector(totCounter),
      sliderWrapper = document.querySelector(wrapper),
      slidesField = document.querySelector(field),
      widthField = window.getComputedStyle(sliderWrapper).width

  curSliderCounter.textContent = '01'
  totalSliderCounter.textContent = (offerSlides.length < 10) ? `0${offerSlides.length}` : offerSlides.length

  let offset = 0;

  slidesField.style.width = `${100 * offerSlides.length}%`

  slidesField.style.display = 'flex'
  slidesField.style.transition = '0.5s all'
  sliderWrapper.style.overflow = 'hidden'

  offerSlides.forEach(item => {
    item.style.width = widthField
  })

  offerSlider.style.position = 'relative'

  // slider indicators

  const indicators = document.createElement('ol'),
      dots = []
  indicators.classList.add('carousel-indicators')
  offerSlider.append(indicators)

  for (let i = 0; i < offerSlides.length; i++) {
    const dot = document.createElement('li')
    dot.classList.add('dot')
    dot.setAttribute('data-slide-to', `${i + 1}`)
    if (i === 0) {
      dot.style.opacity = '1'
    }

    indicators.append(dot)
    dots.push(dot)
  }


  prevBtn.addEventListener('click', () => {
    if (offset === 0) {
      offset = strToNumber(widthField) * (offerSlides.length - 1)
    } else {
      offset -= strToNumber(widthField)
    }

    slidesField.style.transform = `translateX(${-offset}px)`

    if (+curSliderCounter.textContent === 1) {
      curSliderCounter.textContent = totalSliderCounter.textContent
    } else {
      curSliderCounter.textContent = (+curSliderCounter.textContent < 10) ? `0${+curSliderCounter.textContent - 1}` : +curSliderCounter.textContent - 1
    }

    changeDotStyle()
  })

  nextBtn.addEventListener('click', () => {
    if (offset === strToNumber(widthField) * (offerSlides.length - 1)) {
      offset = 0
    } else {
      offset += strToNumber(widthField)
    }

    slidesField.style.transform = `translateX(-${offset}px)`

    if (+curSliderCounter.textContent === +totalSliderCounter.textContent) {
      curSliderCounter.textContent = '01'
    } else {
      curSliderCounter.textContent = (+curSliderCounter.textContent < 10) ? `0${+curSliderCounter.textContent + 1}` : +curSliderCounter.textContent + 1
    }

    changeDotStyle()
  })

  dots.forEach(dot => {
    dot.addEventListener('click', (e)=> {
      const slideTo = e.target.getAttribute('data-slide-to')

      offset = strToNumber(widthField) * (slideTo - 1)
      slidesField.style.transform = `translateX(-${offset}px)`

      curSliderCounter.textContent = (slideTo < 10) ? `0${slideTo}` : slideTo

      changeDotStyle()
    })
  })


  function changeDotStyle() {
    dots.forEach(dot => dot.style.opacity = '.5')
    dots[+curSliderCounter.textContent - 1].style.opacity = '1'
  }

  function strToNumber(str) {
    return +str.match(/\d/ig).join('')
  }
}
export default slider
