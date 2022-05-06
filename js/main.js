
let addBtn = document.getElementById('addBtn');
let severity = document.getElementById('severity');
let issueSubject = document.getElementById('subject');
let ticketForm = document.getElementById('ticketForm');
let assignedTo = document.getElementById('assignedTo');
let issueDescription = document.getElementById('description');
let allIssuesContainer = document.querySelector('.issues-container');

function getTicketListFromLocalStorage(){
    let stringifiedTicketList = localStorage.getItem("ticketList");
    let parsedTicketList = JSON.parse(stringifiedTicketList);
    if (parsedTicketList === null) {
      return [];
    } else {
      return parsedTicketList;
    }
}

let issues = getTicketListFromLocalStorage();

function deleteTicket(){
  //deleting localstorage
    let getTicket = document.querySelector(`[data-id='${this.dataset.id}']`);
    allIssuesContainer.removeChild(getTicket);

    const issueId = this.dataset.id;
    //element index by findIndex method to delete particular elelment
    let deleteElementIndex = issues.findIndex(function(issue) {
        if (issueId === issue.uniqueid) {
          return true;
        } else {
          return false;
        }
      });
    issues.splice(deleteElementIndex, 1);//deleting by splice method
    localStorage.setItem("ticketList", JSON.stringify(issues));
}
function showDescription(){
  //showing detials in modal
    let myModal = document.querySelector('.modal-body');
    myModal.innerHTML = '';
    var ticketDetails = document.createElement('ul');
    issues.forEach(issue=>{
        if(issue.uniqueid===this.dataset.id){
            let subject = document.createElement('li');
            subject.textContent =`Subject: ${issue.subject}`;

            let severity = document.createElement('li');
            severity.textContent =`Severity: ${issue.issueSeverity}`;

            let assignedFor = document.createElement('li');
            assignedFor.textContent =`Assigned To: ${issue.assignedPerson}`;

            let description = document.createElement('li');
            description.textContent =`Description: ${issue.description}`;


            ticketDetails.appendChild(subject);
            ticketDetails.appendChild(severity);
            ticketDetails.appendChild(assignedFor);
            ticketDetails.appendChild(description);
            myModal.appendChild(ticketDetails);
        }
    })
}
function createAndAppendIssue(issue){
    //creating elements using this function
    let idContainer = document.createElement('div');
    let idElement = document.createElement('p');
    idElement.textContent = `Issue Id: ${issue.uniqueid}`;
    idContainer.appendChild(idElement);


    let issueContainer = document.createElement('div');
    issueContainer.classList.add('d-flex','flex-column','mb-3','bg-warning','p-2','text-black','rounded','fw-medium');
    issueContainer.dataset.id = issue.uniqueid;

    let issueInformationContainer = document.createElement('div');
    issueInformationContainer.classList.add('d-flex','justify-content-between','align-items-center')

    let subjectHead = document.createElement('p');
    subjectHead.textContent = `Subject: ${issue.subject}`

    let issueSeverity = document.createElement("p");
    issueSeverity.textContent = `Severity: ${issue.issueSeverity}`

    let showIcon = document.createElement('i');
    showIcon.classList.add('bi','bi-eye-fill');
    showIcon.title = "Show the Details";
    showIcon.dataset.bsToggle = "modal";
    showIcon.dataset.bsTarget = "#myModal";
    showIcon.dataset.id = issue.uniqueid;

    showIcon.addEventListener('click',showDescription);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('bi','bi-trash');
    deleteIcon.title = "Delete ticket";
    deleteIcon.dataset.id = issue.uniqueid;

    deleteIcon.addEventListener('click',deleteTicket)

    issueInformationContainer.appendChild(subjectHead);
    issueInformationContainer.appendChild(issueSeverity);
    issueInformationContainer.appendChild(showIcon);
    issueInformationContainer.appendChild(deleteIcon);

    issueContainer.appendChild(idContainer);
    issueContainer.appendChild(issueInformationContainer);
    allIssuesContainer.appendChild(issueContainer);
}
function displayIssue(e){
    if(issueSubject.value!=="" && assignedTo.value!=="" && description!==""){
        e.preventDefault();
        let uniqueid = chance.guid();
        let issue = {
            uniqueid:uniqueid,
            subject:issueSubject.value,
            issueSeverity:severity.value,
            assignedPerson:assignedTo.value,
            description:issueDescription.value
        }
        issues.push(issue);
        createAndAppendIssue(issue);
        localStorage.setItem("ticketList", JSON.stringify(issues));
    }
}


ticketForm.addEventListener('submit',displayIssue);

issues.forEach(issue=>createAndAppendIssue(issue));