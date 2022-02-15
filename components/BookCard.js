export class BookCard extends HTMLElement {
  constructor() {
    super()
    const template_content = document.getElementById('book-card').content
    this.shadow_root = this.attachShadow({ mode: 'open' })
    this.shadow_root.appendChild(template_content.cloneNode(true))

    this.book_name_span = this.shadow_root.querySelector('.book-name-span')
    this.book_description_span = this.shadow_root.querySelector('.book-description-span')
    this.book_created_at_span = this.shadow_root.querySelector('.book-created-at-span')
  }
  
  connectedCallback() {
    console.log('book card connected')
    const created_at_str = new Date(this.book.created_at).toLocaleDateString()

    this.book_name_span.innerHTML = `${this.book.name}&nbsp;`
    this.book_description_span.innerHTML = `${this.book.description}&nbsp;`
    this.book_created_at_span.innerHTML = `${created_at_str}&nbsp;`
  }
}