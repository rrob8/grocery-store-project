addEventListener('DOMContentLoaded', () => console.log('this is working'))

const body = document.querySelector('body')

const title = document.createElement('h1')
body.append(title)
title.textContent = 'Robert\'s Grocery Store'
const foodDiv = document.createElement('div')
body.append(foodDiv)

const foodList = document.createElement('ul')
foodDiv.append(foodList)


fetch('http://localhost:3000/groceries/?_limit=5')
.then(response=> response.json())
.then(data=> displayGroceries(data))

function displayGroceries(data) {
    data.forEach(foodItem => {
        console.log(foodItem)
        const foodLi = document.createElement('li')
        foodList.append(foodLi)
       foodLi.id = foodItem.product
       foodLi.textContent = foodItem.product
        
       // button
       const button = document.createElement('button')
       foodLi.append(button)
       button.className = 'button'
       button.textContent = '+'
})
}
