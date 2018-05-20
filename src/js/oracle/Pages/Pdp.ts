"use strict";
import BasePage from './BasePage';
import ajax from '../Utils/Ajax';
import Template from '../Modules/pdp_template';
class Pdp extends BasePage{
    json:any;
    activeImage:any;
    colorCodes;
    templateObj;
    constructor(args){
        super(args);
        this.setContainer('pdp');
        document.getElementById('pdp').addEventListener("click",this.clickHanlder);
        document.getElementById('pdp').addEventListener("submit",this.submitHanlder);
        if(this.getParams.id){
            ajax.getFromUrl('/product-details',this.getParams.id).then(this.ajaxSuccess,this.ajaxFailure);
        }
        
    }
    ajaxSuccess=(data)=>{
        this.json=data.json;
        this.colorCodes={};
        data.colors.map((el)=>{
            this.colorCodes[el.name]=el.code;
        });
        
        this.setTemplate();
        this.render();
    }
    ajaxFailure=(err)=>{
        
    }
    clickHanlder=(event)=>{
        
        switch(event.target.getAttribute('class')){
            case 'thumbnails':
                document.getElementById('main-image').setAttribute('src',event.target.getAttribute('src'));
                break;
            default: 
                break;
        }
        if(event.target.getAttribute('type') != "submit"){
            event.preventDefault();
            event.stopPropagation();
        }
        
    }
    submitHanlder=(event)=>{
        console.log("in submit hanlder for Add to cart", this.json.id,this.templateObj.getCount());
        //Get id color size and quantity here
        event.preventDefault();
        event.stopPropagation();
    }
    setTemplate(){
        try{
            this.templateObj = new Template(this.json,this.colorCodes);
            this.template= this.templateObj.getTemplate();
        }catch(e){
            console.log("In PDP error line 30. Error::",e);
        }
        
    }
    render(){
        super.render();
        this.postRender();
    }
    postRender(){
        this.templateObj.resovePostRender();
    }
}


export default Pdp;