let products = getSaveProduct()
const filters = {
    searchItem: '',
    showExist: false
}



document.querySelector('#check-exist').addEventListener('change',function(e){    // chek exit products
    filters.showExist = e.target.checked
    renderProducts(products, filters)
})


             
renderProducts(products, filters)

document.querySelector('#search').addEventListener('input',function(e){
     
    filters.searchItem = e.target.value
     renderProducts(products, filters)
})
document.querySelector('#form-data').addEventListener('submit', function(e){
    e.preventDefault()
    const id = uuidv4()
    const timestamp = moment().valueOf()
        products.push ({
             id: id,
             title: e.target.elements.productTitle.value,
             price:'',
             exist: true,
             created : timestamp,
             updated : timestamp
        })
   saveProducts(products)
      
    renderProducts(products,filters)
    e.target.elements.productTitle.value = ''
})

window.addEventListener('storage', function(e){
    if(e.key === 'products'){
        products = JSON.parse(e.newValue)
        renderProducts(products,filters)
    }
})
 


