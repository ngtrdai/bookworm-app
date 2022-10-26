
class StringUtils {

    static capitalizeWords(string) {
        // Source: https://teamtreehouse.com/community/can-someone-explain-the-logic-of-replacews-to-me
        return string.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

}

export default StringUtils;