import Container from '../container'

type Props = {
  text: string
}

const Alert = ({ text }: Props) => {
  return (
    <div className="border-b">
      <Container>
        <div className="py-2 text-center text-sm">
          {text}
        </div>
      </Container>
    </div>
  )
}

export default Alert
