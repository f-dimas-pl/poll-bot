export const hasNameOrSurname = (firstName, lastName) => {
    if (firstName && lastName) {
        return `${firstName} ${lastName}`
    } else if (firstName) {
        return firstName
    } else if (lastName) {
        return lastName
    }
}