import parentJson from './StaticJson';
import Ejson from './Ejson';
class Ajax{
    pr:Ejson;
    constructor(){
        this.pr = new Ejson({kiko:[{name:'kd'},{name:'jd'}]});
    }
    getFromUrl(url:String,id?:number){
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                //Decide the JSON the be sent back here
                switch(url){
                    case '/Products':
                        resolve(parentJson.productList);
                        break;
                    case '/product-details':
                        let product = undefined;
                        parentJson.productList.map((el:any,index)=>{
                            if(el.id == id){
                                product = el;
                            }
                        });
                        resolve({json:product.details,colors:parentJson.colorCodes});
                        break;
                }
            }, 0);
        });
        return promise;
    }

}
const ajax = new Ajax();
export default ajax;

/*class Ajax{
    private url:String;
    private method:String;
    private req:any;
    constructor(u,m) {
        this.url = u?u:'';
        this.method = m?m:'GET';
        this.RequestSetup();
    }
    private RequestSetup(){
        this.req = new XMLHttpRequest();
        this.req.onreadystatechange = (e) =>{
            switch(this.req.readyState){
                case 1:
                break;
                case 2:
                break;
                case 3:
                break;
                case 4:
                document.write(this.req.responseText);
                break;
            }
        };
    }
    public Trigger = () => {
        
        this.req.open(this.method,this.url,true);
        this.req.send();
    }

    public StaticJson = {
        
        'kiko':'gogo'
        
    }
}
export default Ajax;*/