new Vue({
    el:".container",
    data:{
        addressList:[],
        limitNum:3,
        curIndex:0,
        shipping:1,
        delFlag:false,
        curAddress:''
    },
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    mounted:function () {
        this.$nextTick(function () {
            this.getAddress();
        })
    },
    methods:{
        getAddress:function () {
            this.$http.get("data/address.json").then(res=>{
                var res = res.data;
                if (res.status==0){
                    this.addressList = res.result;
                }
            })
        },
        //显示三个地址,数据只放了三个地址,可以自行添加,观察效果
        loadMore:function () {
            this.limitNum == this.addressList.length ? this.limitNum=3 : this.limitNum = this.addressList.length;
        },
        //设定默认地址
        setDefault:function (addressId) {
            this.addressList.forEach(function (item,index) {
                if(item.addressId == addressId){
                    item.isDefault = true;
                }else {
                    item.isDefault = false;
                }
            })
        },
        delConfirm:function (curAddress) {
            this.curAddress = curAddress;
            this.delFlag = true;
        },
        delSure:function () {
            var index = this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index,1);
            this.delFlag = false;
        }
    }
})