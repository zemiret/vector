import { assertValidDimension, assertValidIndex } from '../../utilities/ErrorAssertions';
import { ScalarOperations } from '../scalar/ScalarOperations';
import { SparseVectorData } from './SparseVector';
import { Vector, VectorConstructor, VectorData } from './Vector';
import { mod } from '../../utilities/NumberUtilities';

export type VectorIndexFunction<ScalarType> = (index: number) => ScalarType;
export type VectorEntryFunction<ScalarType> = (entry: ScalarType, index: number) => ScalarType;

export class VectorBuilder<ScalarType, VectorType extends Vector<ScalarType>> {
  private readonly _vectorConstructor: VectorConstructor<ScalarType, VectorType>;

  constructor(vectorConstructor: VectorConstructor<ScalarType, VectorType>) {
    this._vectorConstructor = vectorConstructor;
  }

  public fromValues(...data: VectorData<ScalarType>): VectorType {
    return this.fromData(data);
  }

  public fromData(data: VectorData<ScalarType>): VectorType {
    return new this._vectorConstructor(data);
  }

  public fromSparseData(dimension: number, sparseData: SparseVectorData<ScalarType>): VectorType {
    const data: VectorData<ScalarType> = [];
    for (let i = 0; i < dimension; i++) {
      data[i] = this.ops().zero();
    }
    sparseData.forEach((value, index) => {
      data[index] = value;
    });
    return this.fromData(data);
  }

  /**
   * Builds a vector with entries given by _entry = f(i)_ where _f_ is `valueFromIndex`
   * and `i` is the index of the element
   *
   * ```
   * vectorBuilder.fromIndexFunction(4, i => i + 3); // [ 3 4 5 6 ]
   * ```
   * @param dimension - The dimension of the vector to generate
   * @param valueFromIndex - A function returning the entry for a given index
   * @returns The new vector
   */
  public fromIndexFunction(
    dimension: number,
    valueFromIndex: VectorIndexFunction<ScalarType>
  ): VectorType {
    assertValidDimension(dimension);
    const data: VectorData<ScalarType> = [];
    for (let i = 0; i < dimension; i++) {
      data[i] = valueFromIndex(i);
    }
    return this.fromData(data);
  }

  /**
   * Builds a vector by transforming the values of another vector.
   *
   * ```
   * const original = vectorBuilder.fromValues(1, 2, 3, 4);
   *
   * const originalPlusOne = vectorBuilder.map(original, (value) => value + 1);
   * // [2, 3, 4, 5]
   *
   * const originalPlusIndex = vectorBuilder.map(original, (value, index) => value + index);
   * // [1, 3, 5, 7]
   * ```
   * @param vector - The vector on whose entries to base the entries of the new vector
   * @param valueFromEntry - A function which takes an entry of
   *     the original vector and its index, and returns the corresponding entry of the new vector
   * @returns The new vector
   */
  public map(
    vector: Vector<ScalarType>,
    valueFromEntry: VectorEntryFunction<ScalarType>
  ): VectorType {
    return this.fromData(vector.getData().map(valueFromEntry));
  }

  /**
   * Builds a Vector of dimension 0
   *
   * ```
   * vectorBuilder.empty(); // []
   * ```
   *
   * @returns The new vector
   */
  public empty(): VectorType {
    return this.fromData([]);
  }

  /**
   * Builds a vector whose entries are all equal to the provided value
   *
   * ```
   * vectorBuilder.fill(3, 5); // [ 3 3 3 3 3 ]
   * ```
   *
   * @param value - The value to use as the entries of the new vector
   * @param dimension - The dimension of the new vector
   * @returns The new vector
   */
  public fill(value: ScalarType, dimension: number): VectorType {
    assertValidDimension(dimension);
    return this.fromIndexFunction(dimension, () => value);
  }

  /**
   * Builds a vector of all zeros
   *
   * ```
   * vectorBuilder.zeros(3); // [ 0 0 0 ]
   * ```
   * @param dimension - The dimension of the vector to construct
   * @returns The new vector
   */
  public zeros(dimension: number): VectorType {
    return this.fill(this.ops().zero(), dimension);
  }

