import { Link } from "react-router-dom";
import {Flex, Box, Text} from '@chakra-ui/layout';
import {Avatar} from '@chakra-ui/avatar';

const UserPosts=()=>{
    return(
        <Link to={'/Crizpy/posts/1'}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={'column'} alignItems={'center'}>
                    <Avatar size={'md'} name="Crizpy" src=""></Avatar>
                    <Box w={'1px'} h={'full'} bg={'gray.light'} my={2}></Box>
                    <Box position={'relative'} w={'full'}>
                        <Avatar 
                        size={'xs'} 
                        name="criz" 
                        src="" 
                        position={'absolute'} 
                        top={'0px'} 
                        left={'15px'}
                        padding={'2px'}
                        ></Avatar>
                        <Avatar 
                        size={'xs'} 
                        name="criz" 
                        src="" 
                        position={'absolute'} 
                        bottom={'0px'} 
                        right={'-5px'}
                        padding={'2px'}
                        ></Avatar>
                        <Avatar 
                        size={'xs'} 
                        name="criz" 
                        src="" 
                        position={'absolute'} 
                        bottom={'0px'} 
                        left={'4px'}
                        padding={'2px'}
                        ></Avatar>
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={'column'} gap={2}>
                    <Flex justifyContent={'space-between'} w={'full'}>
                        <Flex w={'full'} alignItems={'center'}>
                            <Text fontSize={'sm'} fontWeight={'bold'}>Crizpy</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    )
};

export default UserPosts;