# Object.watch shim.
unless Object::watch
  Object.defineProperty Object::, "watch",
    enumerable:   false
    configurable: true
    writable:     false
    
    value: (prop, handler) ->
      oldval = this[prop]
      newval = oldval
      getter = -> newval

      setter = (val) ->
        oldval = newval
        newval = handler.call(this, prop, oldval, val)

      if delete this[prop]
        Object.defineProperty this, prop,
          get:          getter
          set:          setter
          enumerable:   true
          configurable: true

unless Object::unwatch
  Object.defineProperty Object::, "unwatch",
    enumerable:   false
    configurable: true
    writable:     false
    
    value: (prop) ->
      val = this[prop]
      delete this[prop]
      this[prop] = val

pathways =
  pathway1:
    mine1: '?'
    mine2: '?'
  pathway2:
    mine1: '?'
    mine2: '?'
  pathway3:
    mine1: '?'
    mine2: '?'

for pathway, mines of pathways then do (pathway, mines) ->
  for mine, status of mines
    mines.watch mine, (mine, oldvalue, newvalue) ->
      console.log "#{mine} #{pathway} changed from #{oldvalue} to #{newvalue}"
      newvalue

pathways.pathway1.mine1 = 'Y'
pathways.pathway2.mine2 = 'N'