  /**
   * Builds a vector of all ones
   *
   * ```
   * vectorBuilder.ones(3); // [ 1 1 1 ]
   * ```
   * @param dimension - The dimension of the new vector
   * @returns The new vector
   */
  public ones(dimension: number): VectorType {
    return this.fill(this.ops().one(), dimension);
  }

  /**
   * Builds a vector that has the value 1 at one index, and 0 at the others
   *
   * ```
   * vectorBuilder.elementaryVector(4, 2); // [ 0 0 1 0 ]
   * vectorBuilder.elementaryVector(3, 0); // [ 1 0 0 ]
   * ```
   * @param dimension - The dimension of the new vector
   * @param oneIndex - The index of the element that should be the multiplicative identity
   * @returns The new vector
   */
  public elementaryVector(dimension: number, oneIndex: number): VectorType {
    assertValidDimension(dimension);
    assertValidIndex(oneIndex, dimension);
    return this.fromIndexFunction(dimension, i =>
      i === oneIndex ? this.ops().one() : this.ops().zero()
    );
  }

  /**
   * Builds a vector whose entries match the input vector, but offset by a given amount
   *
   * ```
   * const original = vectorBuilder.fromData([1, 2, 3]);
   * const rightOne = vectorBuilder.rotate(original); // [2, 3, 1];
   * const rightTwo = vectorBuilder.rotate(original, 2); // [3, 1, 2];
   * const leftOne = vectorBuilder.rotate(original, 1, true); // [3, 1, 2];
   * ```
   *
   * @param vector - The vector whose entries to use
   * @param offset - The amount by which to shift the indices
   * @param reverse - Shift entries backward rather than forward
   */
  public rotate(
    vector: Vector<ScalarType>,
    offset: number = 1,
    reverse: boolean = false
  ): VectorType {
    const dim = vector.getDimension();
    return this.fromIndexFunction(dim, i => {
      const indexToUse = mod(reverse ? i - offset : i + offset, dim);
      return vector.getEntry(indexToUse);
    });
  }

  /**
   * Builds a vector whose entries are (uniformly-distributed) random numbers
   * between `min` and `max`
   *
   * @param dimension - The dimension of the new vector
   * @param min - The lower limit of the random numbers to include
   * @param max - The upper limit of the random numbers to include
   */
  public random(dimension: number, min: number = 0, max: number = 1): VectorType {
    if (min >= max) {
      throw Error('TODO - message');
    }
    return this.fromIndexFunction(dimension, () => this.ops().random(min, max));
  }

  /**
   * Builds a vector whose entries are normally distributed, with the specified
   * mean and standard deviation
   *
   * @param dimension - The dimension of the new vector
   * @param mean - The center of the distribution of random numbers to include
   * @param standardDeviation - The standard deviation of the distribution of random numbers to include
   */
  public randomNormal(
    dimension: number,
    mean: number = 0,
    standardDeviation: number = 1
  ): VectorType {
    if (standardDeviation <= 0) {
      throw Error('TODO - message');
    }
    return this.fromIndexFunction(dimension, () =>
      this.ops().randomNormal(mean, standardDeviation)
    );
  }

  /**
   * Builds a vector consisting of two vectors end-to-end
   *
   * ```
   * const first = vectorBuilder.ones(3);
   * const second = vectorBuilder.zeros(2);
   *
   * vectorBuilder.concatenate(first, second); // [ 1 1 1 0 0 ]
   * ```
   * @param first - The vector which will be used for the entries starting with index 0
   * @param second - The vector which will be used for the entries starting with `first.getDimension()`
   * @returns The new vector
   */
  public concatenate(first: VectorType, second: VectorType): VectorType {
    return this.fromData([...first.getData(), ...second.getData()]);
  }

  private ops(): ScalarOperations<ScalarType> {
    return this._vectorConstructor.ops();
  }
}
