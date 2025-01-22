function createShortURL() {
    const input = document.getElementById("input-url");
    let paragraphElement = document.createElement("p");
    document.body.appendChild(paragraphElement);

    document.getElementById("button-create").addEventListener("click", function () {
        const url = input.value;

        if (isValidURL(url)) {
            input.style.borderColor = '';
            const list = document.getElementById("list-url");
            let listItem = document.createElement("li");

            let randomShortURL = createRandomShortURL();
            let link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.innerText = randomShortURL;

            let counter = 0;
            let counterSpan = document.createElement("span");
            counterSpan.innerText = ` Clicks: ${counter}`;

            link.addEventListener("click", function () {
                counter++;
                counterSpan.innerText = ` Clicks: ${counter}`;
            });

            listItem.appendChild(link);
            listItem.appendChild(document.createTextNode(` ${url} `));
            listItem.appendChild(counterSpan);

            const editButton = document.createElement("button");
            editButton.innerText = "Edit";

            editButton.addEventListener("click", function () {
                if (editButton.innerText === "Edit") {
                    // Switch to Save
                    editButton.innerText = "Save";

                    let inputField = document.createElement("input");
                    inputField.value = randomShortURL.split("/")[1];
                    listItem.replaceChild(inputField, link);
                } else {
                    randomShortURL = "localhost/".concat(listItem.querySelector("input").value);
                    let newLink = document.createElement("a");
                    newLink.href = url;
                    newLink.target = "_blank";
                    newLink.innerText = randomShortURL;

                    newLink.addEventListener("click", function () {
                        counter++;
                        counterSpan.innerText = ` Clicks: ${counter}`;
                    });

                    listItem.replaceChild(newLink, listItem.querySelector("input"));
                    editButton.innerText = "Edit";
                }
            });

            listItem.appendChild(editButton);
            list.appendChild(listItem);

            paragraphElement.innerText = "";
        } else {
            input.style.border = "3px solid";
            input.style.borderColor = "red";
        }
    });
}

function isValidURL(url) {
    const patternForURLValidity = /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;

    return patternForURLValidity.test(url);
}

function createRandomShortURL() {
    return "localhost/" + createRandomString(5);
}


function createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function deleteURL() {
    const deleteButton = document.getElementById("button-delete");
    const listURL = document.getElementById("list-url");
    deleteButton.addEventListener("click", function () {
        console.log("button");
        console.log(listURL);
        const input = document.getElementById("input-url");
        const listOfLinks = listURL.querySelectorAll("li");
        listOfLinks.forEach((listItem) => {
            const link = listItem.querySelector("a");
            console.log(link.href);
           if (link && link.href === input.value || link.innerText === input.value) {
               listItem.remove();
            } else if (input.value === ""){
               listItem.remove();
           }
        })
    })
}


createShortURL();
deleteURL();