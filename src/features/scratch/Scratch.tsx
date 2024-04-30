import { Button } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../../app/store/store"
import { decrement, increment, incrementByAmount } from "./testSlice"

export default function Scratch() {

const {data} = useAppSelector(state =>state.test)
const dispatch = useAppDispatch()

  return (
    <div>
    <h1>The scratch page</h1>
    <h3>The date is {data}</h3>
    <Button onClick={()=>{dispatch(increment())}} color="teal" content = 'Increment'></Button>
    <Button onClick={()=>{dispatch(incrementByAmount(10))}} color="green" content = 'Increment by value'/>
    <Button onClick={()=>{dispatch(decrement())}} color="red" content = 'Decrement'/>
    </div>
  
  )
}