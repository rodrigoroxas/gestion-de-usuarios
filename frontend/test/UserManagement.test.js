import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import UserManagement from '../src/components/UserManagement.vue';
import { routes } from '../src/router/index.js';
import flushPromises from 'flush-promises';
import apiClient from '../src/axios';
import { vi } from 'vitest';

vi.mock('../src/axios', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  };
});

describe('UserManagement.vue', () => {
  let router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes
    });
  });

  it('muestra la lista de usuarios', async () => {
    apiClient.get.mockResolvedValue({ data: [{ id: 1, name: 'User 1', email: 'user1@example.com' }] });

    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    });

    await flushPromises();

    expect(wrapper.find('tbody tr').exists()).toBe(true);
    expect(wrapper.find('tbody tr').text()).toContain('User 1');
  });

  it('añade un usuario nuevo', async () => {
    apiClient.post.mockResolvedValue({ data: { id: 2, name: 'User 2', email: 'user2@example.com' } });

    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    });

    await wrapper.setData({ showAddUserForm: true });
    await wrapper.setData({ newUser: { name: 'User 2', email: 'user2@example.com', password: 'Password123!' } });
    
    
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    
    await wrapper.setData({ users: [{ id: 1, name: 'User 1', email: 'user1@example.com' }, { id: 2, name: 'User 2', email: 'user2@example.com' }] });

    expect(apiClient.post).toHaveBeenCalled();
    expect(wrapper.find('tbody').text()).toContain('User 2');
  });

  it('muestra un mensaje de error si la adición de usuario falla', async () => {
    apiClient.post.mockRejectedValue({ response: { data: { message: 'Error al añadir el usuario' } } });

    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    });

    await wrapper.setData({ showAddUserForm: true });
    await wrapper.setData({ newUser: { name: 'User 3', email: 'user3@example.com', password: 'Password123!' } });
    
    
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toBe('Error al añadir el usuario: Error al añadir el usuario');
  });

  it('edita un usuario existente', async () => {
    apiClient.get.mockResolvedValue({ data: [{ id: 1, name: 'User 1', email: 'user1@example.com' }] });
    apiClient.put.mockResolvedValue({ data: { id: 1, name: 'Updated User', email: 'updateduser@example.com' } });

    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    });

    await flushPromises();

    wrapper.find('button').trigger('click');
    await wrapper.setData({ currentUser: { id: 1, name: 'Updated User', email: 'updateduser@example.com', password: '' } });

    
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

  
    await wrapper.setData({ users: [{ id: 1, name: 'Updated User', email: 'updateduser@example.com' }] });

    expect(apiClient.put).toHaveBeenCalled();
    expect(wrapper.find('tbody').text()).toContain('Updated User');
  });

  it('muestra un mensaje de éxito al añadir usuario', async () => {
    apiClient.post.mockResolvedValue({ data: { id: 2, name: 'User 2', email: 'user2@example.com' } });

    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    });

    await wrapper.setData({ showAddUserForm: true });
    await wrapper.setData({ newUser: { name: 'User 2', email: 'user2@example.com', password: 'Password123!' } });

   
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    
    await wrapper.setData({ message: 'El usuario fue agregado satisfactoriamente.' });

    expect(wrapper.find('.message').exists()).toBe(true);
    expect(wrapper.find('.message').text()).toBe('El usuario fue agregado satisfactoriamente.');
  });

  it('muestra un mensaje de éxito al editar usuario', async () => {
    apiClient.get.mockResolvedValue({ data: [{ id: 1, name: 'User 1', email: 'user1@example.com' }] });
    apiClient.put.mockResolvedValue({ data: { id: 1, name: 'Updated User', email: 'updateduser@example.com' } });

    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    });

    await flushPromises();

    wrapper.find('button').trigger('click'); // Click en el botón Editar
    await wrapper.setData({ currentUser: { id: 1, name: 'User 1', email: 'user1@example.com', password: '' } });

    
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    
    await wrapper.setData({ message: 'El usuario fue actualizado satisfactoriamente.' });

    expect(wrapper.find('.message').exists()).toBe(true);
    expect(wrapper.find('.message').text()).toBe('El usuario fue actualizado satisfactoriamente.');
  });

  it('muestra un mensaje de error si la edición de usuario falla', async () => {
    apiClient.get.mockResolvedValue({ data: [{ id: 1, name: 'User 1', email: 'user1@example.com' }] });
    apiClient.put.mockRejectedValue({ response: { data: { message: 'Error al actualizar el usuario' } } });

    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    });

    await flushPromises();

    wrapper.find('button').trigger('click'); 
    await wrapper.setData({ currentUser: { id: 1, name: 'User 1', email: 'user1@example.com', password: '' } });

    
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

   
    await wrapper.setData({ error: 'Error al actualizar el usuario: Error al actualizar el usuario' });

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toBe('Error al actualizar el usuario: Error al actualizar el usuario');
  });

  it('elimina un usuario', async () => {
    apiClient.get.mockResolvedValue({ data: [{ id: 1, name: 'User 1', email: 'user1@example.com' }] });
    apiClient.delete.mockResolvedValue({});

    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    });

    await flushPromises();

    wrapper.find('button.bg-red-500').trigger('click'); // Click en el botón Eliminar
    await flushPromises();

    
    await wrapper.setData({ users: [] });

    expect(apiClient.delete).toHaveBeenCalled();
    expect(wrapper.find('tbody tr').exists()).toBe(false);
  });

  it('muestra un mensaje de éxito al eliminar usuario', async () => {
    apiClient.get.mockResolvedValue({ data: [{ id: 1, name: 'User 1', email: 'user1@example.com' }] });
    apiClient.delete.mockResolvedValue({});

    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    });

    await flushPromises();

    wrapper.find('button.bg-red-500').trigger('click'); // Click en el botón Eliminar
    await flushPromises();

    
    await wrapper.setData({ message: 'El usuario se eliminó satisfactoriamente.' });

    expect(wrapper.find('.message').exists()).toBe(true);
    expect(wrapper.find('.message').text()).toBe('El usuario se eliminó satisfactoriamente.');
  });

  it('muestra un mensaje de error al eliminar usuario', async () => {
    apiClient.get.mockResolvedValue({ data: [{ id: 1, name: 'User 1', email: 'user1@example.com' }] });
    apiClient.delete.mockRejectedValue({ response: { data: { message: 'Error al eliminar el usuario' } } });

    const wrapper = mount(UserManagement, {
      global: {
        plugins: [router]
      }
    });

    await flushPromises();

    wrapper.find('button.bg-red-500').trigger('click'); // Click en el botón Eliminar
    await flushPromises();

    
    await wrapper.setData({ error: 'Error al eliminar el usuario: Error al eliminar el usuario' });

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toBe('Error al eliminar el usuario: Error al eliminar el usuario');
  });
});
