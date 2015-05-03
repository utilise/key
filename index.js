module.exports = function key(k, v){ 
  var set  = arguments.length > 1
  return function deep(o){
    var keys = k.split('.')
      , root = keys.shift()

    return keys.length
         ? (set ? key(keys.join('.'), v)(o[root])
                : key(keys.join('.'))(o[root]))
         : (set ? (o[k] = v)
                :  o[k])
  }
}