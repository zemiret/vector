import { NumberMatrix, NumberVector, VectorIndexFunction } from '..';

/**
 * Builds a vector of `binCount` evenly spaces numbers between `xMin` (inclusive) and `xMax` (exclusive).
 * Throws an error if xMin is greater than or equal to xMax.
 *
 * ```
 * linspace(0, 1, 5); // [ 0, 0.2, 0.4, 0.6, 0.8 ]
 * ```
 *
 * @param {number} xMin  The smallest value in the vector
 * @param {number} xMax  The largest value in the vector
 * @param {number} binCount  The number of entries
 * @returns {Vector<number>}
 */
export function linspace(xMin: number, xMax: number, binCount: number): NumberVector {
  if (xMin >= xMax) {
    throw Error('TODO - message');
  }

  if (binCount < 0) {
    throw Error('TODO - message');
  }

  const indexToX: VectorIndexFunction<number> = index => {
    return xMin + ((xMax - xMin) / binCount) * index;
  };

  return NumberVector.builder().fromIndexFunction(binCount, indexToX);
}

/**
 * Builds a matrix that calculates an approximate derivative scaled by the difference
 * when applied to a vector of function values, using a forward difference:
 *
 * _f(x + delta) - f(x)_
 *
 * ```
 * forwardDifferenceMatrix(4);
 *
 * // [ -1  1  0  0 ]
 * // [  0 -1  1  0 ]
 * // [  0  0 -1  1 ]
 * // [  0  0  0 -1 ]
 * ```
 * @param {number} binCount  The size of the vector to which the output ought to be applied
 * @returns {Matrix<number>}
 */
export function forwardDifferenceMatrix(binCount: number): NumberMatrix {
  return NumberMatrix.builder().tridiagonal(
    NumberVector.builder().zeros(binCount - 1),
    NumberVector.builder()
      .ones(binCount)
      .scalarMultiply(-1),
    NumberVector.builder().ones(binCount - 1)
  );
}

/**
 * Builds a matrix that calculates an approximate derivative scaled by the difference
 * when applied to a vector of function values, using a backward difference:
 *
 * _f(x) - f(x - delta)_
 *
 * ```
 * backwardDifferenceMatrix(4);
 *
 * // [  1  0  0  0 ]
 * // [ -1  1  0  0 ]
 * // [  0 -1  1  0 ]
 * // [  0  0 -1  1 ]
 * ```
 * @param {number} binCount  The size of the vector to which the output ought to be applied
 * @returns {Matrix<number>}
 */
export function backwardDifferenceMatrix(binCount: number): NumberMatrix {
  return NumberMatrix.builder().tridiagonal(
    NumberVector.builder()
      .ones(binCount - 1)
      .scalarMultiply(-1),
    NumberVector.builder().ones(binCount),
    NumberVector.builder().zeros(binCount - 1)
  );
}

/**
 * Builds a matrix that calculates an approximate derivative scaled by the difference
 * when applied to a vector of function values, using a central difference:
 *
 * _f(x - delta)/2 - f(x + delta)/2_
 *
 * _= 1/2 * (forwardDifference + backwardDifference)_
 *
 * ```
 * centralDifferenceMatrix(4);
 *
 * // [   0   1/2   0    0  ]
 * // [ -1/2   0   1/2   0  ]
 * // [   0  -1/2   0   1/2 ]
 * // [   0    0  -1/2   0  ]
 * ```
 * @param {number} binCount  The size of the vector to which the output ought to be applied
 * @returns {Matrix<number>}
 */
export function centralDifferenceMatrix(binCount: number): NumberMatrix {
  return NumberMatrix.builder().tridiagonal(
    NumberVector.builder()
      .ones(binCount - 1)
      .scalarMultiply(-1 / 2),
    NumberVector.builder().zeros(binCount),
    NumberVector.builder()
      .ones(binCount - 1)
      .scalarMultiply(1 / 2)
  );
}

/**
 * Uses finite differences to build a vector containing approximate values of the derivative of `f`.
 *
 * ```
 * // Approximates Math.cos at 100 points between 0 and 2*PI
 * derivative(Math.sin, 0, 2*Math.PI, 100);
 * ```
 *
 * @param {(x: number) => number} f  A deterministic function with no side effects
 * @param {number} xMin  The minimum value for which the derivative will be approximated
 * @param {number} xMax  The maximum (exclusive) value for which the derivative will be approximated
 * @param {number} binCount  The number of approximations
 * @returns {Vector<number>}
 */
export function derivative(f: (x: number) => number, xMin: number, xMax: number, binCount: number) {
  const x = linspace(xMin, xMax, binCount);
  const y = NumberVector.builder().map(x, f);
  const delta = x.getEntry(1) - x.getEntry(0);

  const D = centralDifferenceMatrix(binCount);
  return D.apply(y).scalarMultiply(1 / delta);
}
