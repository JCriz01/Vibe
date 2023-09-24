import {Box, VStack, Flex, Text} from '@chakra-ui/layout';
import { Link, useToast } from '@chakra-ui/react';
//import { ExternalLinkIcon } from '@chakra-ui/icons'
import {Avatar} from '@chakra-ui/avatar';
import {BsInstagram} from 'react-icons/bs';
import {CgMoreO} from 'react-icons/cg';
import {Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import {Portal} from '@chakra-ui/portal';


const UserHeader = ()=>{

    const toast= useToast();

    const copyURL=()=>{
        const currentURL=window.location.href;
        
        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({
                title: 'Account',
                description: "Successfully added user link to clipboard",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
         });
    };

    return(
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={'full'}>
                <Box>
                    <Text fontSize={'2xl'} fontWeight={'bold'}>
                        Testing Cripzpy asdf
                    </Text>
                    <Flex gap={2} alignItems={'center'}>
                        <Text fontSize={'sm'}>crizpy</Text>
                        <Text 
                        fontSize={{
                            base: 'xs',
                            md: 'sm',
                            lg: 'md'
                        }} 
                        bg={'gray.dark'}
                        color={'gray.light'} p={1} borderRadius={'full'}
                        >vibe.net</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar 
                        name="Crizpy"
                        src=''
                        size={{
                            base: 'md',
                            md: 'xl'
                        }}
                    />
                </Box>
            </Flex>
            <Text>Aspiring full stack web developer, current junior in college XD</Text>
            <Flex w={'full'} justifyContent={'space-between'}>
                <Flex gap={2} alignItems={'center'}>
                    <Text color={'gray.light'}>0 followers</Text>
                    <Box w={1} h={1} bg={'gray.light'} borderRadius={'full'}></Box>
                    <Link color={'gray.light'}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={'pointer'}/>
                    </Box>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={'pointer'}/>

                            </MenuButton>
                            <Portal>
                                <MenuList bg={'gray.dark'}>
                                    <MenuItem bg={'gray.dark'} onClick={copyURL}>Copy Link</MenuItem>

                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>   
                </Flex>
            </Flex>
            <Flex w={'full'}>
                <Flex flex={1} borderBottom={'1.5px solid white'} justifyContent={'center'} pd="3" cursor={'pointer'}>
                    <Text fontWeight={'bold'}>Vibes</Text>
                </Flex>
                <Flex flex={1}>
                    <Flex flex={1} borderBottom={'1px solid grey'} justifyContent={'center'} color={'gray.light'} pd="3" cursor={'pointer'}>
                        <Text fontWeight={'bold'}>Replies</Text>
                    </Flex>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader