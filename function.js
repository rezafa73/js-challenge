
const getSaveProduct = function(){
    const productsJSON = localStorage.getItem('products')
    if(productsJSON !== null){
         return JSON.parse(productsJSON)
    }else{
        return []
    }
}

const saveProducts = function(products) {
    localStorage.setItem('products', JSON.stringify(products))
}

const removeProducts = function(id){
    const productIndex = products.findIndex(function(item){
        return item.id === id
    })
    if(productIndex > -1){
        products.splice(productIndex, 1)
    }
}

const toggleProduct = function(id){
    const product = products.find(function(item){
        return item.id === id
    })
    if (product !== undefined){
        product.exist = !product.exist

    }
}

const renderProducts= function(products, filters){
    let filteredProducts = products.filter(function(item){
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })
    if (filters.showExist){
       filteredProducts = filteredProducts.filter(function(item){
             return item.exist 
       })
    }
    document.querySelector('#products-view').innerHTML = ''
    filteredProducts.forEach(function(item){
        document.querySelector('#products-view').appendChild(creatProductDOM(item))       
    })
 }

 const creatProductDOM = function(product){
   const productEl = document.createElement('div')
   const checkbox = document.createElement('input')
   const productItem = document.createElement('a')
   const removeButton = document.createElement('button')

   checkbox.setAttribute('type', 'checkbox')
   checkbox.checked = !product.exist
   productEl.appendChild(checkbox)
   checkbox.addEventListener('change', function(){  
    toggleProduct(product.id)
    saveProducts(products)
    renderProducts(products, filters)
   })
      
   productItem.textContent= product.title
   productItem.setAttribute('href', `./edit-product.html#${product.id}`)
   productEl.appendChild(productItem)

   removeButton.textContent= 'remove'
   productEl.appendChild(removeButton)
   removeButton.addEventListener('click', function(){
        removeProducts(product.id)
        saveProducts(products)
        renderProducts(products, filters)
    })

   return productEl

 }

 const lastEditMessage = function(timestamp){
    return `Last Edit: ${moment(timestamp).locale('fa').fromNow()}`
 }