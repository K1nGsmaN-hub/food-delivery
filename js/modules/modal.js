function openModalWindow(modalSelector, timeOutID) {
  const modalWindow = document.querySelector(modalSelector)
  modalWindow.classList.add('modal_active')
  document.body.style.overflow = 'hidden'
  if (timeOutID) {
    clearInterval(timeOutID)
  }
}
function closeModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector)
  modalWindow.classList.remove('modal_active')
  document.body.style.overflow = 'auto'
}

function modal(triggerSelector, modalSelector, timeOutID) {
  const btnsOpenModal = document.querySelectorAll(triggerSelector),
      modalWindow = document.querySelector(modalSelector)


  btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', ()=> {
      openModalWindow('.modal', timeOutID)
    })
  })


  modalWindow.addEventListener('click', (e)=> {
    if (e.target === modalWindow || e.target.dataset.close === '') {
      closeModalWindow('.modal')
    }
  })

  document.addEventListener('keydown', (e)=> {
    if (e.code === 'Escape' && modalWindow.classList.contains('modal_active')) {
      closeModalWindow('.modal')
    }
  })

  window.addEventListener('scroll', showModalWindowByScroll)


  function showModalWindowByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModalWindow('.modal', timeOutID)

      window.removeEventListener('scroll', showModalWindowByScroll)
    }
  }

}
export default modal

export {openModalWindow}
export {closeModalWindow}
