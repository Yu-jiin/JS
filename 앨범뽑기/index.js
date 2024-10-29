/* 
  아래에 코드를 작성해주세요.
*/

// 검색창
const searchBtn = document.querySelector('.search-box__button') 
const APIKEY = '2050978ac1e0b8da227038647540282a'
const divTag = document.querySelector('.search-result')

const fetchAlbums = function () {
  const page = 1
  const limit = 10
  // alert('브라우저 확인')
  
  const searchInput = document.querySelector('.search-box__input')
  let keyword = searchInput.value
  const URL = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${keyword}&api_key=${APIKEY}&page=${page}&limit=${limit}`
  console.log(keyword)

  axios({
    method: 'get',
    url: URL
  })
  .then((response) => {

    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');

    const albums = xmlDoc.getElementsByTagName('album')
    // 이전 검색 결과 지우기
    // resultContainer.innerHTML = ''
    let albumList = [];

  
    for (let i = 0; i < albums.length; i++) {
      const name = albums[i].getElementsByTagName('name')[0].textContent
      const artist = albums[i].getElementsByTagName('artist')[0].textContent
      const url = albums[i].getElementsByTagName('url')[0].textContent
      const image = albums[i].getElementsByTagName('image')[2]?.textContent || ''

      albumList.push({ name, artist, url, image })
    }
    console.log(albumList)

    albumList.forEach(function(album) {
      const cardImg = document.createElement('img')
      cardImg.src = album.image

      const card = document.createElement('div')
      card.classList.add('search-result__card')

      const resultBox = document.createElement('div')
      resultBox.classList.add('search-result__text')
      const h2Tag = document.createElement('h2')
      const pTag = document.createElement('p')
      h2Tag.textContent = album.artist
      pTag.textContent = album.name

      resultBox.append(h2Tag)
      resultBox.append(pTag)
      
      card.append(cardImg)
      card.append(resultBox)

      divTag.appendChild(card)
    })

  })
  .catch((error) => {
    alert('잠시 후 다시 시도해주세요')
  })



}

searchBtn.addEventListener('click', fetchAlbums)