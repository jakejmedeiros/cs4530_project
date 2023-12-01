import { ColumnNameTranslate } from "./columnNameTranslate";

// Test Suite for Column name translating util class
describe('ColumnNameTranslate', () => {
    // columnName
    describe('columnName()', () => {
        it("A should translate to 1", () => {
            const columnAsNumber: number = ColumnNameTranslate.columnName('A');
      
            expect(columnAsNumber).toEqual(1);
        });
        it("N should translate to 14", () => {
            const columnAsNumber: number = ColumnNameTranslate.columnName('N');
        
            expect(columnAsNumber).toEqual(14);
        });
        it("AA should translate to 27", () => {
            const columnAsNumber: number = ColumnNameTranslate.columnName('AA');
        
            expect(columnAsNumber).toEqual(27);
        });
        it("BC should translate to ", () => {
            const columnAsNumber: number = ColumnNameTranslate.columnName('BC');
        
            expect(columnAsNumber).toEqual(55);
        });
    });

    // columnToLetter
    describe('columnToLetter()', () => {
        it("1 should translate to A", () => {
            const numberAsColumn: String = ColumnNameTranslate.columnToLetter(0);
      
            expect(numberAsColumn).toEqual("A");
        });
        it("18 should translate to ", () => {
            const numberAsColumn: String = ColumnNameTranslate.columnToLetter(18);
        
            expect(numberAsColumn).toEqual("S");
        });
        it("40 should translate to ", () => {
            const numberAsColumn: String = ColumnNameTranslate.columnToLetter(40);
        
            expect(numberAsColumn).toEqual("AO");
        });
        it("78 should translate to ", () => {
            const numberAsColumn: String = ColumnNameTranslate.columnToLetter(78);
        
            expect(numberAsColumn).toEqual("CA");
        });
    });
});