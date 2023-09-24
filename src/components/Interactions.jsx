import {Flex} from '@chakra-ui/react';

const Interactions=({ liked , setLiked})=>{
    
    return(
        <Flex gap={3} my={2} onClick={(Event)=>{Event.preventDefault()}} >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                aria-label='Like'
                color={liked ? 'rgb(237,73,86)': ''}
                fill={liked ? 'rgb(237,73,86)': 'transparent'}
                viewBox="0 0 24 24" 
                //stroke-width="1.5" 
                stroke="currentColor" 
                width='20'
                onClick={()=> setLiked(!liked)}
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
                    stroke='currentColor' strokeWidth={'2'}/>
            </svg>

            <svg 
                aria-label='Comment' 
                xmlns="http://www.w3.org/2000/svg" 
                fill="transparent" 
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinejoin='round' 
                strokeWidth='2' 
                width={20}>
                    <title>Comment</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>

            <svg 
                fill="currentColor"
                color='currentColor'
                width={25}
                height={25}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                    <title>Repost</title>
                <path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z"/>
            </svg>

            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            width={20} 
            >
                <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
            </svg>



        </Flex>
    )
}

export default Interactions;