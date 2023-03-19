let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el")
let ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if(leadsFromLocalStorage){  
    myLeads = leadsFromLocalStorage  // even upon refresh set myLeads to local storage to persist rendering on the page
    render(myLeads)
}

tabBtn.addEventListener("click",function(){
    //this is a chrome api that grabs hold of the current tabs url 
    //to make it work i had to set the permissions for it in the manifest.json file
    //pushed the currenttabs address into myLeads array and render it afterward.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })

} )

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
