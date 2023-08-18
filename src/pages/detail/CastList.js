import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import tmdbApi from '../../api/movieDbApi'
import apiConfig from '../../api/apiConfig'


const CastList = props => {
    const {category}= useParams()
    const [cast, setCast] = useState([])

    useEffect(() => {
        const getCredits=async ()=>{
            const res= await tmdbApi.credits(category, props.id)
            setCast(res.cast.slice(0,5))
        }

        getCredits()
    }, [category, props.id])
    

  return (
    <div className='listcast'>
        {
            cast.map((item, i)=>(
                <div className="listcast__item" key={i}>
                    <div className="listcast__item__img" style={{backgroundImage:`url(${apiConfig.w500Img(item.profile_path)})`}}></div>
                    <p className='listcast__item__name'>{item.name}</p>
                    <p className='listcast__item__character'>{item.character}</p>
                
                </div>
            ))
        }

    </div>
  )
}

export default CastList