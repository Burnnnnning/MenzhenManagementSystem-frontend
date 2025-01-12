<template>
    <div class="selector-container">
        <div class="selector-group">
            <el-cascader
                v-model="selectedOptions"
                :options="options"
                placeholder="行政区"
                :props="cascaderProps"
                @change="handleChange"
                class="dropDownPanel custom-cascader"
            />
            <el-cascader
                v-model="selectedYear"
                :options="yearOptions"
                placeholder="年份"
                :props="yearProps"
                @change="handleYearChange"
                class="dropDownPanel custom-cascader year-cascader"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { ElCascader } from 'element-plus';

export default defineComponent({
    name: 'StatisticSelector',
    components: {
        ElCascader,
    },
    setup(props, { emit }) {
        const selectedOptions = ref([]);
        const options = ref([
            {
            "value": "郑州市",
            "label": "郑州市",
            "children": [
                { "value": "zhongyuan", "label": "中原区" },
                { "value": "erqi", "label": "二七区" },
                { "value": "guancheng", "label": "管城回族区" },
                { "value": "jinshui", "label": "金水区" },
                { "value": "shangjie", "label": "上街区" },
                { "value": "huiji", "label": "惠济区" },
                { "value": "zhongmou", "label": "中牟县" },
                { "value": "gongyi", "label": "巩义市" },
                { "value": "xingyang", "label": "荥阳市" },
                { "value": "xinmi", "label": "新密市" },
                { "value": "xinzheng", "label": "新郑市" },
                { "value": "dengfeng", "label": "登封市" }
            ]
            },
            {
            "value": "三门峡市",
            "label": "三门峡市",
            "children": [
                { "value": "hubin", "label": "湖滨区" },
                { "value": "shanzhou", "label": "陕州区" },
                { "value": "lingbao", "label": "灵宝市" },
                { "value": "yima", "label": "义马市" },
                { "value": "mianchi", "label": "渑池县" },
                { "value": "lushi", "label": "卢氏县" }
            ]
            },
            {
            "value": "平顶山市",
            "label": "平顶山市",
            "children": [
                { "value": "xinhua", "label": "新华区" },
                { "value": "weidong", "label": "卫东区" },
                { "value": "shilong", "label": "石龙区" },
                { "value": "zhanhe", "label": "湛河区" },
                { "value": "baofeng", "label": "宝丰县" },
                { "value": "yexian", "label": "叶县" },
                { "value": "lushan", "label": "鲁山县" },
                { "value": "jiaxian", "label": "郏县" },
                { "value": "wugang", "label": "舞钢市" },
                { "value": "ruzhou", "label": "汝州市" }
            ]
            },
            {
            "value": "焦作市",
            "label": "焦作市",
            "children": [
                { "value": "jiefang", "label": "解放区" },
                { "value": "zhongzhan", "label": "中站区" },
                { "value": "macun", "label": "马村区" },
                { "value": "shanyang", "label": "山阳区" },
                { "value": "xiuwu", "label": "修武县" },
                { "value": "boai", "label": "博爱县" },
                { "value": "wenxian", "label": "温县" },
                { "value": "qinyang", "label": "沁阳市" },
                { "value": "mengzhou", "label": "孟州市" }
            ]
            },
            {
            "value": "洛阳市",
            "label": "洛阳市",
            "children": [
                { "value": "laocheng", "label": "老城区" },
                { "value": "xigong", "label": "西工区" },
                { "value": "chanhe", "label": "瀍河回族区" },
                { "value": "jianxi", "label": "涧西区" },
                { "value": "jili", "label": "吉利区" },
                { "value": "luolong", "label": "洛龙区" },
                { "value": "mengjin", "label": "孟津县" },
                { "value": "xin'an", "label": "新安县" },
                { "value": "luanchuan", "label": "栾川县" },
                { "value": "songxian", "label": "嵩县" },
                { "value": "ruyang", "label": "汝阳县" },
                { "value": "yiyang", "label": "宜阳县" },
                { "value": "luoning", "label": "洛宁县" },
                { "value": "yichuan", "label": "伊川县" },
                { "value": "yanshi", "label": "偃师市" }
            ]
            },
            {
            "value": "许昌市",
            "label": "许昌市",
            "children": [
                { "value": "weidu", "label": "魏都区" },
                { "value": "jian'an", "label": "建安区" },
                { "value": "yuzhou", "label": "禹州市" },
                { "value": "changge", "label": "长葛市" },
                { "value": "yanling", "label": "鄢陵县" },
                { "value": "xuchangxian", "label": "许昌县" }
            ]
            },
            {
            "value": "开封市",
            "label": "开封市",
            "children": [
                { "value": "longting", "label": "龙亭区" },
                { "value": "shunhe", "label": "顺河回族区" },
                { "value": "gulou", "label": "鼓楼区" },
                { "value": "yuwangtai", "label": "禹王台区" },
                { "value": "xiangfu", "label": "祥符区" },
                { "value": "qixian", "label": "杞县" },
                { "value": "tongxu", "label": "通许县" },
                { "value": "weishi", "label": "尉氏县" },
                { "value": "lankao", "label": "兰考县" }
            ]
            },
            {
            "value": "周口市",
            "label": "周口市",
            "children": [
                { "value": "chuanhui", "label": "川汇区" },
                { "value": "huaiyang", "label": "淮阳区" },
                { "value": "fugou", "label": "扶沟县" },
                { "value": "xihua", "label": "西华县" },
                { "value": "shangshui", "label": "商水县" },
                { "value": "shenqiu", "label": "沈丘县" },
                { "value": "dancheng", "label": "郸城县" },
                { "value": "taikang", "label": "太康县" },
                { "value": "luyi", "label": "鹿邑县" },
                { "value": "xiangcheng", "label": "项城市" }
            ]
            },
            {
            "value": "新乡市",
            "label": "新乡市",
            "children": [
                { "value": "hongqi", "label": "红旗区" },
                { "value": "weibin", "label": "卫滨区" },
                { "value": "fengquan", "label": "凤泉区" },
                { "value": "muye", "label": "牧野区" },
                { "value": "xinxiangxian", "label": "新乡县" },
                { "value": "huojia", "label": "获嘉县" },
                { "value": "yuanyang", "label": "原阳县" },
                { "value": "yanjin", "label": "延津县" },
                { "value": "fengqiu", "label": "封丘县" },
                { "value": "changyuan", "label": "长垣市" },
                { "value": "weihui", "label": "卫辉市" },
                { "value": "huixian", "label": "辉县市" }
            ]
            },
            {
            "value": "濮阳市",
            "label": "濮阳市",
            "children": [
                { "value": "hualong", "label": "华龙区" },
                { "value": "qingfeng", "label": "清丰县" },
                { "value": "nanle", "label": "南乐县" },
                { "value": "fanxian", "label": "范县" },
                { "value": "taiqian", "label": "台前县" },
                { "value": "puyangxian", "label": "濮阳县" }
            ]
            },
            {
            "value": "安阳市",
            "label": "安阳市",
            "children": [
                { "value": "beiguan", "label": "北关区" },
                { "value": "wenfeng", "label": "文峰区" },
                { "value": "yindu", "label": "殷都区" },
                { "value": "longan", "label": "龙安区" },
                { "value": "anyangxian", "label": "安阳县" },
                { "value": "tangyin", "label": "汤阴县" },
                { "value": "huaxian", "label": "滑县" },
                { "value": "neihuang", "label": "内黄县" },
                { "value": "linzhou", "label": "林州市" }
            ]
            },
            {
            "value": "鹤壁市",
            "label": "鹤壁市",
            "children": [
                { "value": "heshan", "label": "鹤山区" },
                { "value": "shancheng", "label": "山城区" },
                { "value": "qibin", "label": "淇滨区" },
                { "value": "xunxian", "label": "浚县" },
                { "value": "qixian", "label": "淇县" }
            ]
            },
            {
            "value": "商丘市",
            "label": "商丘市",
            "children": [
                { "value": "liangyuan", "label": "梁园区" },
                { "value": "suiyang", "label": "睢阳区" },
                { "value": "minquan", "label": "民权县" },
                { "value": "suixian", "label": "睢县" },
                { "value": "ningling", "label": "宁陵县" },
                { "value": "zhecheng", "label": "柘城县" },
                { "value": "yucheng", "label": "虞城县" },
                { "value": "xiayi", "label": "夏邑县" },
                { "value": "yongcheng", "label": "永城市" }
            ]
            },
            {
            "value": "济源示范区",
            "label": "济源示范区",
            "children": [
                { "value": "jiyuan", "label": "济源市" }
            ]
            }
        ]);

        const selectedYear = ref([]);
        const yearOptions = ref(
            Array.from({ length: 2023 - 1999 + 1 }, (v, k) => ({
                value: 1999 + k,
                label: (1999 + k).toString(),
            }))
        );

        const cascaderProps = ref({
            expandTrigger: 'hover',
        });

        const yearProps = ref({
            expandTrigger: 'hover',
        });

        const handleChange = (value) => {
            const area1 = options.value.find(item => item.value === value[0])?.label || '';
            const area2 = value.length > 1 ? 
                options.value.find(item => item.value === value[0])?.children.find(item => item.value === value[1])?.label || '' 
                : '';
            emit('update:areas', { area1, area2 });
        };

        const handleYearChange = (value) => {
            emit('update:year', value[0] || '');
        };

        return {
            selectedOptions,
            options,
            cascaderProps,
            handleChange,
            selectedYear,
            yearOptions,
            yearProps,
            handleYearChange,
        };
    },
});
</script>

<style scoped>
.selector-container {
    padding: 0;
}

.selector-group {
    display: flex;
    gap: 20px;
}

:deep(.custom-cascader) {
    width: 180px;
}

:deep(.custom-cascader .el-input) {
    background-color: #409EFF;
    border-radius: 4px;
}

:deep(.custom-cascader .el-input__wrapper) {
    background-color: #409EFF;
    box-shadow: 0 0 0 1px #409EFF;
}

:deep(.custom-cascader .el-input__inner) {
    background-color: #409EFF;
    color: white;
    height: 32px;
    line-height: 32px;
    text-align: center;
}

:deep(.custom-cascader .el-input__inner::placeholder) {
    color: white;
}

:deep(.custom-cascader .el-input__suffix) {
    color: white;
    right: 10px;
}
</style>