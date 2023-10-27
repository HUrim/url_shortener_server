export const validateUrl = (url: string) => {
    return !!url && url
        .match(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
        )
}

export const expirationAsInt = (time: string) => {
    let seconds = 0
    switch(time) {
        case "1 minute":
            seconds = 60;
            break;
        case "5 minutes":
            seconds = 5*60;
            break;
        case "30 minutes":
            seconds = 30*60;
            break;
        case "1 hour":
            seconds = 1*60*60;
            break;
        case "5 hours":
            seconds = 5*60*60;
            break;
    }
    return seconds;
}