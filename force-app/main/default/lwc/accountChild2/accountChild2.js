import { LightningElement ,api,wire} from 'lwc';
import getContacts from "@salesforce/apex/AccountClass.getContacts";
import { publish ,MessageContext} from 'lightning/messageService';
import Sakthi from '@salesforce/messageChannel/Sakthi__c';
export default class AccountChild2 extends LightningElement {
    @api searchTextChild2='';
    wireAllContacts;
    contacts;
    error;
    rowId;
    rowName;
    @wire(MessageContext)
    messageContext;

    @wire(getContacts,{searchText:'$searchTextChild2'})
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.contacts = undefined;
            this.error = error;
        }
    }
    columns=[{label:"Id", fieldName:'Id'},
        {label:"Name", fieldName:'Name'},
        {label:"Actions", fieldName:'Actions', type:'button',typeAttributes:{
            label:"View Contacts",
            value:"view_contacts",
            variant: "base"
        }}
    ]

    handlerowAction(event){
        if(event.detail.action.value){
            this.rowId = event.detail.row.Id;
            this.rowName = event.detail.row.Name

            const payload={
                rowId:event.detail.row.Id,
                rowName: event.detail.row.Name
            };
            publish(this.messageContext,Sakthi,payload)
            
        }



    }

}