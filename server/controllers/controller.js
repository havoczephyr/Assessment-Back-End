const candyDb = require('./candy.json')
let globalId = 2
let pushTheButton = 0

module.exports = {
  getCompliments: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!",
                       "Cool shirt!",
                       "Your Javascript skills are stellar.",
    ];
  
    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];
  
    res.status(200).send(randomCompliment);
    
  },
  getFortuneCookie: (req, res) => {
      const fortuneCookies = ["Ignore previous cookie",
                            "I don't feel like giving out a fortune, try again later.",
                            "you will click this button again",
                            "Don't invest in NFT's",
                            "Time flies like an Arrow, Fruit Flies like Banana"
    ];

    let randomIndex2 = Math.floor(Math.random() * fortuneCookies.length);
    let randomFortune = fortuneCookies[randomIndex2]
    
    res.status(200).send(randomFortune)
  },
  fetchCandy: (req, res) => {
      res.status(200).send(candyDb)
    //   console.log(candyDb)
  },
  createCandy: (req, res) => {
      let {candy, flavor, imageURL} = req.body
      let newCandy = {
          id: globalId,
          candy,
          flavor,
          imageURL,
      }
      candyDb.push(newCandy)
      res.status(200).send(candyDb)
  },
  deleteCandy: (req,res) => {
    // console.log("ping!")
    let index = candyDb.findIndex((ele) => ele.id === +req.params.id)
    candyDb.splice(index, 1)
    res.status(200).send(candyDb)
  },
  updateButton: (req,res) => {
    if (pushTheButton <= 8){
      pushTheButton++
      res.status(200).send(pushTheButton.toString())
  } else {
      res.status(400).send('no u')
  }
}
}
