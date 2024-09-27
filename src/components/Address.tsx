import { Address } from "../types"

const AddressDetails = (address: Address) => {
  const { street, suite, city, zipcode } = address
  return (
    <>
      <p>
        {street} 
        , {suite}
        , {city}
        , {zipcode}
      </p>
    </>
  )
}

export default AddressDetails