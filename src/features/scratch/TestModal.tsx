import ModalWrapper from "../../app/common/modals/ModalWrapper"
import { useAppSelector } from "../../app/store/store"

export default function TestModal() {
    const {data} = useAppSelector(state => state.modals)
  return (
     <ModalWrapper header={'123'}>
        <div>Test data is {data}</div>
     </ModalWrapper>
  )
}