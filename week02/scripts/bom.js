const input = document.querySelector('#favchap');
const button = document.querySelector('#add-btn');
const list = document.querySelector('#list');

function updateButtonState() {
  if (list.children.length >= 10) {
    button.disabled = true;
    button.style.backgroundColor = '#cccccc';
    button.style.color = '#888888';
    button.style.cursor = 'not-allowed';
  } else {
    button.disabled = false;
    button.style.backgroundColor = '#e0e0e0';
    button.style.color = '#333333';
    button.style.cursor = 'pointer';
  }
}

button.addEventListener('click', () => {
  if (input.value.trim() === '') {
    input.focus();
    return;
  }

  const li = document.createElement('li');
  const deleteButton = document.createElement('button');

  li.textContent = input.value;
  deleteButton.textContent = '❌';
  deleteButton.setAttribute('aria-label', `Delete ${input.value}`);

  deleteButton.addEventListener('click', () => {
    list.removeChild(li);
    input.focus();
    updateButtonState();
  });

  li.appendChild(deleteButton);
  list.appendChild(li);

  input.value = '';
  input.focus();
  updateButtonState();
});

