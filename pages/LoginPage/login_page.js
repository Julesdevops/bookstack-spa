import { SET_TOKEN_ID, SET_TOKEN_SECRET } from '../../state.js'
import { navigateTo } from '../../router.js'

let submit_btn = null
let token_id_input = null
let token_secret_input = null

function onSubmit() {
  const token_id = token_id_input.value
  const token_secret = token_secret_input.value

  SET_TOKEN_ID(token_id)
  SET_TOKEN_SECRET(token_secret)

  navigateTo('home')
}

export function onPageReady() {
  submit_btn = document.querySelector('#submit-btn')
  token_id_input = document.querySelector('#token-id-input')
  token_secret_input = document.querySelector('#token-secret-input')

  submit_btn.addEventListener('click', onSubmit)
}
