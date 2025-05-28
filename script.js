
/////////////// Document elements ///////////////

/* Gallery title and input */
let GalleryTitle = document.getElementById("gallery_title");
let titleTxt = GalleryTitle.innerHTML;

let titleInput = document.getElementById("title_input");
titleInput.value = titleTxt;

const images_input = document.querySelector("#images_input");
const submitButton = document.getElementById("confirm_changes")
const removeAllButton = document.getElementById("delete_all");

/* Gallery containers */
let galleryContainer = document.getElementById("gallery_container");

let galleryChildren = galleryContainer.childNodes;

let galleryBuilder = document.getElementById("gallery_builder");
galleryBuilder.class = "galleryBuilder";

/* Image arrays */
let imageUrls = [
    "./assets/washington.jpeg",
    "./assets/polaroid_camera.jpeg",
    "./assets/cat_fridge_painting.jpeg",
    "./assets/nice_room.jpeg",
    "./assets/flower_glass.jpeg",
    "./assets/bookstore.jpeg"
];

let newImgs = [];

let imgNames = [];

let imgDesc = [];

/* Form elements */

let form = document.getElementById("form");

let editButtons = document.querySelectorAll(".editButton");
let deleteButtons = document.querySelectorAll(".deleteButton");

/* Details */

// temporary text that appears in the galleryContainer that instructs the user
// to click the "Choose Files" button to start uploading their photos
tempTxt = document.createTextNode('Click "Choose Files" below to upload your photos!');
tempTxt.id = tempTxt;

/////////////// Event listeners ///////////////

// Dynamic title changes as user types
titleInput.addEventListener("input", updateTitle);

window.addEventListener("load", setupEventListeners);

// Displays the updated array of images when the
// Submit button is pressed
submitButton.addEventListener("click", applyChanges);

// images appear in the gallery builder as the user uploads them
images_input.addEventListener("change", function(event) {

    const files = event.target.files;

    i = 0

    for (const file of files) {

        const reader = new FileReader();
        reader.onload = (e) => {

        file.src = e.target.result;
        fileName = file.name

        newImgs.push(file.src);

        let imgCard = document.createElement("div");
        imgCard.classList.add("imgCard", "builder");
        // imgCard.dataset.index = newImgs;
        
        let img = document.createElement("img");
        img.src = file.src;
        img.classList.add("img");
        imgCard.appendChild(img);

        cloneGalleryContainer.appendChild(imgCard);

        images_input.value = '';

        addButtons(imgCard);

        };

        reader.readAsDataURL(file);

    };

    let editButtons = document.querySelectorAll(".editButton");
    let deleteButtons = document.querySelectorAll(".deleteButton");

    //console.log(editButtons);
    //console.log(deleteButtons);

});

removeAllButton.addEventListener("click", removeAll);

form.addEventListener('submit', function (event) {

    event.preventDefault();

});


/////////////// Functions ///////////////

// one-time functions
displayImages();
loadGalleryBuilder();


function setupEventListeners() {

    // define cards as all elements under the class 'card'
    let editButtons = document.querySelectorAll('.editButton');
    let deleteButtons = document.querySelectorAll('.deleteButton');

    // for each edit button in editButtons,
    editButtons.forEach(editButton => {

        // do nothing if the edit button already has an event listener
        if (editButton.classList.contains("hasEventListener")) {

        // add an event listener and class to every other edit button
        } else {

            // add an event listener to it that executes editPhoto when clicked
            editButton.addEventListener('click', editPhoto);
            editButton.classList.add('hasEventListener');
        }}
    );
    // for each delete button in deleteButtons,
    deleteButtons.forEach(deleteButton => {

        // do nothing if the delete button already has an event listener
        if (deleteButton.classList.contains("hasEventListener")) {

        // add an event listener and class to every other delete button
        } else {
        
            // add an event listener to it that executes deletePhoto when clicked
            deleteButton.addEventListener('click', deletePhoto);
            deleteButton.classList.add('hasEventListener');
        }}
    );
};


function updateTitle(e) {

    GalleryTitle.textContent = e.target.value;

    console.log("title changed")

};

