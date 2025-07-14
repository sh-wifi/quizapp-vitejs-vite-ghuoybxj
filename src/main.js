import { mount } from 'svelte';
// @ts-ignore
import App from './App.svelte';
import './app.css';

mount(App, {
  target: document.getElementById('app')
});

