import React from 'react'

const renderField = ({ input, label, type, placeholder, className, meta: { touched, error } }) => {
    return(
        <input className={className} {...input} placeholder={placeholder} type={type}/>
        // <div>
        //         {type != 'number' && (touched == false || !error) && <label>{label}</label>}
        //         {type != 'number' && touched && error && <label className="required-label">{label} IS {error}</label>}
        //         <div>
        //         </div>
        //         {type == 'number' && touched && error && <label className="date-required-label">{error}</label>}
        //     </div>
        )
}

export default renderField