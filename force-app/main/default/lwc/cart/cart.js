import { LightningElement, track, wire } from 'lwc';
import { MessageContext, subscribe } from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";

export default class Cart extends LightningElement {

    @track cart;
    @wire(MessageContext) messageContext;
    subscription = null;

    connectedCallback() {
        this.subscribeMC();
    }

    subscribeMC() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.messageContext, SAMPLEMC, (message) => {
            this.handleReceiveMessage(message);
        });
    }

    handleReceiveMessage(message) {
        this.cart = message.cartDetails;
    }
}