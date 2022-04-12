const testBtn = document.getElementById('testBtn')

testBtn?.addEventListener("click", () => {
  console.log('klikk')
  const smallChocolates = document.querySelectorAll('.smallChocolate')
  // console.log(smallChocolates)
  smallChocolates.forEach(chocolate => {
    console.log(chocolate.parentElement.classList)
    chocolate.parentElement.classList.remove('smallChocolate')
    chocolate.parentElement.classList.remove('animated')
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
  testSubjectImg.src = "../img/chocolate.png"
  testSubjectImg.classList.add(bigOrSmall)
  testSubjectContainer.appendChild(testSubjectImg)

  document.body.appendChild(testSubjectContainer)
}

function clearDom () {
  const testSubjectContainers = document.querySelectorAll('.testSubjectContainer')
  testSubjectContainers.forEach(div => {
    // console.log(div)
    div.remove()
  })
}

document.addEventListener("DOMContentLoaded", () => {
  setInterval(startSendingChocolates, (rndIntBetween(1,4) * 100) * rndIntBetween(2, 8))
  // setInterval(clearDom, 5000)
})

document.addEventListener("beforeunload ", () => {
  clearInterval(startSendingChocolates)
  clearInterval(clearDom)
})
