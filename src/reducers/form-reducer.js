const initialFormState = {
  contactFormData: {}
}

const formReducer = function(state = initialFormState, action) {
  switch(action.type) {
  case 'UPDATE_CONTACT_FORM_DATA':
    return Object.assign({}, state, { contactFormData: action.contactFormData });
  }
  return state;
}

export default formReducer;