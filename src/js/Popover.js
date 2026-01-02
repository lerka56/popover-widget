export default class Popover {
    constructor(element, options = {}) {
      this.element = element;
      this.title = options.title || '';
      this.content = options.content || '';
      this.popover = null;
      
      this.bindEvents();
    }
  
    bindEvents() {
      this.element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.isVisible()) {
          this.hide();
        } else {
          this.show();
        }
      });
  
      // Закрытие при клике вне popover
      document.addEventListener('click', (e) => {
        if (this.isVisible() && 
            !this.popover.contains(e.target) && 
            !this.element.contains(e.target)) {
          this.hide();
        }
      });
    }
  
    show() {
      if (this.isVisible()) return;
  
      this.createPopover();
      this.positionPopover();
      document.body.appendChild(this.popover);
      
      this.element.classList.add('popover-active');
    }
  
    hide() {
      if (!this.isVisible()) return;
      
      this.popover.remove();
      this.popover = null;
      this.element.classList.remove('popover-active');
    }
  
    isVisible() {
      return this.popover !== null && document.body.contains(this.popover);
    }
  
    createPopover() {
      this.popover = document.createElement('div');
      this.popover.className = 'popover-container';
      
      const arrow = document.createElement('div');
      arrow.className = 'popover-arrow';
      
      const title = document.createElement('h3');
      title.className = 'popover-title';
      title.textContent = this.title;
      
      const content = document.createElement('div');
      content.className = 'popover-content';
      content.textContent = this.content;
      
      this.popover.appendChild(arrow);
      this.popover.appendChild(title);
      this.popover.appendChild(content);
    }
  
    positionPopover() {
      if (!this.popover) return;
  
      const rect = this.element.getBoundingClientRect();
      const popoverHeight = this.popover.offsetHeight;
      
      // Позиционируем сверху элемента
      const top = window.pageYOffset + rect.top - popoverHeight - 10;
      const left = window.pageXOffset + rect.left + (rect.width / 2);
      
      this.popover.style.position = 'absolute';
      this.popover.style.top = `${top}px`;
      this.popover.style.left = `${left}px`;
      
      // Центрируем по горизонтали
      this.popover.style.transform = 'translateX(-50%)';
    }
  }