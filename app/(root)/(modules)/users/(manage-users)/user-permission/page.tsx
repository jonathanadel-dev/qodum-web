import FormCom from "@/components/modules/users/manageUsers/userPermission/FormCom";
import { getCurrentUser } from "@/lib/auth/session";

export default async function Page(){

    const user = await getCurrentUser();

    return(
        <FormCom user={user}/>
    )
}