import { useState } from 'react'

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults)

  function updateValues(e) {
    // convert numbers
    let { value } = e.target
    if (e.target.value === 'number') {
      value = Number(e.target.value)
    }
    setValues({
      ...values,
      [e.target.name]: value,
    })
  }
  return { values, updateValues }
}
