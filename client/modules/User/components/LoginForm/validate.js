import stringLength from 'string-length'

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'REQUIRED'
  }
  else{
    if(stringLength(values.password) < 6)
      errors.password = 'minimum 6 characters'
  }
  if (!values.confirm_password) {
    errors.confirm_password = 'REQUIRED'
  }
  else{
    if(stringLength(values.confirm_password) < 6)
      errors.confirm_password = 'minimum 6 characters'
  }
  if (values.password != values.confirm_password) {
    errors.confirm_password = 'DOES NOT MATCHED'
  }
  if (!values.email) {
    errors.email = 'REQUIRED'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'INVALID ADDRESS'
  }
 if (!values.date) {
     errors.date = 'REQUIRED'
 }

  if (!values.month) {
     errors.month = 'REQUIRED'
 }

  if (!values.year) {
     errors.year = 'REQUIRED'
 }

 if (!values.gender) {
     errors.gender = 'REQUIRED'
 }

  if (!values.how_hear_about_us) {
    errors.how_hear_about_us = 'THIS FIELD IS REQUIRED'
  }
  return errors
}

export default validate