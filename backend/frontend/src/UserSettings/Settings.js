import { useContext } from "react"
import AuthContext from "../Authentication/Auth"
import { ProfileSettings } from "./BasicInfoChange"
import { PasswordChange } from "./PasswordChange"


export default function SettingsPage() {
    let { userInformation, changePassword, changeUser } = useContext(AuthContext);
    let [user, setUser] = userInformation;

    return(
        <div>
            <ProfileSettings change={changeUser} />
            <PasswordChange change={changePassword} />
        </div>
    )
}