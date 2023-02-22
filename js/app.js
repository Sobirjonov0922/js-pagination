async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  return data
}

async function main() {
  const postsData = await getData()
  let currentPage = 1
  let rows = 10

  function displayList(arrData, rowPerPage, page) {
    let postsEl = document.querySelector('.posts')
    postsEl.innerHTML = ''
    page--

    let start = rowPerPage * page,
      end = start + rowPerPage
    let paginatedData = arrData.slice(start, end)

    paginatedData.forEach((el) => {
      let postEl = document.createElement('div'),
          postTitle = document.createElement('p');

      postEl.classList.add('post')
      postTitle.classList.add('post__title')
      postTitle.innerText = `${el.title}`
      postEl.append(postTitle)
      postsEl.append(postEl)
    });
  }

  function displayPagination(arrData, rowPerPage) {
    let paginationEl = document.querySelector('.pagination')
    let pagesCount = Math.ceil(arrData.length / rowPerPage)
    let ulEl = document.createElement('ul')

    ulEl.classList.add('pagination__list')

    for (let i = 0; i < pagesCount; i++) {
      let liEl = displayPaginationBtn(i + 1)

      ulEl.append(liEl)
    }
    paginationEl.append(ulEl)
  }

  function displayPaginationBtn(page) {
    let liEl = document.createElement('li')

    liEl.classList.add('pagination__item')
    liEl.innerText = page
    if (currentPage === page) liEl.classList.add('active')
    
    liEl.addEventListener('click', function () {
      currentPage = page
      displayList(postsData, rows, currentPage)
      
      let currentItemLi = document.querySelector('li.pagination__item.active')
      currentItemLi.classList.remove('active')

      liEl.classList.add('active')
    })
    
    return liEl
  }

  displayList(postsData, rows, currentPage)
  displayPagination(postsData, rows)
}

main()