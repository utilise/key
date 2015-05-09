var is = require('is')

module.exports = function key(k, v){ 
  var set  = arguments.length > 1
  is.arr(k) && (k = k.join('.'))
  
  return function deep(o){
    var keys = k.split('.')
      , root = keys.shift()

    return !o ? undefined 
         : keys.length ? (set ? key(keys.join('.'), v)(o[root] ? o[root] : (o[root] = {}))
                              : key(keys.join('.'))(o[root] ? o[root] : (o[root] = {})))
                       : (set ? (o[k] = v)
                              :  o[k])
  }
}