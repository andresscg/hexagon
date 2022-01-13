import {CartProvider, useCart} from "react-use-cart"

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
              console.log(items)
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

function Cart() {
  const {isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem} =
    useCart()

  if (isEmpty) return <p>Your cart is empty</p>

  return (
    <>
      <h1>Cart ({totalUniqueItems})</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.name} &mdash;
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button onClick={() => removeItem(item.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </>
  )
}
