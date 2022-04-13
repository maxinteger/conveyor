import {config} from '/js/config.js'

const testBtn = document.getElementById('testBtn')
const videos = document.getElementsByTagName('video')
const actualWidth = () => window.innerWidth

function removeLastChars(str, chars) {
  return str.substring(0, str.length - chars)
}

function removeLastTwoChar(str) {
  return removeLastChars(str.toString(), 2)
}

testBtn?.addEventListener("click", () => {
  const smallChocolates = document.querySelectorAll('.smallChocolate')

  smallChocolates.forEach(chocolate => {
    const computedStyle = window.getComputedStyle(chocolate)
    const marginRight = computedStyle.getPropertyValue('margin-right')
    const chocolateWidth = computedStyle.getPropertyValue('width')

    const marginRightAsNumber = Math.floor(parseInt(removeLastTwoChar(marginRight), 10))
    const chocolateWidthAsNumber = Math.floor(parseInt(removeLastTwoChar(chocolateWidth), 10))

    const oneThirdOfTtheFullWidth = actualWidth() / 3

    // console.log(marginRightAsNumber, oneThirdOfTtheFullWidth)
    // A középső képernyőre van tervezve, azokra a kiscsokikra amik még nem hullottak ki
    if (((marginRightAsNumber + chocolateWidthAsNumber / 2) > oneThirdOfTtheFullWidth) &&
      ((marginRightAsNumber + chocolateWidthAsNumber / 2) < oneThirdOfTtheFullWidth * 2) &&
      (chocolate.style.background !== "red")
    ) {
      chocolate.style.marginRight = marginRight
      chocolate.style.bottom = '0'
    } else {
      // eltelt az 50 ms, hogy rárakja a margin-rightot a "startSendingChocolates" function
      if (chocolate.style.marginRight.startsWith('calc')) {
        chocolate.style.background = "red"
        chocolate.classList.add('shakeAnim')
        chocolate.style.transition = 'all 1s ease-in-out'
        chocolate.style.opacity = '0'
      }
    }
  })
})

const rndIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

function startSendingChocolates() {
  let randomizedPositionClassname = `bottom${rndIntBetween(3, 7)}0`
  let bigOrSmall = rndIntBetween(1, 100) > config.smallChocolateChance
  let bigOrSmallClassname = bigOrSmall ? 'bigChocolate' : 'smallChocolate'

  let testSubjectImg = document.createElement("img")
  testSubjectImg.src = bigOrSmall ? "/images/cho3.png" : "/images/cho2.png"
  testSubjectImg.classList.add('testSubjectContainer', randomizedPositionClassname, bigOrSmallClassname)
  testSubjectImg.style.transition = `margin-right ${config.travellingSpeedThroughScreen}ms, bottom 2s`
  testSubjectImg.style.transitionTimingFunction = "linear"

  document.body.appendChild(testSubjectImg)

  setTimeout(() => {
    testSubjectImg.style.marginRight = `calc(100% - ${bigOrSmall ? '150px' : '75px'})`
  }, 50)

  setTimeout(() => {
    document.body.removeChild(testSubjectImg)
  }, config.travellingSpeedThroughScreen)
}

function startConveyorVideos() {
  const videosArr = [...videos]
  videosArr.forEach(video => {
    video.play()
  })
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(startConveyorVideos, 2000)
  setInterval(startSendingChocolates, config.startSendingChocolatesInterval)
})

document.addEventListener("beforeunload ", () => {
  clearInterval(startSendingChocolates)
})
