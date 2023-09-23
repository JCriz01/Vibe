import {Box, VStack, Flex, Text} from '@chakra-ui/layout'
import { Link } from '@chakra-ui/react'
//import { ExternalLinkIcon } from '@chakra-ui/icons'
import {Avatar} from '@chakra-ui/avatar';
import {BsInstagram} from 'react-icons/bs';
import {CgMoreO} from 'react-icons/cg';
import {Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import {Portal} from '@chakra-ui/portal'
const UserHeader = ()=>{

    const copyURL=()=>{
        const currentURL=window.location.href;
        navigator.clipboard.writeText(currentURL).then(()=>{
            console.log('The url is copied');
        })
    }
    return(
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={'full'}>
                <Box>
                    <Text fontSize={'2xl'} fontWeight={'bold'}>
                        Testing Cripzpy asdf
                    </Text>
                    <Flex gap={2} alignItems={'center'}>
                        <Text fontSize={'sm'}>crizpy</Text>
                        <Text fontSize={'xs'} bg={'gray.dark'}
                         color={'grey.light'} p={1} borderRadius={'full'}
                        >vibe.net</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar 
                        name="Crizpy"
                        src=''
                        size={'xl'}
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
        </VStack>
    )
}

export default UserHeader