import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login/index.vue";
import Layout from "./components/Layout.vue";
import Home from "./views/home/index.vue";
import Member from "./views/member/member.vue";
import Staff from "./views/staff/staff.vue";
import Supplier from "./views/supplier/supplier.vue";
import Goods from "./views/goods/goods.vue";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/login",
            component: Login
        },
        {
            path: "/",
            component: Layout,
            redirect: "/home",
            children: [{
                path: "/home",
                component: Home,
                meta: { title: "首页" }
            }]
        },
        {
            path: "/member",
            component: Layout,
            children: [{
                path: "/", //member//
                component: Member,
                meta: { title: "会员管理" }
            }]
        },
        {
            path: "/supplier",
            component: Layout,
            children: [{
                path: "/",
                component: Supplier,
                meta: { title: "供应商管理" }
            }]
        },
        {
            path: "/goods",
            component: Layout,
            children: [{
                path: "/",
                component: Goods,
                meta: { title: "商品管理" }
            }]
        },
        {
            path: "/staff",
            component: Layout,
            children: [{
                path: "/",
                component: Staff,
                meta: { title: "员工管理" }
            }]
        }
    ]
});