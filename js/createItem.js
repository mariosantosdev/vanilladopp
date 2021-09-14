export default class CreateItemHTML {
  itemId = new Date().getTime().toString();
  text = "";
  checked = false;

  constructor(text, checkedItem, itemId) {
    this.text = text;
    if (itemId) this.itemId = itemId;
    if (checkedItem) this.checked = checkedItem;
  }

  /**
   * Function to create label to be custom checkbox element
   * @returns {HTMLLabelElement} Return an element HTML
   */
  createHTMLCustomCheckbox() {
    const customCheckbox = document.createElement("label");
    customCheckbox.className = "checkbox--custom";
    customCheckbox.setAttribute("for", `checkbox_item_${this.itemId}`);

    return customCheckbox;
  }

  /**
   * Function to create input checkbox element
   * @returns {HTMLInputElement} Return an element HTML
   */
  createHTMLCheckbox() {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox_item_${this.itemId}`;
    checkbox.checked = this.checked;

    return checkbox;
  }

  /**
   * Function to verify state of checkbox
   * @param {HTMLInputElement} checkbox Input element
   * @returns {Boolean} Return boolean state of checked input
   */
  checkboxIsTrue(checkbox) {
    return checkbox.checked;
  }

  /**
   * Function to create LI element
   * @returns {HTMLLIElement} Return an element HTML
   */
  drawHTMLItem() {
    const li = document.createElement("li");
    li.className = "list--item";
    li.innerText = this.text;
    const checkbox = this.createHTMLCheckbox(this.itemId);
    li.appendChild(checkbox);
    li.appendChild(this.createHTMLCustomCheckbox(this.itemId));
    if (this.checkboxIsTrue(checkbox)) li.classList.add("item--checked");

    return li;
  }
}
