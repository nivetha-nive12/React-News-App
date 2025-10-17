import React, {useEffect, useState} from 'react'

function Article({item}){
  return (
    <article className="card">
      <h3><a href={item.url || '#'} target="_blank" rel="noreferrer">{item.title || item.story_title}</a></h3>
      <p className="meta">by {item.author} · {new Date(item.created_at).toLocaleString()}</p>
    </article>
  )
}

export default function App(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('react')

  useEffect(()=>{
    setLoading(true)
    fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story`)
      .then(r=>r.json())
      .then(data=>{
        setItems(data.hits || [])
      })
      .catch(()=>setItems([]))
      .finally(()=>setLoading(false))
  }, [query])

  return (
    <div className="container">
      <header>
        <h1> Hiiiiii!Welcome to React News App...</h1>
       
        <p className="subtitle">Search</p>
        <div className="search">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="search topics (e.g. react)" />
        </div>
      </header>

      <main>
        {loading ? <p>Loading...</p> : (
          items.length === 0 ? <p>No results</p> : (
            items.map(item => <Article key={item.objectID} item={item} />)
          )
        )}
      </main>

      <footer>
        <p>Built with React.</p>
      </footer>
    </div>
  )
}
