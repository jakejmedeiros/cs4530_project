import { ICells } from "src/interfaces/cells.interface";
import { Grid } from "../grid";
import { Cells } from "../cellsImpl";
import { Parser } from "./parser";

describe('Parser', () => {

    let grid: Grid;

    beforeEach((): void => {
        grid = Grid.getInstance();
        grid.initialize(10,10);
    });

    afterEach((): void => {
        jest.clearAllMocks();
        grid.initialize(10,10);
    });

    // constants
    describe('constant values', () => {
        it("cell should contain an empty string as its value because the cell's state is an empty string", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual("");
        });

        it("cell should contain a string as its value because the cell's state is a string", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState(`"test"`);
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual("test");
        });

        it("cell should contain a number as its value because the cell's state is a number", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("98");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(98);
        });
    });

    // formulas
    describe('numeric formulas', () => {
        it("cell should contain 2 as its value when given 1+1 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("1+1");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(2);
        });

        it("cell should contain 4 as its value when given 9-5 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("9-5");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(4);
        });

        it("cell should contain 12 as its value when given 3*4 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("3*4");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(12);
        });

        it("cell should contain 3 as its value when given 24/8 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("24/8");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(3);
        });

        it("cell should contain 125 as its value when given 5^3 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("5^3");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(125);
        });

        it("cell should contain 10 as its value when given 3+5+2 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("3+5+2");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(10);
        });

        it("cell should contain -7 as its value when given 4-3-8 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("4-3-8");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(-7);
        });

        it("cell should contain 72 as its value when given 3*12*2 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("3*12*2");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(72);
        });

        it("cell should contain 5 as its value when given 50/2/5 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("50/2/5");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(5);
        });

        it("cell should contain 21 as its value when given 4+24-7 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("4+24-7");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(21);
        });

        it("cell should contain 15 as its value when given 10/2*3 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("10/2*3");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(15);
        });

        it("cell should contain 17 as its value when given 5+2*6 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("5+2*6");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(17);
        });

        it("cell should contain 1 as its value when given 8/2-3 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("8/2-3");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(1);
        });

        it("cell should contain -6 as its value when given 4-2*5 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("4-2*5");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(-6);
        });

        it("cell should contain 10 as its value when given (4-2)*5 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("(4-2)*5");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(10);
        });

        it("cell should contain 320 as its value when given 4^3*5 as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("4^3*5");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(320);
        });

        it("cell should contain 320 as its value when given 4^(3*2) as input", () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState("4^(3*2)");
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual(4096);
        });
    });

    // string concatenation
    describe('string concatenation', () => {
        it(`cell should contain "foobar" as its value when given "foo"+"bar" as input`, () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState(`"foo"+"bar"`);
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual("foobar");
        });

        it(`cell should contain "FOobar" as its value when given "FOo"+"bar" as input`, () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState(`"FOo"+"bar"`);
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual("FOobar");
        });

        it(`cell should contain "FOobar" as its value when given "FOo"+"bar" as input`, () => {
            const cell: ICells = new Cells("", 1, 1);
            cell.setState(`"FOo"+"bar"`);
            Parser.runCellState(cell);

            expect(cell.getValue()).toEqual("FOobar");
        });
    });

    // references (e.g: ref(a1))
    describe('references', () => {
        it(`cell2 should contain the same string as cell1 when given ref(a2) as input`, () => {
            const cell1: ICells = grid.getSingleCell(1, 0);
            const cell2: ICells = grid.getSingleCell(2, 4);
            cell1.setData("test string");
            cell2.setState(`ref(a2)`);
            Parser.runCellState(cell2);

            expect(cell2.getValue()).toEqual("test string");
        });

        it(`cell2 should contain the same number as cell1 when given ref(a2) as input`, () => {
            const cell1: ICells = grid.getSingleCell(1, 0);
            const cell2: ICells = grid.getSingleCell(2, 4);
            cell1.setData(98);
            cell2.setState(`ref(a2)`);
            Parser.runCellState(cell2);

            expect(cell2.getValue()).toEqual(98);
        });

        it(`cell3 should contain the same string as cell2 and cell1 because cell3 references cell2 which references cell1`, () => {
            const cell1: ICells = grid.getSingleCell(1, 0);
            const cell2: ICells = grid.getSingleCell(2, 4);
            const cell3: ICells = grid.getSingleCell(3, 4);
            cell1.setData("test");
            cell2.setState(`ref(a2)`); // references cell1
            cell3.setState(`ref(e3)`); // references cell2
            Parser.runCellState(cell2);
            Parser.runCellState(cell3);

            expect(cell3.getValue()).toEqual("test");
        });

        it(`cell2 should contain the same result as cell1 when given ref(a2) as input`, () => {
            const cell1: ICells = grid.getSingleCell(1, 0);
            const cell2: ICells = grid.getSingleCell(2, 4);
            cell1.setState('4+3');
            cell2.setState(`ref(a2)`);
            Parser.runCellState(cell1);
            Parser.runCellState(cell2);

            expect(cell2.getValue()).toEqual(7);
        });

        it(`cell2 should contain the same string result as cell1 when given ref(a2) as input`, () => {
            const cell1: ICells = grid.getSingleCell(1, 0);
            const cell2: ICells = grid.getSingleCell(2, 4);
            cell1.setState(`"con"+"cat"`);
            cell2.setState(`ref(a2)`);
            Parser.runCellState(cell1);
            Parser.runCellState(cell2);

            expect(cell2.getValue()).toEqual("concat");
        });

        it(`cell3 should contain 50 when calling 'ref(a2)+ref(b4) as input`, () => {
            const cell1: ICells = grid.getSingleCell(1, 0);
            const cell2: ICells = grid.getSingleCell(3, 1);
            const cell3: ICells = grid.getSingleCell(2, 1);
            cell1.setData(33);
            cell2.setData(17);
            cell3.setState(`ref(a2)+ref(b4)`);
            Parser.runCellState(cell3);

            expect(cell3.getValue()).toEqual(50);
        });

        it(`cell3 should contain 5 when calling 'ref(a2)-ref(b4) as input`, () => {
            const cell1: ICells = grid.getSingleCell(1, 0);
            const cell2: ICells = grid.getSingleCell(3, 1);
            const cell3: ICells = grid.getSingleCell(2, 1);
            cell1.setData(8);
            cell2.setData(3);
            cell3.setState(`ref(a2)-ref(b4)`);
            Parser.runCellState(cell3);

            expect(cell3.getValue()).toEqual(5);
        });

        it(`cell3 should contain 34 when calling 'ref(a2)*ref(b4) as input`, () => {
            const cell1: ICells = grid.getSingleCell(1, 0);
            const cell2: ICells = grid.getSingleCell(3, 1);
            const cell3: ICells = grid.getSingleCell(2, 1);
            cell1.setData(2);
            cell2.setData(17);
            cell3.setState(`ref(a2)*ref(b4)`);
            Parser.runCellState(cell3);

            expect(cell3.getValue()).toEqual(34);
        });

        it(`cell3 should contain 4 when calling 'ref(a2)/ref(b4) as input`, () => {
            const cell1: ICells = grid.getSingleCell(1, 0);
            const cell2: ICells = grid.getSingleCell(3, 1);
            const cell3: ICells = grid.getSingleCell(2, 1);
            cell1.setData(12);
            cell2.setData(3);
            cell3.setState(`ref(a2)/ref(b4)`);
            Parser.runCellState(cell3);

            expect(cell3.getValue()).toEqual(4);
        });

        it(`cell3 should contain 34 when calling 'ref(a2)^ref(b4) as input`, () => {
            const cell1: ICells = grid.getSingleCell(1, 0);
            const cell2: ICells = grid.getSingleCell(3, 1);
            const cell3: ICells = grid.getSingleCell(2, 1);
            cell1.setData(4);
            cell2.setData(3);
            cell3.setState(`ref(a2)^ref(b4)`);
            Parser.runCellState(cell3);

            expect(cell3.getValue()).toEqual(64);
        });
    });

    // sum (e.g: sum(b2..c4))
    describe('sum', () => {
        it(`finalCell should contain 118 when calling 'sum(a1..b5)' as input`, () => {
            const cell1: ICells = grid.getSingleCell(0, 0);
            const cell2: ICells = grid.getSingleCell(1, 0);
            const cell3: ICells = grid.getSingleCell(2, 0);
            const cell4: ICells = grid.getSingleCell(3, 0);
            const cell5: ICells = grid.getSingleCell(4, 0);
            const cell6: ICells = grid.getSingleCell(0, 1);
            const cell7: ICells = grid.getSingleCell(1, 1);
            const cell8: ICells = grid.getSingleCell(2, 1);
            const cell9: ICells = grid.getSingleCell(3, 1);
            const cell10: ICells = grid.getSingleCell(4, 1);

            const finalCell: ICells = grid.getSingleCell(3, 7);
            
            cell1.setData(1);
            cell2.setData(2);
            cell3.setData(5);
            cell4.setData(3);
            cell5.setData(7);
            cell6.setData(5);
            cell7.setData(3);
            cell8.setData(2);
            cell9.setData(2);
            cell10.setData(88);

            finalCell.setState(`sum(a1..b5)`);
            Parser.runCellState(finalCell);

            expect(finalCell.getValue()).toEqual(118);
        });

        it(`finalCell should contain -190 when calling 'sum(a1..b5)' as input`, () => {
            const cell1: ICells = grid.getSingleCell(0, 0);
            const cell2: ICells = grid.getSingleCell(1, 0);
            const cell3: ICells = grid.getSingleCell(2, 0);
            const cell4: ICells = grid.getSingleCell(3, 0);
            const cell5: ICells = grid.getSingleCell(4, 0);
            const cell6: ICells = grid.getSingleCell(0, 1);
            const cell7: ICells = grid.getSingleCell(1, 1);
            const cell8: ICells = grid.getSingleCell(2, 1);
            const cell9: ICells = grid.getSingleCell(3, 1);
            const cell10: ICells = grid.getSingleCell(4, 1);

            const finalCell: ICells = grid.getSingleCell(3, 7);
            
            cell1.setData(-43);
            cell2.setData(-4);
            cell3.setData(-3);
            cell4.setData(-34);
            cell5.setData(-4);
            cell6.setData(-1);
            cell7.setData(-6);
            cell8.setData(-2);
            cell9.setData(-5);
            cell10.setData(-88);

            finalCell.setState(`sum(a1..b5)`);
            Parser.runCellState(finalCell);

            expect(finalCell.getValue()).toEqual(-190);
        });

        it(`finalCell should contain 342.02 when calling 'sum(a1..b5)' as input`, () => {
            const cell1: ICells = grid.getSingleCell(0, 0);
            const cell2: ICells = grid.getSingleCell(1, 0);
            const cell3: ICells = grid.getSingleCell(2, 0);
            const cell4: ICells = grid.getSingleCell(3, 0);
            const cell5: ICells = grid.getSingleCell(4, 0);
            const cell6: ICells = grid.getSingleCell(0, 1);
            const cell7: ICells = grid.getSingleCell(1, 1);
            const cell8: ICells = grid.getSingleCell(2, 1);
            const cell9: ICells = grid.getSingleCell(3, 1);
            const cell10: ICells = grid.getSingleCell(4, 1);

            const finalCell: ICells = grid.getSingleCell(3, 7);
            
            cell1.setData(5.7);
            cell2.setData(8.6);
            cell3.setData(9.0);
            cell4.setData(2.22);
            cell5.setData(91.1);
            cell6.setData(106.7);
            cell7.setData(4.4);
            cell8.setData(2.2);
            cell9.setData(23.22);
            cell10.setData(88.88);

            finalCell.setState(`sum(a1..b5)`);
            Parser.runCellState(finalCell);

            expect(finalCell.getValue()).toEqual(342.02);
        });
    });

    // average (e.g: sum(b2..c4))
    describe('average', () => {
        it(`finalCell should contain 11.8 when calling 'avg(a1..b5)' as input`, () => {
            const cell1: ICells = grid.getSingleCell(0, 0);
            const cell2: ICells = grid.getSingleCell(1, 0);
            const cell3: ICells = grid.getSingleCell(2, 0);
            const cell4: ICells = grid.getSingleCell(3, 0);
            const cell5: ICells = grid.getSingleCell(4, 0);
            const cell6: ICells = grid.getSingleCell(0, 1);
            const cell7: ICells = grid.getSingleCell(1, 1);
            const cell8: ICells = grid.getSingleCell(2, 1);
            const cell9: ICells = grid.getSingleCell(3, 1);
            const cell10: ICells = grid.getSingleCell(4, 1);

            const finalCell: ICells = grid.getSingleCell(3, 7);
            
            cell1.setData(1);
            cell2.setData(2);
            cell3.setData(5);
            cell4.setData(3);
            cell5.setData(7);
            cell6.setData(5);
            cell7.setData(3);
            cell8.setData(2);
            cell9.setData(2);
            cell10.setData(88);

            finalCell.setState(`avg(a1..b5)`);
            Parser.runCellState(finalCell);

            expect(finalCell.getValue()).toEqual(11.8);
        });

        it(`finalCell should contain -19 when calling 'avg(a1..b5)' as input`, () => {
            const cell1: ICells = grid.getSingleCell(0, 0);
            const cell2: ICells = grid.getSingleCell(1, 0);
            const cell3: ICells = grid.getSingleCell(2, 0);
            const cell4: ICells = grid.getSingleCell(3, 0);
            const cell5: ICells = grid.getSingleCell(4, 0);
            const cell6: ICells = grid.getSingleCell(0, 1);
            const cell7: ICells = grid.getSingleCell(1, 1);
            const cell8: ICells = grid.getSingleCell(2, 1);
            const cell9: ICells = grid.getSingleCell(3, 1);
            const cell10: ICells = grid.getSingleCell(4, 1);

            const finalCell: ICells = grid.getSingleCell(3, 7);
            
            cell1.setData(-43);
            cell2.setData(-4);
            cell3.setData(-3);
            cell4.setData(-34);
            cell5.setData(-4);
            cell6.setData(-1);
            cell7.setData(-6);
            cell8.setData(-2);
            cell9.setData(-5);
            cell10.setData(-88);

            finalCell.setState(`avg(a1..b5)`);
            Parser.runCellState(finalCell);

            expect(finalCell.getValue()).toEqual(-19);
        });

        it(`finalCell should contain 34.202 when calling 'avg(a1..b5)' as input`, () => {
            const cell1: ICells = grid.getSingleCell(0, 0);
            const cell2: ICells = grid.getSingleCell(1, 0);
            const cell3: ICells = grid.getSingleCell(2, 0);
            const cell4: ICells = grid.getSingleCell(3, 0);
            const cell5: ICells = grid.getSingleCell(4, 0);
            const cell6: ICells = grid.getSingleCell(0, 1);
            const cell7: ICells = grid.getSingleCell(1, 1);
            const cell8: ICells = grid.getSingleCell(2, 1);
            const cell9: ICells = grid.getSingleCell(3, 1);
            const cell10: ICells = grid.getSingleCell(4, 1);

            const finalCell: ICells = grid.getSingleCell(3, 7);
            
            cell1.setData(5.7);
            cell2.setData(8.6);
            cell3.setData(9.0);
            cell4.setData(2.22);
            cell5.setData(91.1);
            cell6.setData(106.7);
            cell7.setData(4.4);
            cell8.setData(2.2);
            cell9.setData(23.22);
            cell10.setData(88.88);

            finalCell.setState(`avg(a1..b5)`);
            Parser.runCellState(finalCell);

            expect(finalCell.getValue()).toEqual(34.202);
        });
    });
})