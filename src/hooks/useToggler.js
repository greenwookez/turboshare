import { useState } from 'react'

const useToggler = (initialState) => {
  const [toggled, setToggled] = useState(initialState)
  return [
    toggled,
    () => {
      setToggled(!toggled)
    },
  ]
}

export default useToggler
