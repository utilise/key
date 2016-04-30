var expect = require('chai').expect
  , last = require('utilise.last')
  , key = require('./')
  , o

describe('key', function() {
  beforeEach(function(){
    o = { a: 1, b: 2, c: { d: 3 } }
  })

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

  it('should get multiple values if given array', function() {
    expect(key(['a', 'c.d'])(o)).to.eql({ a: 1, c: { d: 3 } })
  })

  it('should creating missing links when setting', function() {
    key('e.f.g', 6)(o)
    expect(o.e.f.g).to.equal(6)
  })

  it('should gracefully return undefined when accessing non-existent path', function() {
    expect(key('h.i.j')(o)).to.equal(undefined)
  })

  it('should fail gracefully if object undefined', function() {
    expect(key('y')(o.z)).to.not.be.ok
  })

  it('should work with integers', function() {
    expect(key(1)(['a','b','c'])).to.equal('b')
  })

  it('should return root if no key', function() {
    expect(key()(['a','b','c'])).to.eql(['a','b','c'])
  })

  it('should not confuse 0 with no key', function() {
    expect(key(0)(['a','b','c'])).to.eql('a')
  })

  it('should not create any paths if missing link', function() {
    var o = { a: {} }
    expect(key('a.b.c')(o)).to.eql(undefined)
    expect(o).to.eql({ a: {} })
  })

  it('should eval first if value is fn', function() {
    var add = function(d){ return d+1 }
      , a = [1,2,3]

    expect(key(2, add)(a)).to.eql([1,2,4])
    expect(a).to.eql([1,2,4])
  })

  it('should return root after deep set', function() {
    var o = { a: { b: 'c' } }
    expect(key('a.b', String)(o)).to.eql({ a: { b: 'c' } })
  })

  it('should prefer dotted keys to traversing path', function() {
    var o = { 'a.b': 3, a: { b: 5 }}
    expect(key('a.b')(o)).to.eql(3)

    key('a.b', 6)(o)
    expect(o).to.eql({ 'a.b': 6, a: { b: 5 }})
  })

  it('should not copy keys if value undefined', function() {
    var o = { a: false, b: undefined, c: 0, d: 10 }
    expect(key(['a', 'b', 'c', 'd', 'e'])(o)).to.eql({ a: false, c: 0, d: 10 })
  })

  it('should provide index as implict data to functions', function() {
    var a = [{ a: 'a'}, { a: 'b'}, { a: 'c'}]
      , indicies = []
      , collect = function(d, i){ indicies.push(i) }

    a.map(key('a', collect))

    expect(indicies).to.eql([0, 1, 2])
  })

  it('should allow function as key', function(){
    expect(key(foobar)({ foo: 'foo', bar: 'bar' })).to.eql('foobar')

    function foobar(d) {
      return d.foo + d.bar
    }
  })

})