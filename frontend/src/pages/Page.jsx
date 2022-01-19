import {useCart} from "react-use-cart"

function Page() {
  const {addItem, items, updateItemQuantity, setCartMetadata} = useCart()

  const products = [
    {
      id: 1,
      name: "Malm",
      price: 9900,
      quantity: 1,
    },
    {
      id: 2,
      name: "Nordli",
      price: 16500,
      quantity: 5,
    },
    {
      id: 3,
      name: "Kullen",
      price: 4500,
      quantity: 1,
    },
  ]

  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>
          <h1>{p.name}</h1>
          <button
            onClick={() => {
              addItem(p)
              updateItemQuantity(p.id, p.quantity + 500)
              setCartMetadata({user: 1})
            }}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  )
}
export default Page
