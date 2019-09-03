import { expect } from 'chai';
import { describe, it } from 'mocha';
import { mat, vec } from '../utilities/aliases';
import { ComplexMatrix } from '../types/matrix/ComplexMatrix';
import { ComplexNumber } from '../types/scalar/ComplexNumber';
import { calculateEigenvalues, eig, getEigenvectorForEigenvalue } from './Eigenvalues';

describe('Eigenvalues', () => {
  describe('eig', () => {
    it('calculates the eigenvalue-eigenvector pairs', () => {
      const A = mat([[-1, 2, 2], [-1, -4, -2], [-3, 9, 7]]);
      const pairs = eig(A);

      const expectedValues = [3, -2, 1];
      const expectedVectors = [vec([1 / 3, -1 / 3, 1]), vec([0, -1, 1]), vec([1 / 2, -1 / 2, 1])];

      pairs.forEach((pair, i) => {
        expect(pair.eigenvalue).to.be.approximately(expectedValues[i], 0.00001);
        expect(pair.eigenvector.equals(expectedVectors[i])).to.be.true;
      });
    });
  });

  describe('calculateEigenvalues', () => {
    it('calculates the eigenvalues of a 2x2 matrix', () => {
      const A = mat([[2, 1], [2, 3]]);
      const eigenvalues = calculateEigenvalues(A);
      const expected = vec([4, 1]);

      expect(eigenvalues.getEntry(0)).to.be.approximately(expected.getEntry(0), 0.00001);
      expect(eigenvalues.getEntry(1)).to.be.approximately(expected.getEntry(1), 0.00001);
    });

    it('calculates the eigenvalues of a 3x3 matrix', () => {
      const A = mat([[-1, 2, 2], [-1, -4, -2], [-3, 9, 7]]);
      const eigenvalues = calculateEigenvalues(A, 30);
      const expected = vec([3, -2, 1]);

      expect(eigenvalues.getEntry(0)).to.be.approximately(expected.getEntry(0), 0.00001);
      expect(eigenvalues.getEntry(1)).to.be.approximately(expected.getEntry(1), 0.00001);
      expect(eigenvalues.getEntry(2)).to.be.approximately(expected.getEntry(2), 0.00001);
    });

    it('throws an error when eigenvalues are complex for a real-valued scalar type', () => {
      const A = mat([[0, -1], [1, 0]]);
      expect(() => calculateEigenvalues(A, 20)).to.throw();
    });

    it('calculates the complex eigenvalues of a complex matrix', () => {
      const A = ComplexMatrix.builder().fromNumberArray([[0, -1], [1, 0]]);
      const eigenvalues = calculateEigenvalues(A);
      expect(eigenvalues.getEntry(0)).to.deep.equal(ComplexNumber.I);
      expect(eigenvalues.getEntry(1)).to.deep.equal(new ComplexNumber(0, -1));
    });
  });

  describe('getEigenvectorForEigenvalue', () => {
    it('gets the eigenvectors for a 2x2 matrix', () => {
      const A = mat([[2, 1], [2, 3]]);
      const v1 = getEigenvectorForEigenvalue(A, 4);
      const v2 = getEigenvectorForEigenvalue(A, 1);

      expect(v1).to.deep.equal(vec([1 / 2, 1]));
      expect(v2).to.deep.equal(vec([-1, 1]));
    });

    it('gets the eigenvectors for a 3x3 matrix', () => {
      const A = mat([[-1, 2, 2], [-1, -4, -2], [-3, 9, 7]]);
      const v1 = getEigenvectorForEigenvalue(A, 3);
      const v2 = getEigenvectorForEigenvalue(A, -2);
      const v3 = getEigenvectorForEigenvalue(A, 1);

      const expected1 = vec([1 / 3, -1 / 3, 1]);
      const expected2 = vec([0, -1, 1]);
      const expected3 = vec([1 / 2, -1 / 2, 1]);

      expect(v1.equals(expected1)).to.be.true;
      expect(v2.equals(expected2)).to.be.true;
      expect(v3.equals(expected3)).to.be.true;
    });
  });
});
