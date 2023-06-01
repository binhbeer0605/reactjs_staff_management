function formatDate(dateInput) {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month =
        date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + parseInt(date.getMonth() + 1);
    const day = date.getDate() + 1 >= 10 ? date.getDate() : '0' + date.getDate();
    return `${year}-${month}-${day}`;
}

export default formatDate;
