import { Flex, Avatar, Text, Image, Box, Divider } from "@chakra-ui/react"
import {BsThreeDots} from 'react-icons/bs';
import Interactions from "../components/Interactions";
import { useState } from "react";
import Comment from "../components/Comments";

const PostPage = ()=>{
    const [liked, setLiked]= useState(false);
    return(
        <>
            <Flex>
                <Flex w={'full'} alignItems={'center'}gap={3}>
                    <Avatar src="" size={'md'} name="Crizpy"/>
                    <Flex >
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            Crizpy
                        </Text>
                        <Image src="/check.png" w={4} h={4} ml={4} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={'center'}>
                    <Text fontSize={'sm'} color={'gray.light'}>1d</Text>
                    <BsThreeDots />
                </Flex>
            </Flex>

            <Text my={3}>This is a test.</Text>
            <Box borderRadius='6' overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                <Image src="" w={'full'}></Image>
            </Box>

            <Flex gap='3' my={3}>
                <Interactions liked={liked} setLiked={setLiked}/>
            </Flex>

            <Flex gap={2} alignItems={'center'}>
                <Text color={'gray.light'} fontSize={'sm'}>0 replies</Text>
                <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
                <Text color={'gray.light'} fontSize={'sm'}>
                    {0 + (liked? 1: 0)} likes
                </Text>
            </Flex>
            <Divider my={4}/>

            {/* implement get app component later */ }
            <Comment 
            comment={'looks great'} 
            created={"1d"} 
            likes={0} 
            username={'johndoe'} 
            avatarImg={''}
            />
        </>
    )
}

export default PostPage;