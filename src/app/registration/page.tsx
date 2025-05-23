"use client"
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card/Card";
import Input from "@/components/ui/Input/Input";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import { FaBasketball } from "react-icons/fa6";
import styles from "./page.module.scss";

const Signup = () => {

    // const [avatarConfig, setAvatarConfig] = useState<NiceAvatarProps>(genConfig())

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [repeatEmail, setRepeatEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const [pages, setPages] = useState(0)

    useEffect(() => {
        if (window.innerWidth < 768) {
            setPages(2)
        }
        else {
            setPages(1)
        }
    }, [])


    // const signup = async () => {
    //     if (email !== repeatEmail) {

    //     }
    //     // const user: User = {
    //     //     user_name: userName,
    //     //     email: email,
    //     //     user_password: userPassword,
    //     // }

    //     const response = await createUser(user)
    //     setLoading(true)
    //     if (response.success === true) {
    //         setLoading(false)
    //         router.replace("")
    //     }
    //     else {
    //         setLoading(false)
    //     }
    // }

    return (
        <>
            <div className={`${styles.container} flex flex-col`}>
                <Card className="flex justify-center" pages={pages}>
                    <div>
                    </div>
                    <div className={styles.card}>
                        <div className={`flex justify-center gap-2 mb-2 ${styles.icon}`}>
                            <FaBasketball fontSize={32} color="#fff" />
                            <h3 className="flex items-center font-semibold text-lg">BackCourt | NBA Stats & News</h3>
                        </div>
                        <Input label={"User name"} placeholder={"User name"} type={"text"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setUserName(e.target.value)} value={userName} />
                        <Input label={"Email"} placeholder={"Your email address"} type={"text"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setEmail(e.target.value)} value={email} />
                        <Input label={"Repeat email"} placeholder={"Confirm your email adress"} type={"text"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setRepeatEmail(e.target.value)} value={repeatEmail} />
                        <Input label={"Password"} placeholder={"Create a strong password"} type={"password"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                            setUserPassword(e.target.value)} value={userPassword} />
                        <Input label={"Confirm password"} placeholder={"Confirm your password"} type={"password"} />
                        <div className="flex gap-4 mb-4">
                            <input type="checkbox" />
                            <p>I accept the TaskQuest Terms and Privacy Policy</p>
                        </div>
                        <div >
                            <Button className="!w-full font-semibold text-lg" style={"primary"} text={"Join now"} height={45} type="submit"/>
                        </div>
                        <div className="mt-4 flex">
                            <p className="font-medium">Already have a account ?</p>
                            <Link className="ml-2" href={"/login"}>
                                <u className="font-medium cursor-pointer ml-2">click here</u>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Signup;