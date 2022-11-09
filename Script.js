const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
/* the 30 images */ 
let imagesLoaded = 0;
/* so we know when it's done loading */
let totalImages = 0;
let photosArray = [];


// Unsplash API 

let ImageCount = 30;
const ApiKey = 'nZb9F2cP_bi-urpAaY60JnzN6IdRrk6Heraf990wBcM';
const ApiURL = `https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=${ImageCount}`;

// check if all images were loaded 
function imageloaded(){
/* increase by 1 for every individual 
picture loaded */
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        
   }};
// Helper function to set attributes on DOM elements 
function setAttributes(element,attributes){
/* code below 
key const is the href,target, src, title 
attributes is going to be an object containing both the key and the value we want to set */
    for(const key in attributes){
        element.setAttribute(key,attributes[key])

}
};

// Create elements for links & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photosarray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
       const item = document.createElement('a');
       setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
       });
      
       
       // create <img> for photo
       const img = document.createElement('img');
       setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title:photo.alt_description
       });
       // event to check if image has been loaded // 
       img.addEventListener('load',imageloaded);




       // put image inside of <a>, then put both inside image container
item.appendChild(img);
imageContainer.appendChild(item);
    

    })

};





// Get photos from Unsplash API

async function getImgs(){
    try{
        const response = await fetch(ApiURL);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        
        console.log('Cannot load')
    // catch error here
    }
};

// check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready) {
        ready = false;
        getImgs();
   
}});




// onload 

getImgs();

