import React, { useEffect, useState , } from 'react'
import { useMap } from 'react-leaflet/hooks'
import what3words from '@what3words/api';
import { GridSectionClient } from '@what3words/api';
import L from 'leaflet'


const useGeolocation = (url)=>{

    
    const map = useMap()
    const [location, setlocation] = useState({
        loaded:false,
        coordinates:{
            southwest:{
                lat:null
            },

            northeast:{
                lat:null

            }
        
        }
    })

    
    const  getPostion = async ()=>{
        await what3words.getCurrentPosition()
        let ne = map.getBounds().getNorthEast();
        let sw = map.getBounds().getSouthWest();

        return {ne, sw}

    }

    
  
    


// // begining of onSuccess function
//     const onSuccess = ()=>{
//         setlocation({
//             loaded:true,
//             coordinates:{
//                 lat: location.coords.latitude,
//                 lng: location.coords.longitude,
//             },
//         })

//     }
// // end of onSuccess function

   

// beginning of onError function 

    const onError =()=>{
            setLocation({
                loaded:true,
                error:error.message
            })
    }

// end of onError function


// beginning of useEffect to call the what3words api.
//  would run when the api call for the location changes
//  as well as the first load tim

    useEffect(()=>{
        // if the api is is not successful we use the onError function
        if(!(getPostion)){
            onError({
                code:0, 
                error:"Geolocation not supported"
            })
        }
        const {ne, sw } = getPostion()
        setLocation({
            loaded:true,
            coordinates:{
                southwest:{
                    lat:
                },
    
                northeast:{
                    lat:null
    
                }
            
            }

        })

        

    }, [url])





    return location;




    // end of function
}