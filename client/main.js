const candyContainer = document.querySelector('#candy-container')
const tatooContainer = document.querySelector('#tatooine-container')
const ubwContainer = document.querySelector('#ubw-container')

const serverURL = "http://localhost:4000/api/"
const SWAPI = "https://swapi.dev/api/"

const candyCallback = ({data: candy}) => displayCandy(candy)
const loadTatooine = (obj) => {
    let tatooineCard = document.createElement('div')
    tatooineCard.classList.add('tatooineCard')

    tatooineCard.innerHTML = `${obj.name} is a planet with a ${obj.rotation_period} hour day and does a full rotation around the sun in ${obj.orbital_period} days. </br> it has a diameter of ${obj.diameter} units. </br> it's climate is ${obj.climate}. its gravity is ${obj.gravity}. </br> It's terrain is ${obj.terrain}. </br> It's population is ${obj.population}. </br> I don't like the sand though, It's coarse and rough and irritating and it gets everywhere. Not like here. Here everything is soft and smooth.`
    tatooContainer.appendChild(tatooineCard)
}
const loadUBW = () => {
    const ubwCard = document.createElement('div')
    ubwCard.classList.add('ubw')

    ubwCard.innerHTML = `<img alt ='ubw' src ='https://thumbs.gfycat.com/EveryFirmBunting-size_restricted.gif' class = "ubw"/>
    `
    ubwContainer.appendChild(ubwCard)
}

const unlimitedBladeWorks = () => {
    axios.put(`${serverURL}push-button/update`)
    .then((res) => {
        console.log(res)
        let button = document.getElementById('UBW').innerText
        switch (res.body) {
            case 1:
                button = "I am the bone of my sword"
                break;
            case 2:
                button = "Steel is my body and fire is my blood"
                break;
            case 3:
                button = "I have created over a thousand of blades"
                break;
            case 4:
                button = "Unknown to death, nor known to life"
                break;
            case 5:
                button = "Withstood pain to create many weapons"
                break;
            case 6:
                button = "Those hands shall never hold anything."
                break;
            case 7:
                button = "so as I pray"
                break;
            case 8:
                button = "Unlimited Blade Works!"
                break;
            case 9:
                loadUBW()
                break;
        }
    })
}




const createCandy = (body) => {
    axios.post(`${serverURL}candy/`, body)
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


const deleteCandy = (id) => {
    axios.delete(`${serverURL}candy/${id}`)
    .then(candyCallback)
}



const createCandyCard = (ele) => {
    // console.log(ele.id)
    const candyCard = document.createElement('div')
    candyCard.classList.add('candy-card')

    candyCard.innerHTML = `<img alt ='candy image' src = ${ele.imageURL} class = "candy-image"/>
    <p class = "candy">${ele.candy} </p>
    <p class = "flavor">${ele.flavor} </p>
    </div>
    <button onclick="deleteCandy(${ele.id})">delete</button>
    `
    candyContainer.appendChild(candyCard)
}

const displayCandy = (arr) => {
    candyContainer.innerHTML = ''

    for (let i = 0; i < arr.length; i++) {
        createCandyCard(arr[i])
    }
}

document.getElementById("getCandy").onclick = () => {
    axios.get(`${serverURL}candy/`)
        .then(candyCallback)
        }


document.getElementById("complimentButton").onclick = () => {
    axios.get(`${serverURL}/compliment/`)
        .then((res) => {
          const data = res.data;
          alert(data);
        });
  };
document.getElementById("fortuneCookie").onclick = () => {
    axios.get(`${serverURL}fortune-cookie/`)
        .then((res) => {
            const data = res.data
            alert(data)
        })
}
document.getElementById("learnAboutTatooine").onclick = () => {
    axios.get(`${SWAPI}planets/?search=tatooine`)
        .then((res) => {
            const data = res.data
            loadTatooine(data.results[0])
        })
}
document.getElementById('submitCandy').onclick = submitCandy
document.getElementById('UBW').onclick = unlimitedBladeWorks