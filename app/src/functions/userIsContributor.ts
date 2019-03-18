import * as admin from './contributors'

export default function isUserContributor(user) {
    if (user) {
        return admin.contributors.includes(user.email)
    } else return false
}
