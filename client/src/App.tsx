import { useState } from 'react'
import './App.css'
import images from './images/index'
export interface ICharacter {
  name: string
  actor: string
  gender: string
  house: string
  wand: string
  img: string
  alive: boolean
}

const initialCharacters: ICharacter[] = [
  {
    name: "Hermione Granger",
    actor: "Emma Watson",
    gender: "female",
    house: "Gryffindor",
    wand: "dragon heartstring",
    img: images.hermione,
    alive: true
  },
  {
    name: "Draco Malfoy",
    actor: "Tom Felton",
    gender: "male",
    house: "Slytherin",
    wand: "unicorn tail-hair",
    img: images.draco,
    alive: true
  },
  {
    name: "Harry Potter",
    actor: "Daniel Radcliffe",
    gender: "male",
    house: "Gryffindor",
    wand: "phoenix feather",
    img: images.harry,
    alive: true
  },
]


function App() {
  const [school, setSchool] = useState<string>('')
  const [name, setName] = useState<string>('')

  const filteredCharacters = initialCharacters.filter((char) => {
    const matchesSchool =
      !school ||
      school === 'All' ||
      char.house?.toLowerCase() === school.toLowerCase()
    const matchesName =
      !name || char.name?.toLowerCase().includes(name.trim().toLowerCase())
    return matchesSchool && matchesName
  })

  return (
    <div className='app-container'>
      <header>
        <h1>Harry Potter</h1>
        <p>View all characters from the Harry Potter universe</p>
        <div className='input_label'>
          <div>
            <p>Name</p>
            <input
              type='text'
              placeholder='Write your favorite charapter'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p>School</p>
            <select
              name='choose_school'
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            >
              <option value=''>Choose one</option>
              <option value='Gryffindor'>Gryffindor</option>
              <option value='Slytherin'>Slytherin</option>
            </select>
          </div>
        </div>
      </header>
      <main>
        {filteredCharacters.map((char) => (
          <div className='Card' key={char.name}>
            <img
              src={char.img}
              alt={char.name}
            />
            <div className='card_info'>
              <h3>{char.name}</h3>
              <p>Actor: {char.actor || 'Unknown'}</p>
              <p>Gender: {char.gender || 'Unknown'}</p>
              <p>House: {char.house || 'None'}</p>
              <p>Wand core: {char.wand || 'none'}</p>
              <p>Alive: {char.alive ? 'yes' : 'no'}</p>
            </div>
          </div>
        ))}
        {filteredCharacters.length === 0 && (
          <p className='not-found'>
            No characters found
          </p>
        )}
      </main>
    </div>
  )
}

export default App
