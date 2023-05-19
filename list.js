// Submit button
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submitValue);

// Clear list button
const clearListButton = document.getElementById('clear-list-button');
clearListButton.addEventListener('click', clearList);

// Target the wrapper to display the list
const task = document.getElementById('task');

// Add Listener to input box
const toDoListInput = document.getElementById('toDoListInput');
toDoListInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    submitValue();
  }
});

// Load the saved items from localStorage OR initialize an empty array
// (these are just string values)
let toDoListValues = JSON.parse(localStorage.getItem('toDoListValues')) || [];

// Render to list to the page initially (on load)
displayList();

function submitValue() {
  // Do not allow empty input
  if (toDoListInput.value.trim() === '') return;

  // Add input value to array (but just the string value)
  toDoListValues.push(toDoListInput.value);

  // Clear input box
  toDoListInput.value = '';

  // Re-render list
  displayList();

  // Save new full array (of string values) to localStorage
  localStorage.setItem('toDoListValues', JSON.stringify(toDoListValues));
}

function displayList() {
  // Clear list
  task.innerHTML = '';

  // Then loop through each item in the array and add it to the list
  toDoListValues.forEach(function (toDoValue, index) {
    // Create a new paragraph element and set the text to the value of the array item
    let newPara = document.createElement('p');
    newPara.textContent = toDoValue;
    task.appendChild(newPara);

    // Create a new button element and set the text to 'Remove' inside the paragraph
    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    newPara.appendChild(removeButton);

    // Whenever the button is clicked, remove the item from the array and re-render the list
    removeButton.addEventListener('click', function () {
      toDoListValues.splice(index, 1);
      displayList();
    });
  });
}

// Unset the array and clear the list on the page
function clearList() {
  toDoListValues = [];
  task.innerHTML = '';
}
