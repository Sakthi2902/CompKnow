import { LightningElement } from 'lwc';

export default class AccountChild1 extends LightningElement {
    searchTextChild1;
    handleChangeCh1(event){
        this.searchTextChild1=event.target.value;
    }

    handleClickCh1(){
        const searchEvent = new CustomEvent("getsearchevent",{detail:this.searchTextChild1});
        this.dispatchEvent(searchEvent)
    }
}