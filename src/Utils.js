export const getDate = (isoString, opt) => {
    const date = new Date(isoString);

    // Format the date to a readable format
    // You can customize the format as needed
    const options = opt !== undefined ? opt : {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };

    return date.toLocaleString('en-US', options);

}