import { authOptions } from '@/lib/utils/authOptions';

// import axiosClient from '@/app/api/axiosClient'
import Login from '@/components/login';
import Logout from '@/components/logout';
import { getServerSession } from 'next-auth';
export default async function LoginLogoutButton() {
    const session = await getServerSession(authOptions);
    
    if (session) {
        return <><Logout /> </>
    }
    return (<div><Login /> </div>)
}
