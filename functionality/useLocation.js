import { useEffect } from "react";

export const useLocation = ()=>{
    const [getLocation ,  setlocation] = useState({
        loaded:false, coordinates:{lat:'', lng:''}
    })


    const onSuccess = ()=>{

        setlocation({
            loaded:true, 
            coordinates:{
                lat:location.coords.latitude, 
                lng:location.coords.longitude,
            },
        })
    }


    const onError = ()=>{

         setlocation({
            loaded:true, 
            error,
         })   


    }

    useEffect(()=>{
        if(!("geolocation" in navigator)){
           
            setlocation((state)=>({
                ...state, 
                loaded:true,
                error:{
                    code:0, 
                    message:'Geolocation not supported'
                }
            }))


        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);




    }, [])
    return getLocation




    


































}