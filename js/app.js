const searchInp = document.querySelector('.header__inp')
const container = document.querySelector('.products')
const pagination = document.querySelector('pagination')

let allProducts = []
let currentPage = 1
const productsPerPage = 7


const getProducts = async() => {
const response = await fetch('https://api.escuelajs.co/api/v1/products')
allProducts =  await response.json()


renderProducts()


searchInp.addEventListener('input', () => {
    currentPage = 1
renderProducts()
renderPagination()

})
}




function renderProducts () {
const query = searchInp.value.toLowerCase()


const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))

const start = (currentPage - 1) * productsPerPage
const end = start + productsPerPage
const paginatedProducts = filteredProducts.slice(start, end)


    container.innerHTML = ''
    
paginatedProducts .forEach(product => (
container.innerHTML += `<div class = "product">
<img src="../picture/List.svg" alt="error:(" class="menu--icon"  > 
 <div class="menu">
 <img src="../picture/ix 7.cvg.svg" alt="error" class="close--icon">
          <div class='menu__list'> 
          <a href="./updateProduct.html?id=${product.id}" class='product__link'>Изменить</a>
        <button class="product__btn-delete" onclick = 'deleteProduct(${product.id})'>Удалить</button></div>
         </div>
<img src ='${product.images[0]}' alt = "Error:(" class="product__img" />
<h2 class ="product__title">${product.title}</h2>
<p class = "product__price">Цена: <span>${ product.price}</span> сом</p>
<button class= 'product__btn'><a href = './card.html'>В корзину</a></button>

</div>`


))

const openicon = document.querySelector('.menu--icon')
    const closeicon = document.querySelector('.close--icon')
    const menu = document.querySelector('.menu')


openicon.addEventListener('click',() =>{
    menu.style.display = 'block'
})
closeicon.addEventListener('click',() =>{
    menu.style.display = 'none'

})

}

getProducts()


function renderPagination(){
const query = searchInp.value.toLowerCase()

const filtredProducts = allProducts.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))

const totalPages = Math.ceil(filtredProducts.length / productsPerPage)
pagination.innerHTML = ''

for( let i = 1; i <= totalPages; i++){
    const btn = document.createElement('button')
    btn.textContent = i 

    if(i === currentPage){
        btn.classList.add('active')
    }

    btn.addEventListener('click', () => {
        currentPage = i
        renderProducts()
        renderPagination()
    })
    pagination. appendChild(btn)
}
}



const createProduct = async () =>{
    const title = document.querySelector('.inp__title')
    const description = document.querySelector('.inp__desc')
    const price = document.querySelector('.inp__price')
    const category = document.querySelector('.inp__category')
    const img = document.querySelector('.inp__img')

      const newProduct = {
        title: title.value,
        description: description.value,
        price: Number(price.value),
        categoryId: Number(category.value),
        images: [img.value]

}
await fetch('https://api.escuelajs.co/api/v1/products',{
    method:'POST' ,
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(newProduct)

})
title.value = ''
description.value =''
price.value = ''
category.value =''
img.value = ''

getProducts()

window.location.href = './index.html'

}


function getProductIdFromUrl(){
    const params = new URLSearchParams(window.location.search)
   return params.get('id')
    
}
async function loadProduct(){
    const productId = getProductIdFromUrl()
  
  let response= await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
  let product = await response.json()
 
  document.querySelector('.inp__title').value = product.title
   document.querySelector('.inp__desc').value = product.description
      document.querySelector('.inp__price').value = product.price
       document.querySelector('.inp__category').value = product.category.id
        document.querySelector('.inp__img').value = product.images[0]
  
}

async function updateProduct(){
const productId = getProductIdFromUrl()

    const title = document.querySelector('.inp__title')
    const description = document.querySelector('.inp__desc')
    const price = document.querySelector('.inp__price')
    const category = document.querySelector('.inp__category')
    const img = document.querySelector('.inp__img')



    const updateProduct = {
    id: productId,
    title: title.value,
    description: description.value,
    price:Number( price.value),
    category: Number( category.value),
    images: [img.value] 

    }
console.log(updateProduct);

    await fetch (`https://api.escuelajs.co/api/v1/products/${productId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'aplication/json'
    },
    body: JSON.stringify(updateProduct)
    })

     alert('Продукт изменен')
    window.location.href = './index.html'
  }

// document.addEventListener('DOMContentLoaded',loadProduct)



    


const deleteProduct = async (id) =>{
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
method:'DELETE'
}
)
getProducts()
}



