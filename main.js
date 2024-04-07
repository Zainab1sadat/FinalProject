let List = [];
// Load items from local storage on page load
window.onload = function() {
    loadItemsFromLocalStorage();
};

// Function to load items from local storage
function loadItemsFromLocalStorage() {
    let listStorage = localStorage.getItem("list");
    if (listStorage) {
        let listArray = JSON.parse(listStorage);
        for (let i = 0; i < listArray.length; i++) {
            let listItem = listArray[i];
            appendItemToList(listItem.TextInput, listItem.DropInput);
        }
    }
}

// Button Add function
document.querySelector('button').onclick = function(e) {
    e.preventDefault();
    add();
}

// Function to add a new item
function add() {
    console.log("Running add function");
    let TextInput = document.querySelector("#textInput").value.trim();
    let DropInput = document.querySelector("#dropdown").value;

    if (isValidated()) {
        appendItemToList(TextInput, DropInput);

        // Add the new item to the list and save to local storage
        List.push({ TextInput, DropInput });
        localStorage.setItem("list", JSON.stringify(List));
    } else {
        console.log("Invalid inputs");
    }
}

// Function to append item to the list
function appendItemToList(TextInput, DropInput) {
    let listItemDiv = document.createElement("div");
    let emoji = document.createElement("span");
    let listItemElement = document.createElement("li");
    let listItemDropdownElement = document.createElement("span");

    emoji.textContent = "➡";
    listItemElement.textContent = TextInput;
    listItemDropdownElement.textContent = DropInput;

    listItemDiv.append(emoji, listItemElement, listItemDropdownElement);

    document.querySelector("#list-items").appendChild(listItemDiv);
    document.querySelector("#textInput").value = "";
    document.querySelector("#dropdown").value = "";
    emoji.classList.add("mr-2")
    listItemElement.classList.add("inline-block");
    listItemDiv.classList.add("my-2", "border-b-2");

    switch (DropInput) {
        case "fruit":
            listItemDropdownElement.classList.add("rounded-md", "bg-orange-400", "px-1", "ml-2", "text-white")
            break;
        case "Vagetables":
            listItemDropdownElement.classList.add("rounded-md", "bg-yellow-400", "px-1", "ml-2", "text-white")
            break;
        case "dairy":
            listItemDropdownElement.classList.add("rounded-md", "bg-gray-400", "px-1", "ml-2", "text-white")
            break;
        default:
            break;
    }
}
// function Delete Items from List
document.querySelector("#list-items").addEventListener("click", function(e){
    if (e.target.tagName === "SPAN") {
        console.log("clicked on emoji");
        let listItem = e.target.parentNode;

        console.log(listItem);
        let children = listItem.parentNode.children;
        console.log(children);
        let childrenArray = Array.from(children);
        let index = childrenArray.indexOf(listItem);
        List.splice(index, 1);
        console.log(List);

        let jsonString = JSON.stringify(List);
        localStorage.setItem("list", jsonString);

        listItem.remove();
    }
});

// Validate function
function isValidated(){
    console.log("Running isValidated function");

    let isValid = false;
    let textInput = document.querySelector("#textInput").value.trim();
    let dropInput = document.querySelector("#dropdown").value.trim();


    let input = document.querySelector("#textInput");
    let dropdown = document.querySelector("#dropdown");

    if (textInput.length <= 0 && dropInput <= 0) {
        input.classList.add("border-rose-500" , "rounded-md");
        dropdown.classList.add("border-rose-500" , "rounded-md");
    }
    else if (textInput.length <= 0) {
        input.classList.add("border-rose-500" , "rounded-md");
        dropdown.classList.remove("border-rose-500" , "rounded-md");
    }
    else if (dropInput.length <= 0) {
        dropdown.classList.add("border-rose-500" , "rounded-md");
    }else{
        input.classList.remove("border-rose-500" , "rounded-md");
        dropdown.classList.remove("border-rose-500" , "rounded-md");
        isValid = true;
    }
    return isValid;
}
