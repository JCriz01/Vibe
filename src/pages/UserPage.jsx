
import UserHeader from "../components/UserHeader";
import UserPosts from '../components/UserPosts';

const UserPage= ()=>{


    return(
        <>
            <UserHeader />

            <UserPosts likes={0} replies= {0} postImg='' postTitle='This is my first post'/>
            <UserPosts likes={0} replies= {0} postImg='' postTitle='This is my first post'/>
            <UserPosts likes={0} replies= {0} postImg='' postTitle='This is my first post'/>

        </>
    )
}

export default UserPage