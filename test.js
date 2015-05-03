var expect = require('chai').expect
  , key = require('./')

describe('key', function() {
  var o = { a: 1, b: 2, c: { d: 3 } }

  it('should return value of simple key', function() {
    expect(key('a')(o)).to.equal(1)
  })

  it('should return value of deep key', function() {
    expect(key('c.d')(o)).to.equal(3)
  })

  it('should set value of simple key', function() {
    key('a', 4)(o)
    expect(o.a).to.equal(4)
  })

  it('should set value of deep key', function() {
    key('c.d', 5)(o)
    expect(o.c.d).to.equal(5)
  })
})