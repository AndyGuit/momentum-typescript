import { OPTIONS, saveOptions } from '../_options';
import { translations } from '../_translations';

const toggleListBtn = document.querySelector('.todo-list__icon') as HTMLElement;
const todoBlock = document.querySelector('.todo-list__block') as HTMLElement;
const todoBlockHeader = document.querySelector(
  '.todo-list__block p'
) as HTMLElement;
const input = document.querySelector(
  '.todo-list__input input'
) as HTMLInputElement;
const addTodoBtn = document.querySelector(
  '.todo-list__input button'
) as HTMLButtonElement;
const todoList = document.querySelector('.todo-list__list') as HTMLElement;
const todoAppName = document.querySelector(
  '.todo-list__icon span'
) as HTMLElement;

const renderListItem = (item: string, id: number) => {
  const li = `
  <li>${item}
   <span class="todo-list__item" data-todo-id="${id}">
      <i class="fas fa-trash"></i>
    </span>
  </li>`;
  todoList.innerHTML += li;
};

const renderList = () => {
  const listArr = OPTIONS.todoList;
  todoList.innerHTML = '';
  if (listArr.length) {
    listArr.forEach((item, index) => {
      renderListItem(item, index);
    });
  }
};

const toggleList = () => {
  todoBlock.classList.toggle('active');
  toggleListBtn.classList.toggle('active');
};

const toggleAddButton = (e: KeyboardEvent) => {
  const target = e.target as HTMLInputElement;
  const todoName = target.value.trim();
  if (todoName) {
    addTodoBtn.classList.add('active');
  } else {
    addTodoBtn.classList.remove('active');
  }
  if (e.key === 'Enter') {
    addItemToList();
    addTodoBtn.classList.remove('active');
  }
};

const addItemToList = () => {
  const todoName = input.value;
  OPTIONS.todoList.push(todoName);
  saveOptions();
  renderListItem(todoName, OPTIONS.todoList.length - 1);

  input.value = '';
  addTodoBtn.classList.remove('active');
};

const deleteTodoItem = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target) {
    const isClickedOnDel = target.classList.contains('fa-trash');
    if (isClickedOnDel) {
      const todoId = target!.parentElement!.dataset.todoId;
      if (todoId) {
        OPTIONS.todoList.splice(+todoId, 1);
        saveOptions();
        renderList();
      }
    }
  }
};

const closeTodoBlock = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.todo-list')) {
    todoBlock.classList.remove('active');
    toggleListBtn.classList.remove('active');
  }
};

const translateTodo = () => {
  todoAppName.textContent = translations.todo.icon[OPTIONS.lang];
  todoBlockHeader.textContent = translations.todo.header[OPTIONS.lang];
  input.placeholder = translations.todo.placeholder[OPTIONS.lang];
};

toggleListBtn.addEventListener('click', toggleList);
input.addEventListener('keyup', toggleAddButton);
todoList.addEventListener('click', deleteTodoItem);
addTodoBtn.addEventListener('click', addItemToList);
document.body.addEventListener('click', closeTodoBlock);

export const ToDo = () => {
  translateTodo();
  renderList();
};
