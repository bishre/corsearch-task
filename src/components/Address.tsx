interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

const Address = (address: Address) => {
  const { street, suite, city, zipcode } = address
  return (
    <>
      <p>
        {street},
        {suite},
        {city},
        {zipcode}
      </p>
    </>
  )
}

export default Address