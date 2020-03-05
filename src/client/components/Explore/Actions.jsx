import React, { useState, useEffect } from 'react'
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap'
import srv from '../../srv'

const Actions = ({ destination, setDestination }) => {
  const checkLogin = () => {
    if (!srv.authentication.authenticated)
      window.location.hash = '#sign-in'
    else return true


   

  }



const putLabel=function(d, number) {
  var l='';
  if(number==0){
    number=-1;
  }
if ((d.votes+number)>40) {
l = 'Popular destination';
}

if ((d.votes+number)>90) {
  l = 'Very popular destination';
}

if ((d.votes+number)>100) {
    l = 'Super popular destination';
}
return l;

}







  const like = () => {
    if (!checkLogin()) return
    srv.get('authentication')
      .then(({ user }) => {
        const idx = user.likedDestinations.indexOf(destination._id)
        if (idx < 0) {
          user.likedDestinations.push(destination._id)

          return srv.service('users')
            .update(user._id, user)
            .then(() => srv.service('destinations').get(destination._id))
            .then((dest) => srv.service('destinations')
              .patch(dest._id, {
                votes: dest.votes + 1,
                label: putLabel(dest, 1)

                //label: dest.votes>90?'LABEL':'NOTLABEL'
                
              }
              )
              
              )
            .then(() => {


              const _actions = actions.slice()
              _actions[1].active = true
              setActions(_actions)
              setDestination(n => {

                n.votes += 1,
                //n.label= n.votes>90?'LABEL':'NOTLABEL'
                n.label=putLabel(n, 1)

                return { ...n }
              })
            })
        } else {
          user.likedDestinations.splice(idx, 1)

          return srv.service('users')
            .update(user._id, user)
            .then(() => srv.service('destinations').get(destination._id))
            .then(dest => srv.service('destinations')
              .patch(dest._id, {
                votes: dest.votes - 1,
                label: putLabel(dest, 0)
              }))
            .then(() => {
             

              const _actions = actions.slice()
              _actions[1].active = false
              setActions(_actions)
              setDestination(n => {
                n.votes -= 1,
                n.label=putLabel(n, 0)
                
                return { ...n }
              })
            })
        }
      })
      .catch(console.log)
  }

  const [actions, setActions] = useState([
    { icon: 'mdi-playlist-plus', label: 'Add to my trip' },
    { icon: 'mdi-thumb-up', label: 'Like', action: like }



    
  ])

  useEffect(() => {
    const auth = srv.get('authentication')
    if (auth) {



      console.log("TICKET");
     
      auth.then(({ user }) => {
        if (user.likedDestinations.includes(destination._id)) {
          const _actions = actions.slice()
          _actions[1].active = true
          setActions(_actions)
        } else {
          const _actions = actions.slice()
          _actions[1].active = false
          setActions(_actions)
        }
      })
        .catch(console.log)
    }
  }, [])

  return (
    <div className="d-flex flex-row-reverse">
      {actions.map(e =>
        <OverlayTrigger
          key={e.icon}
          overlay={ <Tooltip>{e.label}</Tooltip> }
        >
          <Button
            variant="light"
            className={`rounded-circle mdi
              ${e.icon}
              ${e.active ? 'text-primary' : ''}`}
            style={{
              fontSize: 20
            }}
            onClick={e.action}>
          </Button>
        </OverlayTrigger>
      )}
    </div>
  )
}

export default Actions
