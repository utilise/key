var commit = require('utilise.set').commit
  , str = require('utilise.str')
  , is = require('utilise.is')

module.exports = function key(k, v){ 
  var set = arguments.length > 1
    , keys = str(k).split('.')
    , root = keys.shift()

  return function deep(o, i){
    var masked = {}
      , ret = !o ? undefined 
            : !k ? o
            : is.arr(k) ? (k.map(copy), masked)
            : o[k] || !keys.length ? (set ? ((o[k] = is.fn(v) ? v(o[k], i) : v), o)
                                          :   o[k])
                                   : (set ? (key(keys.join('.'), v)(o[root] ? o[root] : (o[root] = {})), o)
                                          : key(keys.join('.'))(o[root]))

    if (set) commit(o, { type: 'update', key: k, value: key(k)(o) })
      
    return ret

    function copy(k){
      var val = key(k)(o)
      ;(val != undefined) && key(k, val)(masked)
    }
  }
}