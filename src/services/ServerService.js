import Cookies from "js-cookie"

export default class ServerService {

/**********************COUNTRIES************************/
getCountries = async() => {
  return await this.doRequestAndParse(`http://165.227.143.167:9000/api/countries/`, {
    method: "GET",
    headers:{ Authorization : "Bearer " + getAccessToken()
    }
  })
}
createCountry =  async ({name, country_code}) => {
  return await this.doRequestAndParse('http://165.227.143.167:9000/api/countries/',{
    method:"POST",
    headers:
    { Authorization: "Bearer " + getAccessToken(),
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      country_code
    })  
  })
}
updateCountry = async (id, name, country_code) => {
  return await this.doRequestAndParse(`http://165.227.143.167:9000/api/countries/${id}`, {
    method:"PUT",
    headers:{Authorization: "Bearer " +  getAccessToken() },
    body: JSON.stringify({ name, country_code })
  })


}
deleteCountry = async (id) => {
  const res = await fetch(`http://165.227.143.167:9000/api/countries/${id}`, {
    method:"DELETE",
    headers:{ Authorization: "Bearer " + getAccessToken()}
  })
  if(!res.ok){
    return {
      hasError: true,
      data:{detail: "ошибка при удалении страны из списка"}
    }
  }
  else{
   return {
    hasError:false,
    data:{detail: "Эта страна успешно удалена из списка"}
   }
    
  }
}
/***********************CITIES**************************/
getCities = async() => {
  return await this.doRequestAndParse(`http://165.227.143.167:9000/api/cities/`, {
    method: "GET",
    headers:{ Authorization : "Bearer " + getAccessToken()
    }
  })
}
createCity =  async ({ name, country }) => {
  return await this.doRequestAndParse('http://165.227.143.167:9000/api/cities/',{
    method:"POST",
    headers:
    { Authorization: "Bearer " + getAccessToken(),
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,
      country
    })  
  })
}
updateCity = async (id, name, country) => {
  return await this.doRequestAndParse(`http://165.227.143.167:9000/api/cities/${id}`, {
    method:"PUT",
    headers:{Authorization: "Bearer " +  getAccessToken() },
    body: JSON.stringify({ name, country })
  })


}
deleteCity = async (id) => {
  const res = await fetch(`http://165.227.143.167:9000/api/cities/${id}`, {
    method:"DELETE",
    headers:{ Authorization: "Bearer " + getAccessToken()}
  })
  if(!res.ok){
    return {
      hasError: true,
      data:{detail: "ошибка при удалении страны из списка"}
    }
  }
  else{
   return {
    hasError:false,
    data:{detail: "Эта страна успешно удалена из списка"}
   }
    
  }
}
/********************USERS******************************/
getUsers = async() => {
  return await this.doRequestAndParse(`http://165.227.143.167:9000/auth/users/`, {
    method: "GET",
    headers:{ Authorization : "Bearer " + getAccessToken()
    }
  })
}
createUser =  async ({ username, email, password }) => {
  return await this.doRequestAndParse('http://165.227.143.167:9000/auth/users/',{
    method:"POST",
    headers:
    { Authorization: "Bearer " + getAccessToken(),
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      username,
      email, 
      password
    })  
  })
}
updateCountry = async (id, name, country_code) => {
  return await this.doRequestAndParse(`http://165.227.143.167:9000/auth/users/me`, {
    method:"PUT",
    headers:{Authorization: "Bearer " +  getAccessToken() },
    body: JSON.stringify({ name, country_code })
  })}

deleteUser = async () => {
  const res = await fetch(`http://165.227.143.167:9000/auth/users/me`, {
    method:"DELETE",
    headers:{ Authorization: "Bearer " + getAccessToken()}
  })
  if(!res.ok){
    return {
      hasError: true,
      data:{detail: "ошибка при удалении страны из списка"}
    }
  }
  else{
   return {
    hasError:false,
    data:{detail: "Эта страна успешно удалена из списка"}
   }
    
  }
}
/***********************REQUEST*************************/

doRequestAndParse = async ( url, options ) =>{
  try{
    let hasError = false
    const res = await fetch(url, options)
    console.log("ress:,", res)
    if(!res.ok){
      hasError =  true
    }
    const data = await res.json()
    return { hasError, data }
  }
  catch(err){
    return { hasError: true, data: {detail: err.message.toString() }} 
  }
}

}
const getAccessToken = () => {
  console.log("acc : ", Cookies.get('access_token_aalam') || '',
  )
  const token = Cookies.get('access_token_aalam') 
  return token
}
