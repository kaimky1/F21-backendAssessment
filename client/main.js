const form = document.querySelector('form')
const fortunesContainer = document.querySelector('#fortunes-container')
const fortuneCallback = ({ data: fortunes }) => displayFortunes(fortunes)

document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };
  document.getElementById("fortune").onclick = function () {
    axios.get("http://localhost:4000/api/fortune/")
    .then(function (response) {
          const data = response.data;
          alert(data)
        });
  };
  const addFortune = body => axios.post(`http://localhost:4000/api/addFortune/`, body)
  .then(fortuneCallback).catch(err => {
    console.log(err)
    alert('Uh oh. Your request did not work.')
  })

document.getElementById("allFortune").onclick = function () {
axios.get(`http://localhost:4000/api/getAll/`)
.then(fortuneCallback)
}

const deleteFortune = id => axios.delete(`http://localhost:4000/api/delete/${id}`).then(fortuneCallback)

const updateFortune = (id, type) => axios.put(`http://localhost:4000/api/update/${id}`, {type}).then(fortuneCallback)


function submitHandler(e) {
    e.preventDefault();

    let fortune = document.querySelector('#fortuneText');
    let rating = document.querySelector('input[name="ratings"]:checked');

    let bodyObj = {
        fortune: fortune.value,
        rating: rating.value, 
    };

    addFortune(bodyObj);

    fortune.value='';
    rating.checked = false;
}


//   function createUserCard(data) {
//     fortunesContainer.innerHTML = ''
//     const fortuneCard = document.createElement('div')
//     fortuneCard.classList.add('fortune-card')

//     fortuneCard.innerHTML = `<li class="fortune">Fortune: ${data.fortune}</li>
//     <button onclick="deleteMovie(${fortune.id}">delete</button>`

//     fortunesContainer.appendChild(fortuneCard)
// }

function createUserCard(data) {
  const fortuneCard = document.createElement('div')
  fortuneCard.classList.add('fortune-card')

  fortuneCard.innerHTML = `
  <p class="fortuneText">${data.fortune}</p>
  <div class="btns-container">
        <button onclick="updateFortune(${data.id}, 'minus')">-</button>
        <p class="fortune-rating">${data.rating} stars</p>
        <button onclick="updateFortune(${data.id}, 'plus')">+</button>
  </div>
  <button onclick="deleteFortune(${data.id})">delete this fortune</button>
  `


  fortunesContainer.appendChild(fortuneCard)
}


function displayFortunes(arr){
  fortunesContainer.innerHTML = ``
  for(let i=0; i < arr.length; i++){
    createUserCard(arr[i])
  }
}

form.addEventListener('submit', submitHandler)

// getAllFortunes();

  












