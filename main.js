window.onload = () => {
  fetchBugList()

}
document.getElementById('bug-input-form').addEventListener('submit', submitBug);

function submitBug(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('bug-description');
  const severity = getInputValue('bug-severity');
  const assignedTo = getInputValue('bug-assigned-to');
  let id = Math.floor(Math.random() * 100000000); //Math.floor(Math.random() * 4) 
  const status = 'Open';

  const bug = { id, description, severity, assignedTo, status };
  let bugList = [];
  if (localStorage.getItem('bugList')) {
    bugList = JSON.parse(localStorage.getItem('bugList'));
  }

  // though we're creating id with Math.random(), chances are it may end up creating duplicate id,
  // so if we found any duplicate id then it will then re-assign a new id 

  const duplicateId = bugList.find(bug => bug.id === id);
  if (duplicateId) {
    id = Math.floor(Math.random() * 100000000);
  }
  bugList.push(bug);
  localStorage.setItem('bugList', JSON.stringify(bugList));


  document.getElementById('bug-input-form').reset();
  fetchBugList();
  e.preventDefault();
}

const closeBug = id => {
  const bugList = JSON.parse(localStorage.getItem('bugList'));
  const currentBug = bugList.find(bug => bug.id === id);
  currentBug.status = 'Closed';
  localStorage.setItem('bugList', JSON.stringify(bugList));
  fetchBugList();
}

const deleteBug = id => {
  const bugList = JSON.parse(localStorage.getItem('bugList'));
  const remainingBugs = bugList.filter(bug => bug.id !== id)
  localStorage.setItem('bugList', JSON.stringify(remainingBugs));
  fetchBugList();
}

const fetchBugList = () => {
  const bugList = JSON.parse(localStorage.getItem('bugList'));
  const bugContainer = document.getElementById('bug-container');
  bugContainer.innerHTML = '';
  if (!bugList) {
    return;
  }
  for (bug of bugList) {
    const { id, description, severity, assignedTo, status } = bug;

    bugContainer.innerHTML += `<div class="well">
                              <h6>Bug ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeBug(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteBug(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
