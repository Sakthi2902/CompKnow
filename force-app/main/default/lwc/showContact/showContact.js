import { subscribe, MessageContext, unsubscribe } from 'lightning/messageService';
import { LightningElement, wire,api } from 'lwc';
import Sakthi from '@salesforce/messageChannel/Sakthi__c';
import getAccountContacts from '@salesforce/apex/AccountClass.getAccountContacts';

export default class ShowContact extends LightningElement {
    accountId;
    accountName;
    title='Contacts'
    contacts;
    hasContacts;
    isAccountSelected=false;
    isAddUserClicked=false;
    isEditserClicked=false;
    @api recordId
    editableConId;

    @wire(MessageContext) 
    messageContext;

    subscription = null;

    connectedCallback() {
        this.handleSubscribe();
    }

    disconnectedCallback() {
        this.handleUnsubscribe();
    }

    handleSubscribe() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, Sakthi, (message) => {
                this.accountId = message.rowId;
                this.accountName = message.rowName;
                this.title=this.accountName+"'Contacts";
                this.getContacts();
            });
        }
    }
    async getContacts() {
        try {
            // Make sure `getAccountContacts` returns a Promise
            this.contacts = await getAccountContacts({ accountId: this.accountId });
            this.hasContacts=this.contacts.length>0?true:false;
            this.isAccountSelected=true;
        } catch (error) {
            console.error("Error fetching contacts:", error);
            // Optionally set contacts to an empty array or some fallback
            this.contacts = [];
        }
    }
    
    handleUnsubscribe() {
        if (this.subscription) {
            unsubscribe(this.subscription);
            this.subscription = null;
        }
    }
    handleAdduserbutton(event){
        this.isAddUserClicked=true;

    }
    handleAddUserCancel(event){
        
        this.isAddUserClicked=false;
    }
    handleEditUser(event){
        this.isEditserClicked = true;
        this.editableConId=event.target.dataset.contactId;
    }
    handleEditUserCancel(event){
        this.isEditserClicked = false;

    }
    handleSuccess(event){
        this.isAddUserClicked=false;
        this.isEditserClicked = false;
        this.getContacts();
    }
    handleSave() {
        // Trigger form submission or handle manually if using custom buttons
        this.template.querySelector('lightning-record-edit-form').submit();
    }
    
}