// Displays images in the gallery and gallery builder at
// the start of the program
function displayImages() {

    imageUrls.forEach((url, index) => {

        let imgCard = document.createElement("div");
        imgCard.className = "imgCard";
        imgCard.dataset.index = index;
    
        let img = document.createElement("img");
        img.src = url;
        img.className = "img";
        img.dataset.index = index;
        imgCard.appendChild(img);
        
        galleryContainer.appendChild(imgCard);
    
        console.log("new image added");
        
    });

};

// Loads the gallery builder at the start of the program
function loadGalleryBuilder() {


    // clone the galleryContainer and add it as a child to the galleryBuilder
    cloneGalleryContainer = galleryContainer.cloneNode(true);
    galleryBuilder.appendChild(cloneGalleryContainer);
    cloneGalleryContainer.id = "cloneGalleryContainer";

    let builderChildren = Array.from(cloneGalleryContainer.childNodes);

    console.log(builderChildren);



    builderChildren.forEach( function (imgCard, index) {

        imgCard.classList.add('builder');

        addButtons(imgCard);

    });

    let editButtons = document.querySelectorAll(".editButton");
    let deleteButtons = document.querySelectorAll(".deleteButton");

    console.log(editButtons);
    console.log(deleteButtons);

};

function addButtons (imgCard) {

    let editButton = document.createElement("button");
    editButton.className = "editButton";
    editButton.textContent = "✏️"

    let deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "X"

    imgCard.appendChild(editButton);
    imgCard.appendChild(deleteButton);

    setupEventListeners();

}

function editPhoto (e) {

    console.log("you want to edit the photo!")

    let target = e.target;
    let parent = target.parentNode;

    console.log(parent);

};

function deletePhoto (e) {

    console.log("you want to delete the photo!")

    let target = e.target;
    let parent = target.parentNode;
    parent.id = "parent";

    let selectedSrc = (document.querySelector("#parent").querySelector(".img"));

    console.log(selectedSrc.src);

    // first check if the src url is already uploaded to the gallery
    let index = imageUrls.indexOf(selectedSrc.src);

    console.log(index);

    parent.classList.add("deleted");
    parent.id = "";

    // parent.remove();

};

// the user changes from the gallery builder are shown in the gallery
function applyChanges () {

    if (newImgs.length > 0) {

        // remove the temporary text if it is present
        try {
        galleryContainer.removeChild(tempTxt);
        } 
        // prepare the photo gallery regardless of an error
        // occuring or not
        catch (error) {

            prepareGallery();

        } finally {

            prepareGallery();

        }

    } else {

        console.log(galleryChildren);
        prepareGallery();

    }; 

};


function prepareGallery () {

    // first, remove all children from the gallery that contain the class "deleted"
    galleryChildren.forEach(
        function(child) {

            if (child.classList.contains("deleted")) {

                child.remove();
            
                console.log("Child removed")
            }

        }

    );

    console.log(galleryChildren)
   
    newImgs.forEach((url, index) => {

        let imgCard = document.createElement("div");
        imgCard.className = "imgCard";
        imgCard.dataset.index = index;
    
        let img = document.createElement("img");
        img.src = url;
        img.className = "img";
        img.dataset.index = index;
        imgCard.appendChild(img);
        
        galleryContainer.appendChild(imgCard);

        imageUrls.push(url);

        // console.log(imageUrls[index]);

        console.log("new image added");

        newImgs = [];

        images_input.value = '';

    });

    // append tempTxt only AFTER the gallery children have been evaluated
    if (imageUrls.length === 0) {

        galleryContainer.innerHTML = "";

        galleryContainer.appendChild(tempTxt);
        tempTxt.className = "text";
    
    }

};



function removeAll() {

    
    let builderChildren = Array.from(cloneGalleryContainer.childNodes);

    let galleryChildren = Array.from(galleryContainer.childNodes);

    galleryChildren.forEach(element => {

        element.classList.add("deleted");
    
    });

    builderChildren.forEach(element => {

        element.remove();

    });

    newImgs = [];
    imageUrls = [];

    images_input.value = '';

    console.log(imageUrls);

    };
