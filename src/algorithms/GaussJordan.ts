import { Matrix } from '../types/matrix/Matrix';
import { Vector } from '../types/vector/Vector';
import { assertSquare } from '../utilities/ErrorAssertions';
import { LinearSolution } from './LinearSolution';
import { addScalarMultipleOfRowToRow, multiplyRowByScalar, pivot } from './RowOperations';
import { backwardSubstituteAugmentedMatrix } from './Substitution';

// TODO - use pivoting to improve numerical stability

/**
 * Uses Gauss-Jordan elimination with pivoting and backward substitution
 * to solve the linear equation _Ax=b_
 *
 * @param A - The matrix _A_ in _Ax=b_
 * @param b - The vector _b_ in _Ax=b_
 * @returns The vector _x_ in _Ax=b_
 */
export function solveByGaussianElimination<S>(A: Matrix<S>, b: Vector<S>): LinearSolution<S> {
  const augmented = A.builder().augment(A, A.builder().fromColumnVectors([b]));
  const ref = rowEchelonForm(augmented);
  return backwardSubstituteAugmentedMatrix(ref);
}

/**
 * Uses Gauss-Jordan elimination with pivoting to calculate the inverse of a matrix.
 * Throws an error if the matrix is not square.
 * Returns `undefined` if the matrix is not invertible.
 *
 * @param matrix - A square matrix
 * @returns The inverse matrix
 */
export function inverse<S>(matrix: Matrix<S>): Matrix<S> | undefined {
  assertSquare(matrix);
  const dim = matrix.getNumberOfRows();
  const I = matrix.builder().identity(dim);

  const augmented = matrix.builder().augment(matrix, I);
  const rref = reducedRowEchelonForm(augmented);

  const left = matrix.builder().slice(rref, 0, 0, dim, dim);
  const right = matrix.builder().slice(rref, 0, dim);

  if (left.equals(I)) {
    return right;
  } else {
    // Not invertible
    return undefined;
  }
}

/**
 * Uses Gauss-Jordan elimination with pivoting to convert a matrix to Reduced Row-Echelon Form (RREF)
 *
 * @param matrix - The input matrix
 * @returns The matrix in RREF
 */
export function reducedRowEchelonForm<S>(matrix: Matrix<S>): Matrix<S> {
  matrix = rowEchelonForm(matrix);

  const maxNumberOfPivotEntries = Math.min(matrix.getNumberOfColumns(), matrix.getNumberOfRows());
  for (let pivotRow = maxNumberOfPivotEntries - 1; pivotRow >= 0; pivotRow--) {
    const pivotColumn = matrix
      .getRow(pivotRow)
      .getData()
      .indexOf(matrix.ops().one());
    if (pivotColumn === -1) {
      continue;
    }
    matrix = clearEntriesAbove(matrix, pivotRow, pivotColumn);
  }

  return matrix;
}

/**
 * Uses Gauss-Jordan elimination with pivoting to convert a matrix to Row-Echelon Form (REF)
 *
 * @param matrix - The input matrix
 * @returns The matrix in REF
 */
export function rowEchelonForm<S>(matrix: Matrix<S>): Matrix<S> {
  const ops = matrix.ops();
  const maxNumberOfPivotEntries = Math.min(matrix.getNumberOfRows(), matrix.getNumberOfColumns());

  for (let pivotRow = 0; pivotRow < maxNumberOfPivotEntries; pivotRow++) {
    matrix = pivot(matrix).result;
    let pivotColumn = pivotRow;
    let pivotEntry = matrix.getEntry(pivotRow, pivotColumn);

    while (ops.equals(pivotEntry, ops.zero()) && pivotColumn < matrix.getNumberOfColumns() - 1) {
      pivotEntry = matrix.getEntry(pivotRow, ++pivotColumn);
    }

    if (ops.equals(pivotEntry, ops.zero())) {
      continue;
    }

    if (!ops.equals(pivotEntry, ops.zero())) {
      // cast from S|undefined to S, since pivotEntry is not 0
      const pivotInverse = ops.getMultiplicativeInverse(pivotEntry) as S;
      matrix = multiplyRowByScalar(matrix, pivotRow, pivotInverse);
    }

    matrix = clearEntriesBelow(matrix, pivotRow, pivotColumn);
  }

  return matrix;
}

/**
 * Uses elementary row operations to clear all entries below the given pivot entry.
 * Throws an error of the necessary preconditions are not met - i.e. if the pivot entry
 * is not 1, or the pivot row is not cleared to the left.
 */
function clearEntriesBelow<S>(matrix: Matrix<S>, pivotRow: number, pivotColumn: number): Matrix<S> {
  checkPreconditionsForClearingBelow(matrix, pivotRow, pivotColumn);
  const ops = matrix.ops();

  for (let rowIndex = pivotRow + 1; rowIndex < matrix.getNumberOfRows(); rowIndex++) {
    const entry = matrix.getEntry(rowIndex, pivotColumn);
    if (ops.equals(entry, ops.zero())) {
      continue;
    }

    matrix = addScalarMultipleOfRowToRow(matrix, rowIndex, pivotRow, ops.getAdditiveInverse(entry));
  }

  return matrix;
}

/**
 * Throws an error if the row reduction algorithm prematurely attempts to
 * clear the entries below a pivot column.
 */
function checkPreconditionsForClearingBelow<S>(
  matrix: Matrix<S>,
  pivotRow: number,
  pivotColumn: number
): void {
  const ops = matrix.ops();
  // The pivot entry should be 1
  if (!ops.equals(matrix.getEntry(pivotRow, pivotColumn), ops.one())) {
    throw Error('Not ready yet!');
  }

  // Values to the left of the pivot should be 0
  for (let i = 0; i < pivotColumn - 1; i++) {
    if (!ops.equals(matrix.getEntry(pivotRow, i), ops.zero())) {
      throw Error('Not ready yet!');
    }
  }
}

/**
 * Uses elementary row operations to clear the entries above a pivot entry.
 * Throws an error if the necessary preconditions are not met - i.e. if the
 * pivot entry is not 1 or the pivot row is not cleared to the left and the right.
 */
function clearEntriesAbove<S>(matrix: Matrix<S>, pivotRow: number, pivotColumn: number): Matrix<S> {
  checkPreconditionsForClearingAbove(matrix, pivotRow, pivotColumn);
  const ops = matrix.ops();

  for (let rowIndex = pivotRow - 1; rowIndex >= 0; rowIndex--) {
    const entry = matrix.getEntry(rowIndex, pivotColumn);
    if (ops.equals(entry, ops.zero())) {
      continue;
    }

    matrix = addScalarMultipleOfRowToRow(matrix, rowIndex, pivotRow, ops.getAdditiveInverse(entry));
  }
  return matrix;
}

/**
 * Throws an error if the row reduction algorithm prematurely attempts to
 * clear the entries above a pivot entry.
 */
function checkPreconditionsForClearingAbove<S>(
  matrix: Matrix<S>,
  pivotRow: number,
  pivotColumn: number
): void {
  const ops = matrix.ops();

  // Values to the left and of the pivot should be 0; the pivot should be 1
  for (let i = 0; i < pivotColumn; i++) {
    const entry = matrix.getEntry(pivotRow, i);

    if (!ops.equals(entry, ops.zero())) {
      throw Error('Not ready yet!');
    }
  }

  if (!ops.equals(matrix.getEntry(pivotRow, pivotColumn), ops.one())) {
    throw Error('Not ready yet!');
  }
}
