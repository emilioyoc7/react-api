import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/fact'

// const CAT_ENPOINT_IMAGE_URL = `https://cataas.com/cat/cute/says/${firstWorld}?/hello?json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    getRandomFact().then(setFact)
  }, [])

  useEffect(() => {
    if (!fact) return
    const firstWorld = fact.split(' ', 3).join(' ')
    console.log(firstWorld)

    fetch(`https://cataas.com/cat/cute/says/${firstWorld}?json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    <main>
      <h1>app de gatos</h1>

      <button onClick={handleClick}>get new fact</button>

      {fact && <p>{fact}</p>}
      <img
        src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`image extracted using the first
      rhee words for ${fact}`}
      />
    </main>
  )
}
