import { AUTH_TOKEN } from '@/modules/Auth'

export default interface User {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
    [AUTH_TOKEN]: string
}
