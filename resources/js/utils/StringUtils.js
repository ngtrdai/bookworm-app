
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

    static getStringFilter(category_name, author_name, rating){
        const filterBy = "(Filtered by ";
        let filterByString = "";
        if (category_name) {
            filterByString = filterBy + "category: " + this.capitalizeWords(category_name) + ")";
        }
        if (author_name) {
            filterByString = filterBy + "author: " + author_name + ")";
        }
        if (rating) {
            filterByString = filterBy + "rating: " + rating + ")";
        }
        if (category_name && author_name) {
            filterByString = filterBy + "category: " + this.capitalizeWords(category_name) + " | author: " + author_name + ")";
        }
        if (category_name && rating) {
            filterByString = filterBy + "category: " + this.capitalizeWords(category_name) + " | rating: " + rating + ")";
        }
        if (author_name && rating) {
            filterByString = filterBy + "author: " + author_name + " | rating: " + rating + ")";
        }
        if (category_name && author_name && rating) {
            filterByString = filterBy + "category: " + this.capitalizeWords(category_name) + " | author: " + author_name + "| rating: " + rating + ")";
        }
        return filterByString;
    }

}

export default StringUtils;