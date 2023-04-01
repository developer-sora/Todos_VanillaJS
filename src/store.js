// localstorage => indexedDB 저장 방식을 바꾼다면 어떻게 해야 할까?
import { localRead, localSave, init } from "./util/helper.js";

export default function Store(name) {
  this.dbName = name;
  if (!localRead(name)) {
    const todos = []; // map, set
    localSave(name, todos);
  }

  // init(indexedDB);
}

Store.prototype.readAll = function () {
  return localRead(this.dbName);
};

Store.prototype.readItem = function (id) {
  const todos = this.readAll(this.dbName);
  const findTodoItem = todos.filter((v) => v.id === Number(id));
  return findTodoItem;
};

Store.prototype.newItemSave = function (updateData) {
  const todos = this.readAll(this.dbName);
  todos.push(updateData);
  localSave(this.dbName, todos);
};

Store.prototype.deleteItemSave = function (id) {
  const todos = this.readAll(this.dbName);
  const deletedTodos = todos.filter((v) => v.id !== id);
  localSave(this.dbName, deletedTodos);
};

Store.prototype.updateItemSave = function (id, updateData) {
  const todos = this.readAll(this.dbName);
  const index = todos.findIndex((v) => v.id === id);
  for (let key in updateData) {
    todos[index][key] = updateData[key];
  }
  localSave(this.dbName, todos);
};
