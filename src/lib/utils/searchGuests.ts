import guests from "./guests.json"

export interface GuestFile {
    guests: Guest[]
}

export interface Guest {
    name: string,
    surname: string
}



export function searchGuest(name: string, surname: string) {
    name = name.trim();
    surname = surname.trim();
    if (name === '' && surname === '')
        return []
    const guestFound = (guests as GuestFile).guests.filter(guest => {
        const guestName = guest.name.toLowerCase().startsWith(name.toLowerCase())
        const guestSurname = guest.surname.toLowerCase().startsWith(surname.toLowerCase())
        return guestName && guestSurname
    })
    return guestFound.slice(0, 5)
}