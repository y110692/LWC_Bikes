import { LightningElement, api } from 'lwc';

export default class Bike extends LightningElement {

    @api bike;

    handleFilter(event) {
        console.log('Filter by ' + event.target.label);
        this.dispatchEvent(new CustomEvent('filter',
            { detail: event.target.label, bubbles: false, composed: false }));
    }

    handleAddToCart(event) {
        this.dispatchEvent(new CustomEvent('addtocart', {
            detail: this.bike.key,
            bubbles: false, composed: false
        }));
    }

}