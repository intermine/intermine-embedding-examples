(function() {
  this.ecoTemplates || (this.ecoTemplates = {});
  this.ecoTemplates["./templates/publications/_table"] = function(__obj) {
    if (!__obj) __obj = {};
    var __out = [], __capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return __safe(result);
    }, __sanitize = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else if (typeof value !== 'undefined' && value != null) {
        return __escape(value);
      } else {
        return '';
      }
    }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
    __safe = __obj.safe = function(value) {
      if (value && value.ecoSafe) {
        return value;
      } else {
        if (!(typeof value !== 'undefined' && value != null)) value = '';
        var result = new String(value);
        result.ecoSafe = true;
        return result;
      }
    };
    if (!__escape) {
      __escape = __obj.escape = function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      };
    }
    (function() {
      (function() {
        var row, _i, _len, _ref;
      
        __out.push('<table class="table table-striped table-bordered table-condensed">\n  <thead>\n    <tr>\n      <th>#</th>\n      <th>Authors</th>\n      <th>Year</th>\n      <th>Journal</th>\n      <th>Title</th>\n    </tr>\n  </thead>\n  <tbody>\n    ');
      
        _ref = this.data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          __out.push('\n      <tr>\n        <td></td>\n        <td>');
          __out.push(__sanitize(row.authors));
          __out.push('</td>\n        <td>');
          __out.push(__sanitize(row.year));
          __out.push('</td>\n        <td>');
          __out.push(__sanitize(row.journal));
          __out.push('</td>\n        <td>');
          __out.push(__sanitize(row.title));
          __out.push('</td>\n      </tr>\n    ');
        }
      
        __out.push('\n  </tbody>\n</table>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  };
}).call(this);
