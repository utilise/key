var wrap = require('utilise.wrap')
  , dir = require('utilise.keys')
  , str = require('utilise.str')
  , is = require('utilise.is')

module.exports = function key(k, v){ 
  var set = arguments.length > 1
    , keys = is.fn(k) ? [] : str(k).split('.').filter(Boolean)
    , root = keys.shift()

  return function deep(o, i){
    var masked = {}
    
    return !o ? undefined 
         : !is.num(k) && !k ? (set ? replace(o, v) : o)
         : is.arr(k) ? (k.map(copy), masked)
         : o[k] || !keys.length ? (set ? ((o[k] = is.fn(v) ? v(o[k], i) : v), o)
                                       :  (is.fn(k) ? k(o) : o[k]))
                                : (set ? (key(keys.join('.'), v)(o[root] ? o[root] : (o[root] = {})), o)
                                       :  key(keys.join('.'))(o[root]))

    function copy(k){
      var val = key(k)(o)
      if (val != undefined) 
        key(k, is.fn(val) ? wrap(val) : val)(masked)
    }

    function replace(o, v) {
      dir(o).map(function(k){ delete o[k] })
      dir(v).map(function(k){ o[k] = v[k] })
      return o
    }
  }
}