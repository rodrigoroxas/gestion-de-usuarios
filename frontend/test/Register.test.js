import { mount } from '@vue/test-utils'
import Register from '../src/components/Register.vue'
import { describe, it, expect } from 'vitest'

describe('Register.vue', () => {
  it('muestra el formulario de registro', () => {
    const wrapper = mount(Register)
    expect(wrapper.find('h1').text()).toBe('Registrarse')
  })

  it('muestra un campo de nombre', () => {
    const wrapper = mount(Register)
    expect(wrapper.find('input[placeholder="Nombre"]').exists()).toBe(true)
  })

  it('muestra un campo de correo electrónico', () => {
    const wrapper = mount(Register)
    expect(wrapper.find('input[placeholder="Correo Electrónico"]').exists()).toBe(true)
  })

  it('muestra un campo de contraseña', () => {
    const wrapper = mount(Register)
    expect(wrapper.find('input[placeholder="Contraseña"]').exists()).toBe(true)
  })

  it('muestra un campo de confirmación de contraseña', () => {
    const wrapper = mount(Register)
    expect(wrapper.find('input[placeholder="Confirmar Contraseña"]').exists()).toBe(true)
  })

  it('muestra un botón de registro', () => {
    const wrapper = mount(Register)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Registrarse')
  })

  it('muestra un mensaje de error si los campos están vacíos', async () => {
    const wrapper = mount(Register)
    await wrapper.find('button[type="submit"]').trigger('click')
    expect(wrapper.find('.text-red-500').exists()).toBe(true)
  })
})
