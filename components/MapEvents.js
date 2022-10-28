import Axios from "axios"
import what3words from "@what3words/api"
import { GridSectionClient, GridSectionOptions, GridSectionResponse, AvailableLanguagesClient } from '@what3words/api';
import { fetchTransport } from "@what3words/api"


const fetchData = async (ne, sw)=>{

    const API_endpoint = `https://api.what3words.com/v3/grid-section?`
    const API_key = process.env.WHAT_THREE_WORDS

    
    const neLatitude = ne.lat
    const neLongitude = ne.lng

    const swLatitude = sw.lat
    const swLongitude = sw.lng
    Axios.get(`${API_endpoint}`).then((res)=>{
        res.json()
    }).then((data)=>{
        console.log(data)
    })
    



    
    // const client =  AvailableLanguagesClient.init(API_key);
    // const options = {
    // southwest: { lat: swLatitude, lng: swLongitude },
    // northeast: { lat: swLatitude, lng: swLongitude }
    // };
    // await client.run(options)
    //     .then((res) => console.log('Grid Section', res));
    

    



}
export default fetchData



