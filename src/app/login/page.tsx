import Button from "@/components/Button"
import Card from "@/components/Card/Card"
import Input from "@/components/Input/Input"
import { useLoadingContext } from "@/contexts/LoadingContext/LoadingContext"
import { useRouter } from "next/router"
import { SetStateAction, useState } from "react"
import { FaBasketball } from "react-icons/fa6"
import styles from "./page.module.css"

const Login = () => {
    const router = useRouter()
    const { setLoading } = useLoadingContext()
    // const { setIsAuthenticated } = useAuthContext()

    const [email, setEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const doLogin = async () => {
        router.replace("/dashboard")
    }
    return (
        <div className={styles.container}>
            <Card className="mt-4" pages={1}>
                <div className={styles.card}>
                    <div className={`flex justify-center gap-2 mb-2 ${styles.icon}`}>
                        <FaBasketball fontSize={32} color="#fff" />
                        <h3 className="flex items-center font-semibold text-lg">Basketball Advanced Stats</h3>
                    </div>

                    <div className="mt-4 flex flex-col items-center gap-2">
                        <p className="font-semibold text-3xl">Login</p>
                        <p>Welcome back</p>
                    </div>
                    <Input label={"email"} placeholder={"Your email address"} type={"text"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setEmail(e.target.value)} value={email} />
                    <Input label={"Password"} placeholder={"Your account password"} type={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setUserPassword(e.target.value)} value={userPassword} />
                    <div>
                        <Button className="!w-full mt-2" style={"primary"} type="submit" text={"Login"} height={45} action={doLogin} />
                    </div>
                    <div className="mt-4 flex">
                        <p className="font-medium">Forgot your password ?</p>
                        <u className="font-medium cursor-pointer ml-2">click here</u>
                    </div>
                </div>
                <div></div>
            </Card>
        </div>
    )
}

export default Login;