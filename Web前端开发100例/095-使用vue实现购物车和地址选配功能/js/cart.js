//使用vue插件前需要new Vue
var vm = new Vue({
    //vue的范围
    el:"#app",
    //接收数据的初始化
    data:{
        delFlag:false,
        productList:[],
        checkAllFlag:false,
        curProduct:''
    },
    //获取全局过滤器
    filters:{
        fomatMoney:function (value) {
            return "￥"+value.toFixed(2);
        }
    },
    //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
    mounted:function () {
        this.$nextTick(function () {
            this.cartview();
        })
       //this.cartview();

    },
    //计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例
    computed:{
        //计算总的价格
        totalPrice:function () {
            var total=0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
                    total += item.productPrice * item.productQuantity;
                }
            });
            return total;
        }
    },
    //methods 将被混入到 Vue 实例中。可以直接通过 vm 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例
    methods:{
        //加载数据
        cartview:function () {
            this.$http.get("data/cartData.json",{"id":1}).then(res=>{
                this.productList = res.data.result.list;
            })

        },

        //页面显示正确的价格及其他信息
        changMoney:function (product,type) {
            if(type){
                //增加数据
                product.productQuantity++;
            }else if(product.productQuantity>1){
                product.productQuantity--;
            }
        },
        seletcedPro:function (product) {
            if (typeof product.checked == "undefined"){
                Vue.set(product,"checked",true);
            }else {
                product.checked=!product.checked;
            }
        },
        checkAll:function (flag) {
            this.checkAllFlag = flag;
            //var self = this;
            this.productList.forEach(function (item,index) {
                if(typeof item.checked == "undefined"){
                    Vue.set(item,"checked",flag);
                }else {
                    item.checked = flag;
                }
            })
        },
        delConfirm:function (item) {
            this.curProduct=item;
            this.delFlag = true;
        },
        delSure:function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag = false;
        }
    }
})