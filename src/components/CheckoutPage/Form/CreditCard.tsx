import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useState, useEffect } from "react";

const Card = ({watch}: any) => {
  const [ cardState, setCardState ] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: 'number',
    callback: () => {}
  })

  useEffect(() => {
    // @ts-ignore
    const subscription = watch((value, { name }) => {   
      let inputName = ''
      switch (name) {
        case 'cardOwner': 
          inputName = 'name'
          break;
        case 'cardNumber':
          inputName = 'number'
          break;
        case 'cardExpiryDate':
          inputName = 'expiry'
          break;
        case 'cardCVV':
          inputName = 'cvc'
          break;
      }      
      // @ts-ignore
      setCardState((prev) => ({ ...prev, [inputName]: value[name], focus: inputName }))      
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <Cards
      number={cardState.number}
      expiry={cardState.expiry}
      cvc={cardState.cvc}
      name={cardState.name}
      // @ts-ignore
      focused={cardState.focus}
    />
  )
}

export default Card