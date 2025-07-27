import { ACCESS_TOKEN } from "@/utils/constant"
import { appRoutes } from "@/utils/routes"
import Cookies from "js-cookie"
import { redirect } from "next/navigation"

async function checkAuthentication() {
    const isAuthenticated = Cookies.get(ACCESS_TOKEN)
    if (isAuthenticated) {
        redirect(appRoutes.dashboard)
    } else {
        redirect(appRoutes.login)
    }
}

export default async function Admin() {
    await checkAuthentication()
}

