<template>
    <div class="item-wrap">
       
        
            <div class="item" v-for="(item, index) in data" :key="index" :title="item.name">
                <div class="img-wrap">
                    <img :src="item.avatar_url" alt="">
                </div>
                <p class="name">{{ item.name }}</p>
                <Icon class="close" type="md-close-circle" @click="userClick(item.name,item.id)" />
            </div>
        </div>
</template>
<script>
    export default {
        props: ["data","searchKey","columns"],
        data() {
            return {
                baseurl: 'http://' + window.location.host,　 //item.avatar_url,
                 searchQuery :"",
                 keyColumn: '',
				item: {}
            }
        },
        methods: {
            userClick(name, id) {
                this.$emit("userClick", {
                    name: name,
                    id: id
                });
            }
        },
        created() {

        }
        
    };

</script>
<style scoped>
    .item-wrap {
        padding-left: 10px;
        padding-right: 10px;
    }

    .item-wrap>div {
        float: left;
    }

    .item {
        width: 40px;
        margin: 5px 8px;
        position: relative;
    }

    .item:hover>.close {
        display: block;
    }

    .img-wrap {
        width: 100%;
        height: 40px;
    }

    .img-wrap>img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .name {
        font-size: 8px;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .close {
        display: inline-block;
        width: 10px;
        height: 10px;
        position: absolute;
        top: -4px;
        right: -4px;
        color: red;
        display: none;
    }

</style>
