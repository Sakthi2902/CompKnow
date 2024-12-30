import { LightningElement } from 'lwc';

export default class AccountParent extends LightningElement {
    searchTextParent;
    handleSearchTextParent(event){
        this.searchTextParent=event.detail;
    }
}