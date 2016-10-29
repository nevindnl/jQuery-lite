class DOMNodeCollection{
  constructor(arr){
    this.arr = arr;
  }

  html(str){
    if(str === undefined){
      return this.arr[0].innerHTML;
    }
    else{
      this.arr.forEach(node => {
        node.innerHTML = str;
      });
    }
  }

  empty(){
    this.html('');
  }

  append(child){
    this.arr.forEach(node => {
      node.innerHTML.concat(child.outerHTML);
    });
  }

  attr(attr_get, val){
    if (val === undefined){
      return this.arr[0].attributes[attr_get];
    }
    else{
      this.arr.forEach(node => {
        node.setAttribute(attr_get, val);
      });
    }
  }

  addClass(nodeClass) {
    this.arr.forEach(node => {
      node.classList.add(nodeClass);
    });
  }

  removeClass(nodeClass) {
    this.arr.forEach(node => {
      node.classList.remove(nodeClass);
    });
  }

  children() {
    let childrenArr = this.arr.reduce([], function(arr, node) {
      arr.concat(node.children);
    });

    return new DOMNodeCollection(childrenArr);
  }

  parent() {
    let parentArr = this.arr.reduce([], function(arr, node) {
      arr.concat(node.parent);
    });

    let uniqueParents = parentArr.uniq();

    return new DOMNodeCollection(uniqueParents);
  }

  find(selector) {
    let resultArr = this.arr.reduce([], function(arr, node) {
      arr.concat(node.querySelectorAll(selector));
    });

    let descendants = resultArr.uniq();

    return resultArr;
  }

  remove(){
    this.arr.forEach(node => {
      node.outerHTML = '';
    });

    this.arr = [];
  }

  on(event, cb){
    this.arr.forEach(node => {
      node.addEventListener(event, cb);
    });
  }

  off(event, cb){
    this.arr.forEach(node => {
      node.removeEventListener(event, cb);
    });
  }




}

module.exports = DOMNodeCollection;
