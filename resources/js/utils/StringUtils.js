
class StringUtils {

    static capitalizeWords(string) {
        // Source: https://teamtreehouse.com/community/can-someone-explain-the-logic-of-replacews-to-me
        return string.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    static convertDate(dateTypeTimestamp) {
        const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        const date = new Date(dateTypeTimestamp);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

}

export default StringUtils;