(function() {
    const favoriteCount = $('.fa-heart .header__control-count')
    const favoriteList = $('.favorite')

    const favoriteData = getData('FAVORITE_ITEMS')
    favoriteCount.innerText = favoriteData.length

    function updateData() {
        localStorage.setItem('FAVORITE_ITEMS', JSON.stringify(favoriteData))
        favoriteCount.innerText = favoriteData.length
    }

    function addFavoriteItem(data) {
        const favoriteItem = document.createElement('div')
        favoriteItem.classList.add('header__control-dropdown-item')
        favoriteItem.setAttribute('data-name', data.name)

        favoriteItem.innerHTML = `
            <img src="${data.image_url}" width="70" height="70">
            <div class="header__control-dropdown-text" title="${data.name}">
                <h3 class="line-clamp line-clamp-1">${data.name}</h3>
                <div class="header__control-dropdown-remove">Xoá</div>
            </div>
        `

        const deleteBtn = favoriteItem.querySelector('.header__control-dropdown-remove')
        deleteBtn.addEventListener('click', () => {
            const targetIndex = favoriteData.find(item => item.name === data.name)

            switch(data.category) {
                case 'PRODUCT': {
                    const productElement = $$(`.product[data-name="${data.name}"]`)

                    productElement.forEach(element => {
                        const favoriteIcon = element.querySelector('.fa-heart')
                        favoriteIcon.classList.replace('fa-solid', 'fa-regular')
                    })
                    break
                }
                case 'ALL_PRODUCT': {
                    const productElement = $$(`.page__product[data-name="${data.name}"]`)
                    productElement.forEach(element => element.classList.remove('page__product--favorited'))
                }
            }

            favoriteData.splice(targetIndex, 1)
            favoriteItem.remove()

            updateData()
        })

        favoriteList.appendChild(favoriteItem)
    }

    function updateFavoriteUI(item) {
        switch(item.category) {
            case 'PRODUCT': {
                const productElement = $$(`.product[data-name="${item.name}"]`)

                productElement.forEach(element => {
                    const favoriteIcon = element.querySelector('.fa-heart')
                    favoriteIcon.classList.replace('fa-regular', 'fa-solid')
                })

                break
            }
            case 'ALL_PRODUCT': {
                const productElement = $$(`.page__product[data-name="${item.name}"]`)
                productElement.forEach(element => element.classList.add('page__product--favorited'))
                break
            }
            default:
                console.log(item)
        }
    }

    favoriteData.forEach(item => {
        updateFavoriteUI(item)
        addFavoriteItem(item)
    })

    productElements.forEach(element => {
        const favoriteIcon = element.querySelector('.fa-heart')
        const productImage = element.querySelector('img')

        favoriteIcon.parentElement.addEventListener('click', () => {
            if (favoriteIcon.classList.contains('fa-regular')) {
                const data = {
                    name: element.dataset.name,
                    image_url: productImage.src,
                    category: 'PRODUCT'
                }
                
                favoriteIcon.classList.replace('fa-regular', 'fa-solid')
                // replace là thay đổi class 'fa-regular' thành 'fa-solid' -> tim rỗng thành đậm
                favoriteData.push(data)
                addFavoriteItem(data)
                
            } else {
                const targetIndex = favoriteData.find(
                    data => data.name === element.dataset.name
                    && data.category === 'PRODUCT'
                )

                favoriteList.querySelector(`[data-name="${element.dataset.name}"]`).remove()
                favoriteIcon.classList.replace('fa-solid', 'fa-regular')
                favoriteData.splice(targetIndex, 1)
            }

            updateData()
        })
    })

    allProduct.forEach(item => {
        const favoriteIcon = item.querySelector('.fa-heart')
        const productImage = item.querySelector('img')
        
        favoriteIcon.parentElement.addEventListener('click', () => {
            if (!item.classList.contains('page__product--favorited')) {
                const data = {
                    name: item.dataset.name,
                    image_url: productImage.src,
                    category: 'ALL_PRODUCT'
                }

                item.classList.add('page__product--favorited')
                favoriteData.push(data)
                addFavoriteItem(data)
            } else {
                const targetIndex = favoriteData.find(
                    data => data.name === item.dataset.name
                    && data.category === 'ALL_PRODUCT'
                )

                favoriteList.querySelector(`[data-name="${item.dataset.name}"]`).remove()
                item.classList.remove('page__product--favorited')
                favoriteData.splice(targetIndex, 1)
            }

            updateData()
        })
    })
})()