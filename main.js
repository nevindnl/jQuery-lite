const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(input){
  if (typeof input === 'string'){
    return new DOMNodeCollection(Array.from(document.querySelectorAll(input)));
  }
  else if(typeof input === 'object'){
    return new DOMNodeCollection([input]);
  }
  else if(typeof input === 'function'){
    let functions = [];
    functions.push(input);

    document.addEventListener('DOMContentLoaded', () => {
      functions.forEach(fn => {
        fn();
      });
    });

    return (...args) => {
      functions.concat(args);

      document.addEventListener('DOMContentLoaded', () => {
        functions.forEach(fn => {
          fn();
        });
      });
    };
  }
};

window.$l.extend = function(...objs){
  let result = {};
  objs.forEach(obj => {
    for (let key in obj){
      result[key] = obj[key];
    }
  });
  return result;
};

window.$l.ajax = function(options){
  let defaults = {
    success: () => {},
    error: () => {},
    url: window.location.href,
    method: 'GET',
    data: {},
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  options = window.$l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(options['method'], options['url']);

  if (xhr.status === 200){
    options['success'](JSON.parse(xhr.response));
  }
  else{
    options['error'](JSON.parse(xhr.response));
  }

  xhr.send(options['data']);
};
