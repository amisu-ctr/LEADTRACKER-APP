let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el")
let ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage){   // even upon refresh set myLeads to local storage to persist rendering on the page
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//listen for dbclicks on the delete button
//when clicked , clear localStorage, myLeads and call render() with the emptied myLeads array as its argument
deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads)

})

inputBtn.addEventListener('click', function() {
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads) {
    let listItems = ''
for (let i = 0; i < leads.length; i++){
    listItems += `
    <li>
      <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
      <\a>
    </li>
    `
}
ulEl.innerHTML = listItems
}
