import Popover from './Popover.js';
import '../styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-popover]');
  
  buttons.forEach(button => {
    const title = button.getAttribute('data-title') || 'Popover title';
    const content = button.getAttribute('data-content') || 'Popover content';
    
    new Popover(button, {
      title,
      content
    });
  });
});