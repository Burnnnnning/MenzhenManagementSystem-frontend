<template>
    <div class="statistic-view">
        <div class="content-wrapper">
            <StatisticSelector @update:areas="handleAreasUpdate" @update:year="handleYearUpdate" />
            <div class="display-container">
                <StatisticDisplay :area1="selectedArea1" :area2="selectedArea2" :year="selectedYear.toString()" />
            </div>
        </div>
        <div class="divider"></div>
        <StatisticChart :area1="selectedArea1" :area2="selectedArea2" :year="selectedYear" :chartData="chartData"
            :loading="loading" />
    </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import StatisticSelector from '@/components/statistic/StatisticSelector';
import StatisticDisplay from '@/components/statistic/StatisticDisplay';
import StatisticChart from '@/components/statistic/StatisticChart';
import api_statistic from '@/api/statistic';

export default defineComponent({
    name: 'Statistic',
    components: {
        StatisticSelector,
        StatisticDisplay,
        StatisticChart
    },
    setup() {
        const route = useRoute();
        const selectedArea1 = ref('');
        const selectedArea2 = ref('');
        const selectedYear = ref('');
        const chartData = ref(null);
        const loading = ref(false);
        const isFirstLoad = ref(true);

        const fetchData = async (area, year) => {
            if (!area || !year) return;
            loading.value = true;
            try {
                const response = await api_statistic.getWaterResourceSummaries(area, year);
                console.log('response:', response);
                console.log('response.data:', response.data);
                console.log('response.data[0]:', response.data[0]);
                // 判断data是否为空
                const data = response.data[0];
                if (!data) {
                    console.error('No data found in response');
                    return;
                }
                const waterResource = parseFloat(data.total_water);
                const usableWater = parseFloat(data.usable_water);
                const availableResource = parseFloat(data.available_water);
                const actualUsage = parseFloat(data.actual_usage);
                // console.log('waterResource:', waterResource);
                // console.log('usableWater:', usableWater);
                // console.log('availableResource:', availableResource);
                // console.log('actualUsage:', actualUsage);

                chartData.value = {
                    waterResource,
                    usableWater,
                    availableResource,
                    actualUsage
                };

                distributeDataToCounties(chartData.value);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                loading.value = false;
            }
        };

        const distributeDataToCounties = (data) => {
            // 检查 data 是否为空
            if (!data) {
                console.error('Data is undefined or null');
                return;
            }
            console.log('selectedArea1:', selectedArea1)
            // 定义 counties
            const counties = selectedArea1.value === '郑州市' ? [
                '中原区', '二七区', '管城回族区', '金水区', '上街区', '惠济区', '中牟县', '巩义市', '荥阳市', '新密市', '新郑市', '登封市'
            ] : [];

            // 检查 counties 是否为空
            if (counties.length === 0) {
                console.error('No counties found for the selected area');
                return;
            }

            // 创建 totalData 的副本
            const totalData = { ...data };

            // 初始化 countyData
            const countyData = counties.map((county) => {
                return {
                    name: county,
                    waterResource: Math.random() * (totalData.waterResource || 0) / counties.length,
                    availableResource: Math.random() * (totalData.availableResource || 0) / counties.length,
                    usableWater: Math.random() * (totalData.usableWater || 0) / counties.length,
                    actualUsage: Math.random() * (totalData.actualUsage || 0) / counties.length
                };
            });

            console.log('Initial countyData:', countyData);

            // 调整最后一个县区的值，确保总和与 totalData 一致
            ['waterResource', 'availableResource', 'usableWater', 'actualUsage'].forEach(key => {
                // 计算当前总和
                const total = countyData.reduce((sum, c) => sum + (c[key] || 0), 0);

                // 计算差值并累加到最后一个县区
                countyData[counties.length - 1][key] = (countyData[counties.length - 1][key] || 0) + (totalData[key] || 0) - total;

                // 调试日志
                if (process.env.NODE_ENV === 'development') {
                    console.log(`Adjusted ${key}:`, countyData.map(c => c[key]));
                }
            });

            // 更新 chartData
            chartData.value = { ...chartData.value, countyData };
        };

        const handleAreasUpdate = ({ area1, area2 }) => {
            selectedArea1.value = area1;
            selectedArea2.value = area2;
            if (selectedYear.value) {
                fetchData(area1, selectedYear.value);
            }
        };

        const handleYearUpdate = (year) => {
            selectedYear.value = year.toString();
            if (selectedArea1.value) {
                fetchData(selectedArea1.value, year);
            }
        };

        watch(() => route.path, (newPath) => {
            if (newPath === '/statistic' && isFirstLoad.value) {
                isFirstLoad.value = false;
                fetchData('郑州市', '2022');
            }
        }, { immediate: true });

        return {
            selectedArea1,
            selectedArea2,
            selectedYear,
            chartData,
            loading,
            handleAreasUpdate,
            handleYearUpdate
        };
    }
});
</script>

<style scoped>
.statistic-view {
    width: 100%;
    position: relative;
}

.content-wrapper {
    padding: 15px 20px;
    display: flex;
    align-items: center;
}

.display-container {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-left: -250px;
}

.divider {
    height: 1.5px;
    background-color: #d3d4d7;
    position: absolute;
    top: 54px;
    width: 100vw;
    margin: 0;
}
</style>