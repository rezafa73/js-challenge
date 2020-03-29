const titleElement = document.querySelector('#product-title')
const priceElement = document.querySelector('#product-price')
const removeButton = document.querySelector('#remove-button')

const productId = location.hash.substring(1)
let products = getSaveProduct()
let product = products.find(function(item){
    return item.id === productId
})

if(product == undefined){
    location.assign('/index.html')
}

titleElement.value = product.title
priceElement.value = product.price

titleElement.addEventListener('input', function(e){
    product.title = e.target.value
    saveProducts(products)
})

priceElement.addEventListener('input', function(e){
    product.price = e.target.value
    saveProducts(products)
})

removeButton.addEventListener('click', function(e){
removeProducts(product.id)
saveProducts(products)
location.assign('/index.html')
})

window.addEventListener('storage', function(e){
    if(e.key === 'products'){
        products = JSON.parse(e.newValue)
        product = products.find(function(item){
            return item.id === productId
        })
        if(product == undefined){
            location.assign('/index.html')
        }
        
        titleElement.value = product.title
        priceElement.value = product.price
    }
})