/*global ender:true*/
(function ($) {
  var t = require('traversty')
    , integrated = false
    , integrate = function(meth) {
        // this crazyness is for lazy initialisation because we can't be guaranteed
        // that a selector engine has been installed *before* traversty in an ender build
        var fn = function(self, selector, index) {
            if (!integrated) {
              try {
                t.setSelectorEngine($)
              } catch (ex) { } // ignore exception, we may have an ender build with no selector engine
              integrated = true
            }
            fn = function(self, selector, index) { return $(t(self)[meth](selector, index)) }
            return fn(self, selector, index)
          }
        return function(selector, index) { return fn(this, selector, index) }
      }
    , up = integrate('up')
    , down = integrate('down')
    , next = integrate('next')
    , previous = integrate('previous')

  $.ender(
      {
          // core
          up: up
        , down: down
        , next: next
        , previous: previous
          // aliases
        , parent: up
        , prev: previous
      }
    , true
  )
}(ender))
