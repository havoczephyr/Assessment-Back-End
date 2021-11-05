const candyContainer = document.querySelector('#candy-container')
const tatooContainer = document.querySelector('#tatooine-container')
const candyCallback = ({data: candy}) => displayCandy(candy)
const loadTatooine = (obj) => {
    let tatooineCard = document.createElement('div')
    tatooineCard.classList.add('tatooineCard')

    tatooineCard.innerHTML = obj
    tatooContainer.appendChild(tatooineCard)
}


document.getElementById("getCandy").onclick = function () {
    axios.get("http://localhost:4000/api/candy/")
        .then(candyCallback)
        }


document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };
document.getElementById("fortuneCookie").onclick = function () {
    axios.get("http://localhost:4000/api/fortune-cookie/")
        .then((res) => {
            const data = res.data
            alert(data)
        })
}
document.getElementById("learnAboutTatooine").onclick = () => {
    axios.get("https://swapi.dev/api/planets/?search=tatooine")
        .then((res)=>{
            const data = res.data
            loadTatooine(data.results[0])
        })
}

const createCandy = (body) => {
    axios.post("http://localhost:4000/api/candy/", body)
        .then(candyCallback)
}

const submitCandy = (ele) => {
    ele.preventDefault()

    let candy = document.getElementById('candy')
    let flavor = document.getElementById('flavor')
    let imageURL = document.getElementById('image-url')

    let bodyObj = {
        candy: candy.value,
        flavor: flavor.value,
        imageURL: imageURL.value
    }
    createCandy(bodyObj)
    candy.value = ''
    flavor.value = ''
    imageURL.value = ''
} 
document.getElementById('submitCandy').onclick = submitCandy



const createCandyCard = (ele) => {
    // console.log(ele)
    const candyCard = document.createElement('div')
    candyCard.classList.add('candy-card')

    candyCard.innerHTML = `<img alt ='candy image' src = ${ele.imageURL} class = "candy-image"/>
    <p class = "candy">${ele.candy} </p>
    <p class = "flavor">${ele.flavor} </p>
    `
    candyContainer.appendChild(candyCard)
}

const displayCandy = (arr) => {
    candyContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createCandyCard(arr[i])
    }
}