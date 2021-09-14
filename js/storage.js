export default class Storage {
  keyStorage = "@vanilla_dopp/todo";
  items = [];

  constructor(items) {
    this.items = items || window.localStorage.getItem(this.keyStorage);
  }

  /**
   * Function to convert a string to json
   * @param {string} items A list string of items
   * @returns Return the JSON of the string
   */
  convertStringToJson(items) {
    return typeof items === "string" ? JSON.parse(items) : items;
  }

  /**
   * Function to extract id item from HTML id
   * @param {string} checkboxIdString HTML id of the checkbox
   * @returns Return an id of the item
   */
  extractItemIdFromCheckboxId(checkboxIdString) {
    return checkboxIdString.replace("checkbox_item_", "");
  }

  /**
   * Function to convert HTMLUList to JSON Array
   * @param {HTMLUListElement} itemsList List of items in HTML
   * @returns Return a JSON of the items
   */
  convertItemsToList(itemsList) {
    const list = this.convertStringToJson(itemsList);
    const items = [];
    const elements = list.children ? list.children : list;

    for (let i = 0; i < elements.length; i++) {
      const childrens = elements[i].children;
      items.push({
        id: this.extractItemIdFromCheckboxId(childrens[0].id),
        text: elements[i].innerText,
        checked: childrens[0].checked,
      });
    }
    return items;
  }

  /**
   * Function to update an item in list
   * @param {HTMLUListElement} items List of items in HTML
   * @param {string} checkboxIdString HTML id of the checkbox
   */
  updateList(items, checkboxIdString) {
    const indexItem = this.extractItemIdFromCheckboxId(checkboxIdString);
    const list = this.convertItemsToList(items);

    const itemToUpdate = list.filter((item) => item.id === indexItem)[0];
    if (!itemToUpdate) return alert("Ocorreu um erro ao atualizar uma tarefa!");

    const listItems = list.map((item) => {
      if (item.id === indexItem) return itemToUpdate;
      return item;
    });

    this.insertLocalStorage(listItems);
  }

  /**
   * Function to save list
   * @param {HTMLUListElement} items List of items in HTML
   */
  saveList(items) {
    const list = this.convertItemsToList(items || this.items);
    this.insertLocalStorage(list);
  }

  /**
   * @param {JSON} listJson List of JSON to insert in local storage
   */
  insertLocalStorage(listJson) {
    window.localStorage.setItem(this.keyStorage, JSON.stringify(listJson));
  }

  /**
   * Function to get list from local storage
   * @returns Return a string JSON
   */
  getList() {
    return window.localStorage.getItem(this.keyStorage);
  }

  /**
   * Function to clear all database in local storage
   */
  clearList() {
    window.localStorage.removeItem(this.keyStorage);
  }
}
