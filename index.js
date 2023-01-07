const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let persons = [
          {
            "id": 1,
            "name": "Arto Hellas",
            "number": "040-123456"
          },
          {
            "id": 2,
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
          },
          {
            "id": 3,
            "name": "Dan Abramov",
            "number": "12-43-234345"
          },
          {
            "id": 4,
            "name": "Mary Poppendick",
            "number": "39-23-6423122"
          }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {  
  const id = Math.floor(Math.random() * (Math.floor(1000) - Math.ceil(10)) + Math.ceil(10))

  const person = request.body

  if (!person.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!person.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  if (persons.find(searched => searched.name === person.name)) {
    return response.status(400).json({ 
      error: 'name already in use'
    })
  }

  person.id = id

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send('<p>Phonebook has info for ' + persons.length + ' persons</p>' + Date())
})


app.listen(process.env.PORT || 3001)