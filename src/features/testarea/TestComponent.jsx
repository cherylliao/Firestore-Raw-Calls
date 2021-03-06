import React, {useState} from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {incrementAsync,decrementAsync} from './testActions'
import TestPlaceInput from './TestPlaceInput'
import SimpleMap from './SimpleMap'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import {openModal} from '../modals/modalActions'


const mapState = (state) =>({
    data:state.test.data,
    loading:state.async.loading,
    buttonName : state.async.elementName
})

const actions = {
    incrementAsync,
    decrementAsync,
    openModal

}



const TestComponent = ({data,incrementAsync,decrementAsync, openModal,loading,buttonName}) => {
  const [center,setCenter]=useState({
    lat: 59.95,
    lng: 30.33
})

const handleSelect = address => {
  geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latlng => setCenter(latlng))
    .catch(error => console.error('Error', error));
};
  
  return (
    <div>
      <h1>Test Component</h1>
      <h3>the answer is {data}</h3>
      <Button name='increment' 
      loading={buttonName==='increment' && loading} onClick={e=>incrementAsync(e.target.name)} positive content='Increment' />
      <Button name='decrement' 
      loading={buttonName==='decrement' && loading} onClick={e=>decrementAsync(e.target.name)} negative content='Decrement' />
      <Button 
      onClick={()=>openModal('TestModal',{data:42})} 
      color='teal' 
      content='Open Modal' />
      <TestPlaceInput selectAddress={handleSelect}/>
      <SimpleMap key={center.lng} center={center}/>
      <br/>
      <br/>
    
     
    </div>
  )
}

export default connect(mapState,actions)(TestComponent)
