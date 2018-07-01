import { Matrix, MatrixData } from '../Matrix';
import { VectorBuilder } from './VectorBuilder';
import { Vector } from '../Vector';

export class MatrixBuilder {
  static empty() {
    return Matrix.fromData([]);
  }

  static zeros(numberOfRows: number, numberOfColumns: number = numberOfRows): Matrix {
    const columns: Array<Vector> = [];
    for (let i = 0; i < numberOfColumns; i++) {
      columns.push(VectorBuilder.zeros(numberOfRows));
    }
    return Matrix.fromColumnVectors(columns);
  }

  static ones(numberOfRows: number, numberOfColumns: number = numberOfRows): Matrix {
    const columns: Array<Vector> = [];
    for (let i = 0; i < numberOfColumns; i++) {
      columns.push(VectorBuilder.ones(numberOfRows));
    }
    return Matrix.fromColumnVectors(columns);
  }

  static identity(size: number): Matrix {
    if (size < 0) {
      throw Error();
    }

    const columns: Array<Vector> = [];
    for (let i = 0; i < size; i++) {
      columns.push(VectorBuilder.elementaryVector(size, i));
    }
    return Matrix.fromColumnVectors(columns);
  }

  static diagonal(diagonalEntries: Vector): Matrix {
    const numEntries = diagonalEntries.getDimension();
    return Matrix.fromColumnVectors(
      diagonalEntries
        .getData()
        .map((entry, i) => VectorBuilder.elementaryVector(numEntries, i).scalarMultiply(entry))
    );
  }

  static augment(left: Matrix, right: Matrix): Matrix {
    if (left.getNumberOfRows() !== right.getNumberOfRows()) {
      throw Error('Dimension mismatch!');
    }

    const rightRows = right.getRowVectors();
    return Matrix.fromRowVectors(
      left.getRowVectors().map((leftRow, i) => VectorBuilder.concatenate(leftRow, rightRows[i]))
    );
  }

  private static stack(top: Matrix, bottom: Matrix): Matrix {
    if (top.getNumberOfColumns() !== bottom.getNumberOfColumns()) {
      throw Error('Dimension mismatch!');
    }

    const left = top.transpose();
    const right = bottom.transpose();
    return MatrixBuilder.augment(left, right).transpose();
  }

  static flatten(grid: Array<Array<Matrix>>): Matrix {
    if (grid.length === 0 || grid[0].length === 0) {
      return MatrixBuilder.empty();
    }

    const rowsAsMatrices: Array<Matrix> = grid.map(gridRow => {
      return gridRow.reduce((accumulator: Matrix, gridEntry: Matrix) => {
        return MatrixBuilder.augment(accumulator, gridEntry);
      });
    });

    return rowsAsMatrices.reduce((accumulator: Matrix, row: Matrix) => {
      return MatrixBuilder.stack(accumulator, row);
    });
  }

  static repeat(matrix: Matrix, rows: number, columns: number) {
    const grid: Array<Array<Matrix>> = [];

    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < columns; j++) {
        grid[i][j] = matrix;
      }
    }

    return MatrixBuilder.flatten(grid);
  }

  static slice(
    matrix: Matrix,
    rowStartIndex: number = 0,
    columnStartIndex: number = 0,
    rowEndIndex: number = matrix.getNumberOfRows(),
    columnEndIndex: number = matrix.getNumberOfColumns()
  ): Matrix {
    if (rowStartIndex > rowEndIndex || columnStartIndex > columnEndIndex) {
      throw Error('start index must be less than end index');
    }

    if (rowStartIndex < 0 || columnStartIndex < 0) {
      throw Error('indices must be positive');
    }

    if (rowEndIndex > matrix.getNumberOfRows() || columnEndIndex > matrix.getNumberOfColumns()) {
      throw Error('index out of bounds');
    }

    const data: MatrixData = [];
    let newRowIndex = 0;
    for (let i = rowStartIndex; i < rowEndIndex; i++) {
      data[newRowIndex] = [];
      let newColumnIndex = 0;
      for (let j = columnStartIndex; j < columnEndIndex; j++) {
        data[newRowIndex][newColumnIndex] = matrix.getEntry(i, j);
        newColumnIndex++;
      }
      newRowIndex++;
    }

    return Matrix.fromData(data);
  }
}