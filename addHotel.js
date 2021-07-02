

let nameInput = document.querySelector('#name')
let cityInput = document.querySelector('#city')
let regionInput = document.querySelector('#region ')
let priceInput = document.querySelector('#price')
let personsInput = document.querySelector('#persons')
let addressInput = document.querySelector('#address')
let roomInput = document.querySelector('#room')
let ratingInput = document.querySelector('#rating')

let descriptionInput = document.querySelector('#description')

let imageUrl1 = document.querySelector('#image-url')
console.log(imageUrl1)

let file = document.querySelector('#imageFile')




//Upload Image Get base64 Url

let imageUrl2;
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


const button = document.querySelector('#btn')

button.addEventListener('click', (e) => {
  e.preventDefault();
console.log("clicked")
  poost(); 
})

function poost() {

    fetch('http://localhost:3000/hotels', {
    method: 'POST',
    body: JSON.stringify({
      name: `${nameInput.value}`,
      city: `${cityInput.value}`,
      region: `${regionInput.value}`,
      price: `${priceInput.value}`,
      persons: `${personsInput.value}`,
      address: `${addressInput.value}`,
      room: `${roomInput.value}`,
      rating: `${ratingInput.value}`,
      description: `${descriptionInput.value}`,
      url1: `${imageUrl1.value}`,
      url2: `${imageUrl2}`
    }),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})

}

let bioPlacehoder = document.querySelector('.bio-placeholder')

getHotels();



let request;
let data;
async function getHotels() {

  request = await fetch('http://localhost:3000/hotels')
  data = await request.json()

 console.log(data);
  

 let hotelPlace = document.createElement('div')
 hotelPlace.classList.add('hotel-style')

  data.map((obj) => {
    bioPlacehoder.append(hotelPlace);
    hotelPlace.innerHTML += `
      ID : ${obj.id} <br>
      Name : ${obj.name} <br>
      City : ${obj.city} <br>
      Region : ${obj.region} <br>
      Price : ${obj.price} <br>
      Persons : ${obj.persons} <br>
      Address : ${obj.address} <br>
      Room : ${obj.room} <br>
      Rating : ${obj.rating} <br>
      Description : ${obj.description} <br>
      <img class="imageStyle" src="${obj.url1}" > 
      <img class="imageStyle" src="${obj.url2}" > 
      <hr> <br>
    `
  })
}

