// In order for redux-form to work, it needs it's reducer injected into the global state.

import { combineReducers } from 'redux'  
import { reducer as form } from 'redux-form'

const IndexReducer = combineReducers({  
  form,
})

export default IndexReducer  