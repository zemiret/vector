import { describe, it } from "mocha";
import { expect } from "chai";
import { Vector } from "./Vector";
import { Matrix } from "./Matrix";

describe("Matrix", () => {
  describe("constructors", () => {
    const data = [[1, 2, 3], [2, 2, 1], [5, 2, 9]];

    it("can be constructed from a 2d array", () => {
      expect(Matrix.fromData(data).getData()).to.deep.equal(data);
    });

    it("can be constructed from column vectors", () => {
      const firstColumn = Vector.fromValues(1, 2, 5);
      const secondColumn = Vector.fromValues(2, 2, 2);
      const thirdColumn = Vector.fromValues(3, 1, 9);

      expect(
        Matrix.fromColumnVectors([firstColumn, secondColumn, thirdColumn]).getData()
      ).to.deep.equal(data);
    });

    it("can be constructed from row vectors", () => {
      const firstRow = Vector.fromArray(data[0]);
      const secondRow = Vector.fromArray(data[1]);
      const thirdRow = Vector.fromArray(data[2]);

      expect(Matrix.fromRowVectors([firstRow, secondRow, thirdRow]).getData()).to.deep.equal(data);
    });

    it("handles degenerate cases", () => {
      // 0x0
      expect(Matrix.fromData([]).getData()).to.deep.equal([]);
      // Nx0
      expect(Matrix.fromData([[], [], []]).getData()).to.deep.equal([]);
      // 0xM
      expect(Matrix.fromRowVectors([]).getData()).to.deep.equal([]);
      // Nx0
      expect(Matrix.fromColumnVectors([]).getData()).to.deep.equal([]);
    });

    it("rejects non-rectangular data", () => {
      const badData = [[0], [0, 0], [0, 0, 0]];
      expect(() => Matrix.fromData(badData)).to.throw();

      const badVectorData = [
        Vector.fromValues(0),
        Vector.fromValues(0, 0),
        Vector.fromValues(0, 0, 0)
      ];
      expect(() => Matrix.fromColumnVectors(badVectorData)).to.throw();
      expect(() => Matrix.fromRowVectors(badVectorData)).to.throw();
    });
  });

  describe("getDimension", () => {
    it("returns the dimension of the matrix", () => {
      expect(Matrix.fromData([]).getDimension()).to.equal(0);
      expect(Matrix.fromData([[1]]).getDimension()).to.equal(1);
      expect(Matrix.fromData([[1, 0]]).getDimension()).to.equal(2);
      expect(Matrix.fromData([[1], [0]]).getDimension()).to.equal(2);
      expect(Matrix.fromData([[1, 0], [0, 1]]).getDimension()).to.equal(4);
    });
  });

  describe("multiply", () => {
    it("returns the product of two matrices of equal dimension", () => {
      const I = Matrix.fromData([[1, 0], [0, 1]]);
      const A = Matrix.fromData([[1, 2], [3, 4]]);
      const B = Matrix.fromData([[2, 3], [4, 5]]);

      expect(A.multiply(A).getData()).to.deep.equal([[7, 10], [15, 22]]);
      expect(A.multiply(B).getData()).to.deep.equal([[10, 13], [22, 29]]);
      expect(A.multiply(I).getData()).to.deep.equal(A.getData());
      expect(B.multiply(A).getData()).to.deep.equal([[11, 16], [19, 28]]);
      expect(B.multiply(B).getData()).to.deep.equal([[16, 21], [28, 37]]);
      expect(B.multiply(I).getData()).to.deep.equal(B.getData());
      expect(I.multiply(A).getData()).to.deep.equal(A.getData());
      expect(I.multiply(B).getData()).to.deep.equal(B.getData());
      expect(I.multiply(I).getData()).to.deep.equal(I.getData());
    });

    it("returns the product of two matrices of unequal dimension", () => {
      const A = Matrix.fromData([[1, 2, 3, 4]]);
      const B = Matrix.fromData([[1], [2], [3], [4]]);

      expect(A.multiply(B).getData()).to.deep.equal([[30]]);
      expect(B.multiply(A).getData()).to.deep.equal([
        [1, 2, 3, 4],
        [2, 4, 6, 8],
        [3, 6, 9, 12],
        [4, 8, 12, 16]
      ]);
    });

    it("throws an error when the dimensions are not compatible", () => {
      const A = Matrix.fromData([[1, 0], [0, 1]]);
      const B = Matrix.fromData([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
      expect(() => A.multiply(B)).to.throw();
    });

    it("handles the degenerate case", () => {
      expect(
        Matrix.fromData([])
          .multiply(Matrix.fromData([]))
          .getData()
      ).to.deep.equal([]);
    });
  });

  describe("transpose", () => {
    it("returns the transpose of a matrix", () => {
      const A = Matrix.fromData([[1, 2, 3], [4, 5, 6]]);
      const B = Matrix.fromData([[1, 4], [2, 5], [3, 6]]);
      expect(A.transpose().equals(B)).to.be.true;
      expect(B.transpose().equals(A)).to.be.true;
    });

    it("handles the degenerate case", () => {
      const E = Matrix.fromData([]);
      expect(
        Matrix.fromData([])
          .transpose()
          .getData()
      ).to.deep.equal([]);
    });
  });

  describe("add", () => {
    it("adds two matrices of equal dimension", () => {
      const A = Matrix.fromData([[1, 2, 3], [4, 5, 6]]);
      const B = Matrix.fromData([[2, 3, 4], [5, 6, 7]]);

      expect(A.add(B).getData()).to.deep.equal([[3, 5, 7], [9, 11, 13]]);
    });

    it("throws an error when the dimensions do not match", () => {
      const A = Matrix.fromData([[1, 2, 3], [4, 5, 6]]);
      const B = Matrix.fromData([[2, 3], [5, 6]]);

      expect(() => A.add(B)).to.throw();
    });

    it("handles the degenerate case", () => {
      expect(
        Matrix.fromData([])
          .add(Matrix.fromData([]))
          .getData()
      ).to.deep.equal([]);
    });
  });

  describe("apply", () => {
    it("transforms a vector with the correct dimension", () => {
      const I = Matrix.fromData([[1, 0], [0, 1]]);
      const A = Matrix.fromData([[1, 2], [3, 4]]);
      const x = Vector.fromValues(1, 2);

      expect(I.apply(x).getData()).to.deep.equal(x.getData());
      expect(A.apply(x).getData()).to.deep.equal([5, 11]);
    });

    it("throws an error when the dimensions are not compatible", () => {
      const A = Matrix.fromData([[1, 2], [3, 4]]);
      const x = Vector.fromValues(1, 2, 3);
      expect(() => A.apply(x)).to.throw();
    });
  });
});