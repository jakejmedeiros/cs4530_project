import React from 'react'

// A util class to translate column letters into numbers and numbers into column letters
export class ColumnNameTranslate {

    // Translates a column letter to a useable number. NOT index
    public static columnName(column: String): number {
        const base = 'A'.charCodeAt(0) - 1;
        let result: number = 0;
    
        for (let i = 0; i < column.length; i++) {
          const charCode = column.charCodeAt(i) - base;
          result = result * 26 + charCode;
        }
        return result;
      }

    // Translates a number to a column letter
    public static columnToLetter = (column: number): String => {
        let result = '';
        const base = 'A'.charCodeAt(0) - 1;
    
        while (column > 0) {
          const remainder = (column) % 26;
          result = String.fromCharCode(base + remainder) + result;
          column = Math.floor((column) / 26);
        }
    
        return result;
      }
}
