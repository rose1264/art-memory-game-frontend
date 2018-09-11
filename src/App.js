import React, { Component } from 'react';
import './App.css';
import ImageList from './components/ImageList'
import UserPanel from './components/UserPanel'
import Score from './components/Score'
import Leaderboard from './components/Leaderboard'


const URL = "http://localhost:3000/api/v1/images"
const PlayersURL = "http://localhost:3000/api/v1/players"
const ScoresURL = "http://localhost:3000/api/v1/scores"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageList: [],
      openArray: [],
      leaderBoard: [],
      player: '',
      player_id: 0,
      score: 0,
      bestScore: 0,
      playerLogin: false,
      gameEnd: false
    }
  }

  componentDidMount() {
    fetch(ScoresURL)
      .then(resp => resp.json())
      .then(data => this.sortedArray(data))
      .then(data => this.setState({
        ...this.state,
        leaderBoard: data
      }))

    fetch(URL)
      .then(resp => resp.json())
      .then(json => {
        let images=json.map(image => {
          let newImage = {
            id: image.id,
            name: image.name,
            url: image.url,
            open: false
          }
        return newImage
      })
      let shuffledImages = this.shuffle(images)
      this.setState({
        imageList: shuffledImages
      })
    })
    this.interval = setInterval(this.clockTick, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  restart = () => {
    alert('Congratulations! Your memory is a MASTERPIECE!')
    let images = this.state.imageList
    let turnedImages = images.map(image => {
      let newImage = {
        id: image.id,
        name: image.name,
        url: image.url,
        open: false
      }
      return newImage
    })
    let shuffledImages = this.shuffle(turnedImages)
    this.setState({...this.state, imageList: shuffledImages, openArray:[], score: 0, gameEnd: false})
  }

  clockTick = () => {
    this.setState(prevState => ({
        score: prevState.score+1
      }))
  }


  shuffle = a => {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
  }

  comparePair = openArray => {
    if (openArray[0].name.slice(0,5) !== openArray[1].name.slice(0,5)){
      let newImageList = this.state.imageList.map(image => {
        if (image.name.slice(0,5) === openArray[0].name.slice(0,5)
        ||image.name.slice(0,5) === openArray[1].name.slice(0,5)) {
          return {
            ...image,
            open: false
          }
        } else {
          return image
        }
      })
      setTimeout(()=>{
        if (openArray[0].name.slice(0,5)!== openArray[1].name.slice(0,5)){
          openArray.shift()
          openArray.shift()
        }
        this.setState({
        imageList: newImageList,
        openArray: openArray
      })}, 1500)

    }
  }

  // callback function of handleClick, first check the number
  checkPair = newImageList => {
    let imageOpenCount = 0
    newImageList.forEach(image => {
      if (image.open) {
        imageOpenCount++
      }
    })

    if (imageOpenCount%2 === 0) {
      let openArray = this.state.openArray
      if (openArray.length === 2) {
        window.scrollBy(0, 800)
        this.setState({
          ...this.state,
          gameEnd: true
        })
        fetch(ScoresURL, {
            method: "POST",
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify({
              points: this.state.score,
              player_id: this.state.player_id,

            })
          })

        // setTimeout(this.restart, 1500)
      } else {
        this.comparePair(openArray)
      }
    }
  }

  bestScore = array => {
    let sortedArray = array.sort(function(a, b){return a.points - b.points})
    return sortedArray[0]
  }


  sortedArray = array => {
    let sortedArray = array.sort(function(a, b){return a.points - b.points})
    return sortedArray
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      player: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({"name": this.state.player}
      )
    }

    fetch(PlayersURL, config)
      .then(r=>r.json())
      .then(data=>this.setState({
        ...this.state,
        playerLogin: true,
        player_id: data.id
      }))

    fetch(ScoresURL)
      .then(r=>r.json())
      .then(data=>this.bestScore(data))
      .then(scoreObj=>this.setState({
        ...this.state,
        bestScore:scoreObj.points
      }))
  }

  handleClick = e => {
    //add to openArray
    let addedImage={}

    //toggle image open attribute
    let newImageList = this.state.imageList.map(image => {
      if (image.name === e.target.getAttribute('name')) {
        addedImage = image
        return {
          ...image,
          open: true
        }
      } else {
        return image
      }
    })

    this.setState({
      imageList: newImageList,
      openArray: [addedImage, ...this.state.openArray]
    }, ()=>{this.checkPair(this.state.imageList)})

  }

  render() {
    return (
      <div className="App">
        <UserPanel
          bestScore={this.state.bestScore}
          player={this.state.player}
          playerLogin={this.state.playerLogin}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}/>
        <Score
          score={this.state.score}
          setScore={this.setScore}
          gameEnd={this.state.gameEnd}/>
        <ImageList
          imageList={this.state.imageList}
          handleClick={this.handleClick}/>
        <Leaderboard
          leaderBoard={this.state.leaderBoard}/>
      </div>
    )
  }
}

export default App;
