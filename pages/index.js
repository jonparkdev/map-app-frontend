import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Index = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [])

  return null;
}

export default Index
