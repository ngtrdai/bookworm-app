
class StringUtils {

    static capitalizeWords(string) {
        // Source: https://teamtreehouse.com/community/can-someone-explain-the-logic-of-replacews-to-me
        return string.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    static convertDate(dateTypeTimestamp) {
        const date = new Date(dateTypeTimestamp);
        const day = date.getDate();
        const month = date.toLocaleString('en-us', {month: 'long'});
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
            filterByString = filterBy + "rating review)";
        }
        if (category_name && author_name) {
            filterByString = filterBy + "category: " + this.capitalizeWords(category_name) + " | author: " + author_name + ")";
        }
        if (category_name && rating) {
            filterByString = filterBy + "category: " + this.capitalizeWords(category_name) + " | rating review)";
        }
        if (author_name && rating) {
            filterByString = filterBy + "author: " + author_name + " | rating review)";
        }
        if (category_name && author_name && rating) {
            filterByString = filterBy + "category: " + this.capitalizeWords(category_name) + " | author: " + author_name + "| rating review)";
        }
        return filterByString;
    }

}

export default StringUtils;