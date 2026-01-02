/**
 * @jest-environment jsdom
 */

// Вместо ES6 импорта:
// import Popover from '../src/js/Popover.js';

// Используйте CommonJS require:
const Popover = require('../src/js/Popover.js').default;

describe('Popover Widget', () => {
  let button;
  let popover;

  beforeEach(() => {
    document.body.innerHTML = `
      <button class="test-button">Click me</button>
    `;
    
    button = document.querySelector('.test-button');
    popover = new Popover(button, {
      title: 'Test Title',
      content: 'Test Content'
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should create popover instance', () => {
    expect(popover).toBeInstanceOf(Popover);
    expect(popover.element).toBe(button);
    expect(popover.title).toBe('Test Title');
    expect(popover.content).toBe('Test Content');
  });

  test('should show popover on button click', () => {
    button.click();
    
    expect(popover.isVisible()).toBe(true);
    expect(document.querySelector('.popover-container')).not.toBeNull();
    expect(button.classList.contains('popover-active')).toBe(true);
  });

  test('should hide popover on second click', () => {
    button.click(); // показываем
    button.click(); // скрываем
    
    expect(popover.isVisible()).toBe(false);
    expect(document.querySelector('.popover-container')).toBeNull();
    expect(button.classList.contains('popover-active')).toBe(false);
  });

  test('should hide popover when clicking outside', () => {
    button.click(); // показываем
    
    // Клик вне popover
    document.body.click();
    
    expect(popover.isVisible()).toBe(false);
  });

  test('should create correct popover structure', () => {
    button.click();
    
    const popoverElement = document.querySelector('.popover-container');
    const titleElement = popoverElement.querySelector('.popover-title');
    const contentElement = popoverElement.querySelector('.popover-content');
    const arrowElement = popoverElement.querySelector('.popover-arrow');
    
    expect(popoverElement).not.toBeNull();
    expect(titleElement.textContent).toBe('Test Title');
    expect(contentElement.textContent).toBe('Test Content');
    expect(arrowElement).not.toBeNull();
  });

  test('should position popover correctly', () => {
    // Мокаем getBoundingClientRect
    button.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 200,
      width: 50,
      height: 30
    }));

    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
    Object.defineProperty(window, 'pageXOffset', { value: 0, writable: true });

    button.click();
    
    const popoverElement = document.querySelector('.popover-container');
    
    expect(popoverElement.style.position).toBe('absolute');
    expect(popoverElement.style.transform).toBe('translateX(-50%)');
  });
});