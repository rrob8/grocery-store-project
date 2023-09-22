addEventListener('DOMContentLoaded', () => console.log('this is working'))

const body = document.querySelector('body')

const title = document.createElement('h1')
body.append(title)
title.textContent = 'Robert\'s Grocery Store'
title.id = 'title'

const heading = document.createElement('h1')
body.append(heading)
heading.textContent = 'Click an item to add it to your shopping cart'
heading.id = 'heading'

const foodDiv = document.createElement('div')
body.append(foodDiv)

const foodList = document.createElement('ul')
foodDiv.append(foodList)

const shoppingCart = document.createElement('ul')
const cartTitle = document.getElementById('cart-title')
cartTitle.append(shoppingCart)

const clear = document.createElement('button')
clear.className = 'clear'
clear.textContent = "clear"
cartTitle.append(clear)

clear.addEventListener('click', ()=> clearBasket())

const total = document.createElement('p')
cartTitle.append(total)
let numericTotal = 0
total.textContent = `Your total is $${numericTotal}`

const currentProduct = document.createElement('img')
currentProduct.className = 'image'
currentProduct.src = "https://cdn.apartmenttherapy.info/image/upload/v1561242428/stock/shutterstock_373602469.jpg"
body.append(currentProduct)


// first fetch request of the page

fetch('http://localhost:3000/groceries/')
.then(response=> response.json())
.then(data=> displayGroceries(data))


function clearBasket () {
    numericTotal = 0
    total.textContent = `Your total is $${numericTotal}`

    shoppingCart.textContent = ''
}

function displayGroceries(data) {
    data.forEach(foodItem => {
        
        const foodBtn = document.createElement('button')
        foodList.append(foodBtn)
       foodBtn.id = foodItem.product
       foodBtn.textContent = `${foodItem.product}, $${foodItem.price}  `
       foodBtn.className = 'button'
       foodBtn.dataset.img = foodItem.image

       foodBtn.addEventListener('mouseover', (event)=> displayItem(event))

        foodBtn.addEventListener('click', (event) => addItem(event))
})
}

function displayItem (event) {
    const productImage = event.target.dataset.img
    currentProduct.src = productImage
}   



function addItem(event) {
    const foodName = event.target.textContent
    
    const price = foodName.match(/\d+/)[0]
    console.log( price)
    numericTotal = numericTotal + parseInt(price, 10)
    total.textContent = `Your total is $${numericTotal}`

    const cartItem = document.createElement('li')
    cartItem.textContent = foodName
    shoppingCart.append(cartItem)

    
}

const requestForm = document.getElementById('request-item')
console.log(requestForm)
requestForm.addEventListener('submit',(event) =>{
    
     requestItem(event)

})

function requestItem (event) {
    event.preventDefault()
    
    const newItem = requestForm.name.value 
    const newItemImage = requestForm.image.value
    if (newItem === '') {
        alert("Product name cannot be blank!")
    }
    if (newItemImage === '') {
        alert("Product picture cannot be blank!")
    }
    if (newItem !== '' && newItemImage !== '') {
    const foodObj = {
        product:newItem,
        price: Math.ceil(Math.random()*10),
        image: newItemImage
    }
    
    console.log(foodObj)

    fetch('http://localhost:3000/groceries', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(foodObj)
    })
    .then(response => response.json())
    .then(food => displayGroceries([food])) 

    requestForm.name.value = ''
    requestForm.image.value = ''
} // end of if statement 
}