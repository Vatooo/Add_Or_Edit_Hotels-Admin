
const postsLists = document.querySelector('.post-list');

const addPostForm = document.querySelector('.add-post-form')
console.log(postsLists)

const nameValue = document.getElementById('name-value');
const cityValue = document.getElementById('city-value');
const regionValue = document.getElementById('region-value');
const priceValue = document.getElementById('price-value');
const personsValue = document.getElementById('persons-value');
const addressValue = document.getElementById('address-value');
const roomValue = document.getElementById('room-value');
const ratingValue = document.getElementById('rating-value');


const descriptionValue = document.getElementById('description-value');

const imageUrlValue = document.getElementById('imageUrl-value');

const btnSubmit = document.querySelector('.btn')

let output = '';
const renderPosts = (hotels) => {
    hotels.forEach(hotel => {
        output += `
        <div class="card col-md-5 bg-light mt-4" >
        <div class="card-body data-id=${hotel.id}">
        <div class="header-styles">
            <h5 style="color:red" >Name:  </h5>
            <h5 class="card-name" style="margin-left:51px"> ${hotel.name}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >ID:  </h5>
            <h5 class="card-id" style="margin-left:91px"> ${hotel.id}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >Date:  </h5>
            <h5 class="card-date" style="margin-left:61px"> ${new Date()}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >City:  </h5>
            <h5 class="card-city" style="margin-left:67px" > ${hotel.city}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >Region:  </h5>
            <h5 class="card-region" style="margin-left:41px" > ${hotel.region}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >Price:  </h5>
            <h5 class="card-price" style="margin-left:61px" > ${hotel.price}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >Persons:  </h5>
            <h5 class="card-persons" style="margin-left:41px" > ${hotel.persons}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >Address:  </h5>
            <h5 class="card-address" style="margin-left:31px" > ${hotel.address}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >Room:  </h5>
            <h5 class="card-room" style="margin-left:51px" > ${hotel.room}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >Rating:  </h5>
            <h5 class="card-rating" style="margin-left:47px" > ${hotel.rating}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >Description:  </h5>
            <h5 class="card-description" style="margin-left:11px"> ${hotel.description}</h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >Image:  </h5>
            <h5 class="card-image" style="margin-left:11px"><img class="image-style" src="${hotel.url1}"></h5>
        </div>
        <div class="header-styles">
            <h5 style="color:red" >Image2:  </h5>
            <h5 class="card-image" style="margin-left:11px"><img class="image-style" src="${hotel.url2}"></h5>
        </div>

<br>
            <a href="#" class="card-link-edit" id="${hotel.id}">Edit</a>
            <a href="#" class="card-link-delete" id="${hotel.id}">Delete</a>
   

        </div>
      </div>
        `
    });
    postsLists.innerHTML = output;
}

const url = 'http://localhost:3000/hotels';

const header = document.getElementById('add-hotel')

// Get - Read the posts
// Method: Get

let imageUrl2;
let file = document.querySelector('#imageFile')
let imaagee = document.createElement("img")
file.addEventListener('change', function (){

  // selectedFile = file.files[0]
  // imageUrl = URL.createObjectURL(selectedFile)
  // imaagee.src =`${imageUrl}`
  // document.body.append(imaagee)

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    console.log(reader.result);
    imageUrl2 = reader.result;
    console.log(imageUrl2)
  })

  reader.readAsDataURL(this.files[0])


  
})

fetch(url)
    .then(res => res.json())
    .then(data => {
        renderPosts(data)
    })

    postsLists.addEventListener('click', (e) => {
    // console.log(e.target.id);
    e.preventDefault();

    let delButtonIsPressed = e.target.className == 'card-link-delete'; 
    let editButtonIsPressed = e.target.className == 'card-link-edit'; 

    // Delete Existing Post
    // Method Delete
    if(delButtonIsPressed) {
        console.log("Delete Button Pressed")
        console.log(e.target.id)

        fetch(`${url}/${e.target.id}`, {
            method: 'DELETE',
        })
    }
    let editId;
    if(editButtonIsPressed) {
        console.log("Edit Button Pressed")
        console.log(e.target.id)

        editId = e.target.id;

        //Get Html Values
        const parent = e.target.parentElement;
        let nameContent = parent.querySelector('.card-name').textContent;
        let idContent = parent.querySelector('.card-id').textContent;
        let cityContent = parent.querySelector('.card-city').textContent;
        let regionContent = parent.querySelector('.card-region').textContent;
        let priceContent = parent.querySelector('.card-price').textContent;
        let personsContent = parent.querySelector('.card-persons').textContent;
        let addressContent = parent.querySelector('.card-address').textContent;
        let roomContent = parent.querySelector('.card-room').textContent;
        let ratingContent = parent.querySelector('.card-rating').textContent;
        let descriptionContent = parent.querySelector('.card-description').textContent;
        let imageUrlContent = parent.querySelector('.card-image').textContent

//fetch image URL


let datatest;
async function imageUrlFetch() {
    
    let response = await fetch(`${url}/${editId}`)
    let data = await response.json()
    datatest = data.url;
    imageUrlValue.value = datatest;
}
imageUrlFetch();


        //Give Html Values
        nameValue.value =  nameContent;
        cityValue.value =   cityContent;
        regionValue.value =  regionContent;
        priceValue.value =  priceContent;
        personsValue.value =  personsContent;
        addressValue.value =   addressContent;
        roomValue.value =  roomContent;
        ratingValue.value =  ratingContent;
        descriptionValue.value = descriptionContent;
        btnSubmit.innerHTML = `Edit Hotel`
        header.innerHTML = `Edit Hotel ID: ${editId}`
    }


    // Update the existing post
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        console.log("Clicked")
        fetch(`${url}/${editId}`, {
            method: 'PATCH',
            headers: {
                "Content-type" : "application/json"
            }, 
            body: JSON.stringify({
                name: nameValue.value,
                city: cityValue.value,
                region: regionValue.value,
                price: priceValue.value,
                persons: personsValue.value,
                address: addressValue.value,
                room: roomValue.value,
                rating: ratingValue.value,
                description: descriptionValue.value,
                date: new Date(),
                url1: imageUrlValue.value
            })
        })
        .then(response => response.json())
        .then(() => location.reload())
    })

})
    // Create new Post
    // Method: POST
    addPostForm.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch(url, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameValue.value,
                city: cityValue.value,
                region: regionValue.value,
                price: priceValue.value,
                persons: personsValue.value,
                address: addressValue.value,
                room: roomValue.value,
                rating: ratingValue.value,
                date: new Date(),
                description: descriptionValue.value,
                url1: imageUrlValue.value,
                url2: imageUrl2
            })
        })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })
    })