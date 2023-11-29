// A util class to translate column letters into numbers and numbers into column letters
export class ColumnNameTranslate {

    // Translates a column letter to a useable number. NOT index
    public static columnName(column: String): number {
        const start = 'A'.charCodeAt(0) - 1;
        let index: number = 0;
    
        for (let i = 0; i < column.length; i++) {
          const charCode = column.charCodeAt(i) - start;
          index = index * 26 + charCode;
        }
        return index;
      }

    // Translates a number to a column letter
    public static columnToLetter = (column: number): String => {
        let letter = '';
        const start = 'A'.charCodeAt(0) - 1;
    
        while (column > 0) {
          const remainder = (column) % 26;
          letter = String.fromCharCode(start + remainder) + letter;
          column = Math.floor((column) / 26);
        }
    
        return letter;
      }
}
