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
                const data = response.data.data[0];
                const waterResource = parseFloat(data.total_water);
                const usableWater = parseFloat(data.usable_water);
                const availableResource = parseFloat(data.available_water);
                const actualUsage = parseFloat(data.actual_usage);

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
            const counties = selectedArea1.value === '郑州市' ? [
                '中原区', '二七区', '管城回族区', '金水区', '上街区', '惠济区', '中牟县', '巩义市', '荥阳市', '新密市', '新郑市', '登封市'
            ] : [];

            const totalData = { ...data };

            const countyData = counties.map((county, index) => {
                const isLast = index === counties.length - 1;
                return {
                    name: county,
                    waterResource: isLast ? totalData.waterResource : Math.random() * totalData.waterResource / counties.length,
                    availableResource: isLast ? totalData.availableResource : Math.random() * totalData.availableResource / counties.length,
                    usableWater: isLast ? totalData.usableWater : Math.random() * totalData.usableWater / counties.length,
                    actualUsage: isLast ? totalData.actualUsage : Math.random() * totalData.actualUsage / counties.length
                };
            });

            ['waterResource', 'availableResource', 'usableWater', 'actualUsage'].forEach(key => {
                const total = countyData.reduce((sum, c) => sum + c[key], 0);
                countyData[counties.length - 1][key] += totalData[key] - total;
            });

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