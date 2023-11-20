import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartState, addToCart , deleteFromCart} from "../atom/cartAtoms";
type Props = {}

function Test({}: Props) {
    const [cart, setCart] = useRecoilState(cartState);
    const setAddToCart = useSetRecoilState(addToCart);
    const deleteItem = useSetRecoilState(deleteFromCart);

    const addItem = () => {
        setAddToCart({ name: 'New Item', price: 100 });
    }
    const deleteItemFromCart = () => {
        deleteItem({ name: 'New Item', price: 100 });
    }
    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            <button onClick={deleteItemFromCart}>Delete Btn</button>
            {cart?.map((item, index) => (
                <div key={index}>
                    <h4>{item.name}</h4>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    )
}

export default Test