import {
  validateEmptyAndEmail,
  validateEmptyAndLength3
} from './validators'

describe('Validators utils', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório')
  })

  it('should give an error with less then 3 characteres payload', () => {
    expect(validateEmptyAndLength3('12')).toBe('*Este campo precisa de no mínimo 3 caracteres')
  })

  it('should returns true when input pass a corret param', () => {
    expect(validateEmptyAndLength3('1245')).toBe(true)
  })

  it('should give an error with empty payload', () => {
    expect(validateEmptyAndEmail('')).toBe('*Este campo é obrigatório')
  })

  it('should give an error with invalid email', () => {
    expect(validateEmptyAndEmail('alo@com')).toBe('*Este campo precisa ser um email')
  })

  it('should return true when input email is correct', () => {
    expect(validateEmptyAndEmail('alo@gmail.com')).toBe(true)
  })

})
