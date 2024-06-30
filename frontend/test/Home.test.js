import { mount } from '@vue/test-utils'
import Home from '../src/components/Home.vue'
import { describe, it, expect } from 'vitest'

describe('Home.vue', () => {
  it('muestra el mensaje de bienvenida', () => {
    const wrapper = mount(Home)
    expect(wrapper.find('h1').text()).toBe('Bienvenido al Sistema de Gestión de Usuarios')
  })

  it('muestra la instrucción de navegación', () => {
    const wrapper = mount(Home)
    expect(wrapper.find('p').text()).toBe('Utiliza el menú de navegación para acceder a las funcionalidades del sistema.')
  })

  it('muestra el enlace a la gestión de usuarios', () => {
    const wrapper = mount(Home)
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('Ir a Gestión de Usuarios')
  })
})
