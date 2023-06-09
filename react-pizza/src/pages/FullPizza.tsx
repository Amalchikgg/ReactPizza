import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://6416fd4a205bdf0a1d7d9e3d.mockapi.io/Items/' + id);
                setPizza(data); 
            } catch(e) {
                alert('Error')
            }
        }

        fetchPizza();
    }, [id]);

    if(!pizza) {
        return <>'Loading'</>
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    )
}

export default FullPizza;
