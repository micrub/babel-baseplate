import { expect } from 'chai'
import Baseplate from '../src/index'
describe('"Baseplate" module exports', () => {
  it('should an instance of "Object".', () => {
    expect(Baseplate).to.be.instanceOf(Object)
  })
  it('should have constructor named "Function".', () => {
    expect(Baseplate.constructor.name).to.be.eq('Function')
  })
})
