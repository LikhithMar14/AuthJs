import {auth, signOut} from "@/auth"

const settingsPage = async () =>{
    const session = await auth();

    return (
        <div>
            {JSON.stringify(session)}
            <form action = {
                async() => {
                    "use server"
                    await signOut()
                }
            }>
                <button type="submit">Signout</button>

            </form>
        </div>
    )
}
export default settingsPage