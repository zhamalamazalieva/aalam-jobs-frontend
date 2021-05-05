import React, { useEffect } from 'react'
import './scss/style.scss'
import Router from "./pages/Router"
import { useSelector, useDispatch} from 'react-redux'
import FullSpinner from './components/spinners/FullSpinner'
import { loadUser } from './redux/actions/authActions'


const App = () =>{

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  },[])

  const isUserLoading = useSelector(state => state.auth.isUserLoading)

  return (
      <>
      { isUserLoading ? <FullSpinner/> : <Router/> }
      </>

  )}

export default App
