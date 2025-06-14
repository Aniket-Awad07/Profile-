import { useContext,useEffect,useState } from "react"
import { ShopContext } from "../App" 

function Profile() {
    const authToken = useContext(ShopContext)
    const [respData,setRespData] = useState()
    const [errorMessage,setErrorMessage] = useState()

    const PROFILE_URL = 'http://localhost:4000/profile'

    const getProfile=(token)=>{ 
      fetch(PROFILE_URL,{
        method:'GET',
        headers:{
          'Accept':'application/json',
          'Authorization':'bearer '+ token.current
        }
      }).then((response)=>{
        if(response.ok)
          return response.json()
        else 
          throw new Error(`HTTP Error: status ${response.status}`)
      }).then((data)=>{
         console.log(data) 
         if(data.dbUser)
            setRespData(data.dbUser)
          if(data.errorMessage)
            setErrorMessage(data.errorMessage)
      }).catch((error)=>{
        console.log(error)
      })
    }

    useEffect(()=>{
      getProfile(authToken)
    },
      [authToken] )

  return (
    <div>
        <h2>Profile</h2>
        {respData && <h4> {respData.username} </h4>}
        {errorMessage && <h4> {errorMessage} </h4>}
    </div>
  )
}

export default Profile  