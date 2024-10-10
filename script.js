const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['violet', '#9b6aff', '#ff55c7', '#6655ff', '#aab5ff', '#95f5ff', '#902bff', '#e355ff', '#ff00f1', '#556dff', '#15f5ff', '#ff95a9','#55ffd5']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) =>{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRand()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRand()
    setTime(time)
}

function decreaseTime() {
    if(time === 0) {
        finishGame()
    }else {
        let current = --time
        if(current < 10) {
            current=`0${current}`
        }
        setTime(current)
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
timeEl.parentNode.classList.add('hide')
    board.innerHTML= `<h1>Score: <span class="primary">${score}</span></h1>`
}

function createRand() {
    const circle = document.createElement('div')
    const size = getRandNum(10,60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandNum(0,width-size)
    const y = getRandNum(0,height-size)
    
    circle.classList.add('circle')
    circle.style.width=`${size}px`
    circle.style.height=`${size}px`
    circle.style.top=`${y}px`
    circle.style.left=`${x}px`
    circle.style.background = getRandColor()
    
    board.append(circle)
}

function getRandNum(min, max) {
    return Math.round(Math.random() * (max-min)+min)
}

function getRandColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

