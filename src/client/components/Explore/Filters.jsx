import React, { useState, useEffect, useMemo } from 'react'
import Select from 'react-select'
import {
  Form,
  ListGroup,
  Card,
  InputGroup,
  FormControl
} from 'react-bootstrap'
import qs from 'qs'
import srv from '../../srv'

const Filter = ({ name, children }) => {
  return <>
    <ListGroup.Item
      as={Card.Body}>
      <Card.Subtitle className="mb-3">{name}</Card.Subtitle>
      {children}
    </ListGroup.Item>
  </>
}

const Filters = ({ setDesitnations }) => {
  // init query
  const initQuery = qs.parse(window.location.hash.slice(10))

  // filter inputs
  // continents
  const [continents, setContinents] = useState({
    Africa: false,
    Asia: false,
    Europe: false,
    America: false,
    Australia: false,
    ...initQuery.continents
  })
  const continentsQuery = useMemo(
    () => Object.entries(continents).filter(e => e[1]).map(e => e[0]),
    [continents]
  )

  // moods
  const moods = [
    'Nature',
    'Nightlife',
    'Relax',
    'Sightseeing',
    'Festivals and events',
    'Advenure'
  ].sort()
  const [moodsQuery, setMoodsQuery] = useState(initQuery.moods)

  // ranking
  // TBD

  // budget
  const [budget, setBudget] = useState({
    Min: 0,
    Max: 0,
    ...initQuery.budget
  })
  const budgetQuery = useMemo(() => ({
    min: Number(budget.Min) ? { $lte: Number(budget.Min) } : undefined,
    max: Number(budget.Max) ? { $gte: Number(budget.Max) } : undefined
  }), [budget])

  // query to be fecthed
  const query = useMemo(() => ({
    continent: continentsQuery.length ? { $in: continentsQuery } : undefined,
    moods: moodsQuery && moodsQuery.length ? { $all: moodsQuery } : undefined,
    'budget.min': budgetQuery.min,
    'budget.max': budgetQuery.max
  }), [continents, moodsQuery, budgetQuery])

  useEffect(() => {
    let mounted = true
    srv.service('destinations')
      .find({ query })
      .then(d => mounted && setDesitnations(d))
      .catch(e => console.log('test', e))
    return () => mounted = false
  }, [query])

  return (
    <Card>
      <Card.Header>Filter</Card.Header>
      <ListGroup variant="flush">
        <Filter name="Continent">
          {Object.keys(continents).map(e =>
            <Form.Check
              custom
              key={e}
              id={e}
              label={e}
              checked={!!continents[e]}
              onChange={({ target }) => setContinents({
                ...continents,
                [e]: target.checked
              })}/>
          )}
        </Filter>
        <Filter name="Mood">
          <Select
            options={moods}
            isMulti
            getOptionLabel={e => e}
            getOptionValue={e => e}
            components={{ DropdownIndicator: null }}
            value={moodsQuery}
            onChange={v => setMoodsQuery(v)} />
        </Filter>
        <Filter name="Budget">
          {['Min', 'Max'].map(e =>
            <InputGroup key={e}>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="number"
                min="0"
                value={budget[e]}
                placeholder={e}
                onChange={({ target }) => setBudget({
                  ...budget,
                  [e]: Number(target.value)
                })}/>
              <InputGroup.Append>
                <InputGroup.Text
                  className="close"
                  style={{
                    borderColor: 'darkgray',
                    cursor: 'default'
                  }}
                  onClick={() => setBudget({
                    ...budget,
                    [e]: ''
                  })}>
                        &times;
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          )}
        </Filter>
      </ListGroup>
    </Card>
  )
}

export default Filters
