import { mount } from '@vue/test-utils'
import Login from '../src/components/Login.vue'

describe('Login.vue', () => {
  it('entrega el formulario de registro', () => {
    const wrapper = mount(Login)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Iniciar Sesión')
  })
})
