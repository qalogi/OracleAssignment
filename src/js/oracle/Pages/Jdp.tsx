"use strict";
import BasePage from './BasePage';
import ajax from '../Utils/Ajax';
class Pdp extends BasePage{
    json:any;
    constructor(args){
        super(args);
        this.setContainer('pdp');
        document.getElementById('pdp').addEventListener("click",this.clickHanlder);
        if(this.getParams.id){
            ajax.getFromUrl('/product-details',this.getParams.id).then(this.ajaxSuccess,this.ajaxFailure);
        }
        
    }
    ajaxSuccess=(data)=>{
        this.json=data;
        this.setTemplate();
        this.render();
    }
    ajaxFailure=(err)=>{
        
    }
    clickHanlder=(event)=>{
        console.log("Heya in here",event.target);
    }
    setTemplate(){
        console.log('hiya in pdp',this.json);
        try{
            this.template=<div>
                <h1>Heya</h1>
            </div>;
        }catch(e){
            console.log("In PDP error line 30. Error::",e);
        }
        
    }
}


export default Pdp;