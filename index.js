var is = require('is')

module.exports = function key(k, v){ 
  var set  = arguments.length > 1
  is.arr(k) ? (k = k.join('.'))
            : (k = String(k ? k : ''))

  return function deep(o){
    var keys = k.split('.')
      , root = keys.shift()

    return !o ? undefined 
         : !k ? o
         : keys.length ? (set ? key(keys.join('.'), v)(o[root] ? o[root] : (o[root] = {}))
                              : key(keys.join('.'))(o[root]))
                       : (set ? ((o[k] = is.fn(v) ? v(o[k]) : v), o)
                              :  o[k])
  }
}