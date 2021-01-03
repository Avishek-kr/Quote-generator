const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function complete() {
  if (!loader.hidden) {
    loader.hidden = true
    quoteContainer.hidden = false
  }
}

async function getQuote() {
  loading()
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
  try {
    const response = await fetch(proxyUrl + apiUrl)
    const data = await response.json()
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown'
    } else {
      authorText.innerText = data.quoteAuthor
    }
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }
    quoteText.innerText = data.quoteText
      authorText.innerText = data.quoteAuthor
      complete() 
  } catch (error) {
    // getQuote();
  }
}

function tweetQuote() {
  const tweetQuote = quoteText.innerText
  const tweetauthor = authorText.innerText
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetQuote} - ${tweetauthor}`
  window.open(tweetUrl, '_blank')
}

newQuoteBtn.addEventListener('click', function () {
  getQuote()
})
twitterBtn.addEventListener('click', tweetQuote)

//on load
getQuote()
