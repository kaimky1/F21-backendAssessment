const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

let fortunes = require('./db.json')

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req,res) => {
  const fortunes = [
    "Your life will be happy and peaceful.",
    "Your first love has never forgotten you.",
    "Your abilities are unparalleled.",
    "You will have gold pieces by the bushel.",
    "You will enjoy good health.",
    "You will be blessed with longevity.",
    "Run",
    "Don't let yesterday take up too much of today",
    "Never dream of success, work for it",
    "Love all, trust a few, do wrong to none."
  ]
  let index = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[index]
  res.status(200).send(randomFortune)
})

app.get("/api/getAll", (req,res) => {
  res.status(200).send(fortunes)
})


app.post(`/api/addFortune`, (req, res) => {
  const{fortune,rating} = req.body;
  console.log(req.body)
  let newFortune = {
    fortune,
    rating,
  }
  fortunes.push(newFortune)
  console.log(req.body)
  res.status(200).send(fortunes)
})

app.delete(`/api/delete/:id`, (req, res) => {
  let index = fortunes.findIndex(elem => elem.id === +req.params.id)
  fortunes.splice(index, 1)
  res.status(200).send(fortunes)
})

app.put(`http://localhost:4000/api/update/:id`, (req, res) => {
  const {id} = req.params;
  const {type} = req.body;
  console.log(req.params, req.body)
  let index = fortunes.findIndex(elem => +elem.id === +id);
  console.log(type);
  if(type === 'minus' && fortunes[index].rating > 0){
      fortunes[index].rating -= 1;
      res.status(200).send(fortunes);
  } else if(type === 'plus' && fortunes[index].rating < 5){
      fortunes[index].rating += 1;
      res.status(200).send(fortunes);
  } else {
      res.status(400).send('Something went wrong...')
  }
    })

app.listen(4000, () => console.log("Server running on 4000"));
