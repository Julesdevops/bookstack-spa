import { navigateTo } from '../../router'
import { REMOVE_TOKEN_ID, REMOVE_TOKEN_SECRET } from '../../state'
import { ActionType } from '../../types'

export interface IShowSnackbarOptions {
  undo: false | (() => void)
}

export interface IShowSnackbarParams {
  content: string
  type: ActionType
  options?: IShowSnackbarOptions
}

let previous_link = null
let current_link = null

function onLinkClicked(e: Event) {
  e.preventDefault()
  previous_link = current_link
  current_link = this
  navigateTo({ route_name: this.id.split('-')[0] })
}

function hideSnackbar(snackbar) {
  snackbar.classList.remove('show')
}

export function init(route) {
  for (const nav_link of document.querySelectorAll('.nav-link')) {
    if (nav_link.id === `${route.name}-page-link`) {
      current_link = nav_link
    }

    nav_link.addEventListener('click', onLinkClicked)
  }

  document.getElementById('clear-credentials-btn').addEventListener('click', () => {
    REMOVE_TOKEN_ID()
    REMOVE_TOKEN_SECRET()
    navigateTo({ route_name: 'login' })
  })

  const snackbar = document.querySelector('#default-layout-snackbar')
  document.querySelector('#close-snackbar-btn').addEventListener('click', hideSnackbar.bind(null, snackbar))
}

export function onNavigationComplete(to, from) {    
  if (from) {
    if (previous_link == undefined || previous_link.id.split('-')[0] !== from.name) {
      previous_link = document.querySelector(`#${from.name}-page-link`)
    }
  }

  if (previous_link) {
    previous_link.classList.remove('active')
  }

  if (current_link == undefined || current_link.id.split('-')[0] !== to.name) {
    current_link = document.querySelector(`#${to.name}-page-link`)
  }
  
  if (current_link) {
    current_link.classList.add('active')
  }
}

export function showSnackbar({ content, type, options }: IShowSnackbarParams) {
  const snackbar = document.querySelector('#default-layout-snackbar')
  const snackbar_text_content_span = document.querySelector('#snackbar-text-content')

  snackbar_text_content_span.textContent = content

  snackbar.classList.add(`background-${type}`)
  snackbar.classList.add('show')

  if (options?.undo) {
    const snackbar_undo_btn = document.querySelector('#snackbar-undo-btn')

    snackbar_undo_btn.addEventListener('click', options.undo, {
      once: true
    })

    window.setTimeout(removeEventListener.bind(snackbar_undo_btn, 'click', options.undo), 6000)
  }

  window.setTimeout(hideSnackbar.bind(null, snackbar), 6000)
}