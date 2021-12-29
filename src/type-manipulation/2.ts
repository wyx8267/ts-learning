interface Button {
  type: 'default' | 'primary' | 'danger'
  text: string
}
const btn: Button = {
  type: 'primary',
  text: 'submit'
}