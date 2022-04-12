const testBtn = document.getElementById('testBtn')
const videos = document.getElementsByTagName('video')

testBtn?.addEventListener("click", () => {
  console.log('klikk')
  const smallChocolates = document.querySelectorAll('.smallChocolate')
  // console.log(smallChocolates)
  smallChocolates.forEach(chocolate => {
    // console.log(chocolate.parentElement.classList)
    const computedStyle = window.getComputedStyle(chocolate)
    console.log(computedStyle.getPropertyValue('right'))
    // chocolate.parentElement.classList.remove('smallChocolate')
    // chocolate.parentElement.classList.remove('animated')
  })
})

const rndIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

function startSendingChocolates() {
  let classToAdd = `bottom${rndIntBetween(3, 7)}0`
  // console.log('spawn', classToAdd, rndIntBetween(1, 2))
  let bigOrSmall = rndIntBetween(1, 2) === 1 ? 'bigChocolate' : 'smallChocolate'

  let testSubjectContainer = document.createElement("div")
  testSubjectContainer.classList.add(`testSubjectContainer`)
  testSubjectContainer.classList.add(`animated`)
  testSubjectContainer.classList.add(classToAdd)
  let testSubjectImg = document.createElement("img")
  testSubjectImg.src = "/public/images/chocolate.png"
  testSubjectImg.classList.add(bigOrSmall)
  testSubjectContainer.appendChild(testSubjectImg)

  document.body.appendChild(testSubjectContainer)
  setTimeout(() => {
    document.body.removeChild(testSubjectContainer)
  }, 2500)
}

function startConveyor() {
  const videosArr = [...videos]
  videosArr.forEach(video => {
    video.play()
  })
}

document.addEventListener("DOMContentLoaded", () => {
  setInterval(startSendingChocolates, (rndIntBetween(1, 4) * 100) * rndIntBetween(2, 8))
  setTimeout(startConveyor, 2000)
})

document.addEventListener("beforeunload ", () => {
  clearInterval(startSendingChocolates)
})
