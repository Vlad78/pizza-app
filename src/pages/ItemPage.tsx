import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PizzaBlock from '../components/PizzaBlock'

const ItemPage = () => {
  const { id } = useParams()
  const [pizza, setPizza] = useState<PizzaBlock>()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://63d6bd1f94e769375bb6bc83.mockapi.io/Pizzas/${id}`)
        setPizza(data)
      } catch (error) {
        navigate('/')
      }
    }
    getData()
  }, [id])

  const PizzaFetched = () => (
    <>
      <img src={pizza?.imageUrl} alt="Pizza" />
      <h2>{pizza?.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur autem incidunt fugit dicta amet omnis
        cupiditate. Quod, laboriosam sint, aspernatur numquam quas maxime rem ex voluptatem saepe, similique in vitae.
      </p>
      <h4>{pizza?.price} руб.</h4>
    </>
  )

  return <div className="container">{pizza ? <PizzaFetched /> : 'Загрузка ...'}</div>
}

export default ItemPage
