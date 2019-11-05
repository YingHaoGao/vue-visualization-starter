<template>
    <div class="tourists">
        <div class="header">
            <h3>船舶航行状态</h3>
        </div>

        <table class="tableData" cellpadding="0" cellspacing="0">
            <thead>
            <tr>
                <th class="shipno">船号</th>
                <th class="status">状态</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableData1">
                <td class="shipno">{{item.ship_no}}</td>
                <td class="status">{{item.ship_status}}</td>
            </tr>
            </tbody>
        </table>
        <table class="tableData" cellpadding="0" cellspacing="0">
            <thead>
            <tr>
                <th class="shipno">船号</th>
                <th class="status">状态</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableData2">
                <td class="shipno">{{item.ship_no}}</td>
                <td class="status">{{item.ship_status}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import itemMixin from '@/mixins/item';
    import config, { mockData } from './Ship';
    export default {
        name: "Ship",
        mixins: [itemMixin],
        config() {
            return config;
        },
        data() {
            return {
                tableData1: [],
                tableData2: []
            };
        },
        mounted() {
            this.onLoad();
            window.setInterval(() => {
                setTimeout(this.onLoad(),0)
            },600000)
        },
        methods: {
            draw() {},
            failCallback() {},
            alwaysCallback() {},
            onInit() {},
            /**
             * 初始化时加载
             */
            onLoad() {
                if (this.isProd) {
                    // 加载远程数据
                    this.$http.get('/api/ship').then((res) => {
                        console.log("ship: " ,res.data);
                        if (res.data.code !== '200') return;
                        this.tableData1 = res.data.data.slice(0,10);
                        this.tableData2 = res.data.data.slice(10,20);
                    })
                } else {
                    const res = mockData();
                    if (res.code !== '200') return;
                    this.tableData1 = res.data.slice(0,10);
                    this.tableData2 = res.data.slice(10,20);
                }
            },
            onReload() {
                this.onLoad();
            },
            onResize() {},
            onNext() {},
            onPrev() {},
            onPrint() {},
        },
    }
</script>

<style lang="scss">
    .tourists {
        .el-progress-bar__outer {
            background-color: #5B9AD2;
        }
    }
</style>
<style scoped lang="scss">
    .tourists {
        height: 100%;
        color:#D5DAE4;
        font-family: "Microsoft YaHei";
        .header{
            height:12%;
            width:96%;
            margin:0 2%;
            display: flex;
            align-items: center;
            h3{
                border-left:2px solid  #D5DAE4;
                padding-left:10px;
            }
        }
        .tableData{
            float: left;
            width: 49%;
            text-align: center;
            height: 88%;
            border-top: 1px solid  rgba(255,255,255,.4);
            border-bottom: 1px solid  rgba(255,255,255,.4);
            font-size:16px;
            color:#f4f4f4;
            th,tr{
                width:100%;
                height:8%;
            }
            thead{
                tr{
                    th{
                        height: 36px;
                        border-bottom: 1px solid rgba(255,255,255,.4);
                        background: rgba(3,13,39,.4);
                    }
                    th:first-child{
                        border-left: none;
                    }
                }
            }
            tbody{
                tr:nth-child(2n){
                    background-color:rgba(43,67,119,0.8);
                }
            }
            .shipno,.status{
                width:50%;
            }
        }
    }
</style>