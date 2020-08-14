import {openModalWindow, closeModalWindow} from './modal'
import {postData} from '../services/services'

function forms(formsSelector, timeOutID) {
  const forms = document.querySelectorAll(formsSelector)

  const msg = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся', // obj with end msg
    failure: 'Что-то пошло не так...'
  }

  forms.forEach(form => {
    bindPostData(form)
  })

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()

      const statusMsg = document.createElement('img') // added spinner elem
      statusMsg.src = msg.loading
      statusMsg.alt = 'loading'
      statusMsg.style.cssText = `
        display: block;
        margin: 0 auto;
      `

      form.insertAdjacentElement('afterend', statusMsg) // added spnnier to page after form

      let formData = new FormData(form) // get data from form

      const json = JSON.stringify(Object.fromEntries(formData.entries())) // covert formData to JSON


      postData('http://localhost:3000/requests', json)
          .then(() => {
            showThanksModal(msg.success)
            statusMsg.remove()
          })
          .catch(() => {
            showThanksModal(msg.failure)
          })
          .finally(() => {
            form.reset()
          })
    })
  }

  function showThanksModal(msg) {
    const prevModalDialog = document.querySelector('.modal__dialog')

    prevModalDialog.classList.add('hide')

    openModalWindow('.modal', timeOutID)

    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML= `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${msg}</div>
      </div>
    `
    document.querySelector('.modal').append(thanksModal)

    setTimeout(() => {
      thanksModal.remove()
      prevModalDialog.classList.remove('hide')
      closeModalWindow('.modal')
    }, 4000)
  }
}

export default forms
