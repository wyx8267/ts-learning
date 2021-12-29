interface Button {
  text: string
}
interface Link {
  href: string
}
const linkBtn: Button & Link = {
  text: 'submit',
  href: 'http://www.baidu.com'
}