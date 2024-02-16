import { LightningElement, api } from 'lwc'

export default class DragListContainer extends LightningElement {
  @api items
  @api name
  cancel(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  handleDragComplete(event) {
    // Fire custom event when drag stops
    const detail = { name: this.name, id: event.target.dataset?.id }
    console.log(detail)
    this.dispatchEvent(
      new CustomEvent(
        'endmove', 
        { detail }
      )
    )
  }
  // Fire custom event whend drag starts
  handleDragStart(event) {
    const detail = { name: this.name, id: event.target.dataset?.id }
    this.dispatchEvent(
      new CustomEvent(
        'startmove', 
        { detail }
      )
    )
  }



  // drag and drop 
  availableItems = []
  selectedItems = []
  // Temp storage set on drag start
  dragInfo
  connectedCallback() {
    // Dummy data, so generated ID values
    // this.availableItems = "a b c d e f g h i j k l".split(' ').map((value,id)=>({id:`${id}`,value}));
  }
  handleDragStart(event) {
    // Keep track of the list and item id
    this.dragInfo = { ...event.detail }
  }
  handleDragComplete(event) {
    // Keep reference to the lists. Start and end lists may be the same list.
    let startList = this.dragInfo.name === 'available'? this.availableItems: this.selectedItems
    let endList = event.detail.name === 'available'? this.availableItems: this.selectedItems
    // Indices for the items to move in their respective lists
    let startIndex = startList.findIndex(item => item.id === this.dragInfo.id)
    let endIndex = endList.findIndex(item => item.id === event.detail.id)
    // Remove from old index, move to new index
    endList.splice(endIndex, 0, startList.splice(startIndex, 1)[0])
    // Trigger a render cycle on copy. You could also use @track.
    this.availableItems = [...this.availableItems]
    this.selectedItems = [...this.selectedItems]
  }


}