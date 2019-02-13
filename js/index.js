
$(function(){
    Array.prototype.exindexof = function(num){
        let a = -1;
        for(let i = 0; i<this.length; i++){
            if(num == this[i].id){
                a = i;
            }
        }
        return a;
    }


    class user {
        constructor(prop){
            this.$el = $(prop.el);
            this.userArr = prop.userArr;
            this.Whitelist = prop.baimd;
            this.exelist = prop.exelist||"";
            this.desroeyed = prop.desroeyed;
            this.repeatArr = prop.repeatArr||[];
            this.Mapping();//布局
            this.setThesonofGod();//天选之子
        }
        //绘图
        Mapping(){
            let strDemo = ""; 
            this.userArr.forEach(item => {
                strDemo += `<li class='li' dataId= "${item.id}">${item.name}</li>`;
            });
            this.$el.html(strDemo);

            let strDemo2 = "";
            this.repeatArr.forEach((item)=>{
                strDemo2+=`<li class='li2' dataId= "${item.id}">${item.name}</li>`
            });
            $(".ul2").html(strDemo2);
        }
        // 生成随机的人
        setThesonofGod(){
            this.ThesonofGod = Math.floor(Math.random()*(this.userArr.length));
            let index = this.userArr.indexOf(this.exelist);//强制选中  淘汰
            // if(this.exelist!=""&&index!=-1){
            //     this.ThesonofGod = index;
            //     return;
            // }
            this.userArr.forEach((item,index)=>{
                this.Whitelist.forEach((item2) => {
                    if(item.id == item2.id && this.ThesonofGod == index){
                        if(this.userArr.length<=this.Whitelist.length){
                            this.ThesonofGod = -1;
                            return false;
                        }else{
                            this.setThesonofGod();
                        }
                       
                    }
                });
            });
        }
        SelectCss(){
            this.setThesonofGod();
            if(this.ThesonofGod==-1){
                alert("放弃吧！这些人是不可能被选中的.......");
                this.desroeyed();
                return;
            }
            let i = 0; 
            let a = (Math.floor(Math.random()*4)+3)*this.userArr.length+this.ThesonofGod;
            let t = setInterval(()=>{
                if(i>=this.userArr.length)i = 0;
                $(".li").eq(i).addClass("a1").siblings().removeClass("a1");
                if(a==0){
                    clearInterval(t);
                    setTimeout(()=>{
                        this.userDate();
                    },700);
                    this.desroeyed();//
                    return ;
                }
                i++;a--;
            },50);
        }

        
        userDate(){
            if(confirm("你确定选择"+this.userArr[this.ThesonofGod].name+"？")){
                let arr = this.userArr.splice(this.ThesonofGod,1);
                this.repeatArr = this.repeatArr.concat(arr);
                this.Mapping();
            }else{
                alert("再来 一次吧");
            }
        }

        clickupData1(num){
            let i = this.userArr.exindexof(num);
            let arr = this.userArr.splice(i,1);
            this.repeatArr = this.repeatArr.concat(arr);
            this.Mapping();
        }
        clickupData2(num){
            let i = this.repeatArr.exindexof(num);
            let arr = this.repeatArr.splice(i,1);
            this.userArr = this.userArr.concat(arr);
            this.Mapping();
        }
    }

    let obj = new user({
        el:"#box",
        userArr:[
            {id:1,name:"邹豪"},
            {id:2,name:"铭轩"},
            {id:3,name:"葛伟荣"},
            {id:4,name:"张思博"},
            {id:5,name:"李冲"},
            {id:6,name:"aa"},
            {id:7,name:"bb"},
            {id:8,name:"cc"},
            {id:9,name:"dd"},
            {id:10,name:"ee"},
        ],
        baimd:[
            {id:1,name:"邹豪"},
            {id:2,name:"铭轩"}
        ],
        repeatArr:[ ],
        desroeyed:function(){
            setTimeout(() => {
                kai = true;
            });
        }
    });

    let kai = true;
   $("button").on("click",function(){
        if(kai){
          obj.SelectCss();
        }
        kai = false;
   });

   $('#box').on("click","li",function(){
       obj.clickupData1($(this).attr("dataid"));
   });
   $(".ul2").on("click","li",function(){
        obj.clickupData2($(this).attr("dataid"));
   })
})