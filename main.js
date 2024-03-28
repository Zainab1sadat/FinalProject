let List = [];
let listStorage = localStorage.getItem("list");

// Button Add function
document.querySelector('button').onclick = function(e){
    e.preventDefault();
    add();
}

function add(){
    console.log("Running add function");
    let TextInput = document.querySelector("#textInput").value.trim();
    let DropInput = document.querySelector("#dropdown").value;

    if (isValidated()) {
        let listItemDiv = document.createElement("div");
        let emoji = document.createElement("span");
        let listItemElement = document.createElement("li");
        let listItemDropdownElement = document.createElement("span");
    
        emoji.textContent ="➡";
        listItemElement.textContent = TextInput;
        listItemDropdownElement.textContent = DropInput;

        listItemDiv.append(emoji,listItemElement,listItemDropdownElement);
        
        document.querySelector("#list-items").appendChild(listItemDiv);
        document.querySelector("#textInput").value = "";
        document.querySelector("#dropdown").value = "";
        emoji.classList.add("mr-2")
        listItemElement.classList.add("inline-block");
        listItemDiv.classList.add("my-2", "border-b-2");

        switch (DropInput) {
            case "fruit":
                listItemDropdownElement.classList.add("rounded-md","bg-orange-400","px-1","ml-2","text-white")
                break;
            case "Vagetables":
                listItemDropdownElement.classList.add("rounded-md","bg-yellow-400","px-1","ml-2","text-white")
                break;
            case "dairy":
                listItemDropdownElement.classList.add("rounded-md","bg-gray-400","px-1","ml-2","text-white")
                break;
            default:
                break;
        }
        
        List.push({TextInput,DropInput});
        localStorage.setItem("list",JSON.stringify(List));

        if (listStorage) {
            console.log(listStorage);
            let listArray = JSON.parse(listStorage);
        
            console.log(listArray);
            List = listArray;
        
            for(let i = 0; i < List.length; i++) {
                let listItem = List[i];
            
                let listItemElement = document.createElement("li");
                let emojiElement = document.createElement("span");
                let listDropElement = document.createElement("span");
        
                let listItemText = listItem.TextInput; 
                let listDropText = listItem.DropInput;
        
                emojiElement.textContent ="➡ ";
                listItemElement.textContent = listItemText;
                listDropElement.textContent = listDropText;
                listItemElement.append(listDropElement);
                listItemElement.classList.add("my-2","border-b-2")
        
                switch (listDropText) {
                    case "fruit":
                        listDropElement.classList.add("rounded-md","bg-orange-400","px-1","ml-2","text-white");
                        break;
                    case "Vagetables": 
                        listDropElement.classList.add("rounded-md","bg-yellow-400","px-1","ml-2","text-white");
                        break;
                    case "dairy":
                        listDropElement.classList.add("rounded-md","bg-gray-400","px-1","ml-2","text-white");
                        break;
                    default:
                        break;
                }
                document.querySelector(".itemsDiv #list-items").appendChild(listItemElement);
            }
        }

    }else{
        console.log("Invalid inputs");
    }

    
}

// Validate function
function isValidated(){
    console.log("Running isValidated function");
    let isValid = false;
    let TextInput = document.querySelector("#textInput").value.trim();
    let DropInput = document.querySelector("#dropdown").value;

    let dropdown = document.querySelector("#dropdown");
    let input = document.querySelector("#textInput");

    if (TextInput != "" && DropInput != "") {
        isValid = true;
    }else if (DropInput == "" && TextInput != "") {
        dropdown.classList.add("border-rose-500" , "rounded-md");
    }else if (TextInput == "" && DropInput != "") {
        input.classList.add("border-rose-500" , "rounded-md");
    }else{
        input.classList.add("border-rose-500" , "rounded-md");
        dropdown.classList.add("border-rose-500" , "rounded-md");
    }
    return isValid;
}