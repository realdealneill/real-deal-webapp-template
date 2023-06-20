import { atom } from "recoil"

interface UserInterface {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
    email: string | null;
}

const userAtom = atom<UserInterface | undefined>({
    key: "userAtom",
    default: undefined
})

export default userAtom