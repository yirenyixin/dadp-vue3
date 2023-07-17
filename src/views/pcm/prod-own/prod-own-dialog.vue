<template>
  <el-dialog
      :title="dialogTitle"
      v-model="visible"
      width="800px"
      destroy-on-close
      @closed="onClose"
  >
    <div style="display: flex; justify-content: center; align-items: center;">
      <div ref="pieChartRef" style="width: 600px; height: 400px; margin: auto;"></div>
    </div>
    <div>

    </div>
  </el-dialog>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, toRefs} from 'vue';
import * as pcmApi from '@/apis/pcm';
import * as echarts from 'echarts';
import {ElMessage} from "element-plus";

export default defineComponent({
  name: 'ProdOwnDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    dialogTitle: {
      type: String,
      default: '',
    },
    optionType: {
      type: String,
      default: '',
    },
    custId: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    // 在组件mounted钩子函数中显示弹窗
    const showMessage = () => {
      ElMessage({
        message: '没有找到用户',
        type: 'error',
        offset: 100, // 设置偏移量，让弹窗显示在界面正上方
      });
    };
    const dataMap = reactive({

      visible: computed({
        get: () => props.dialogVisible,
        set: (val: boolean) => {
          emit('update:dialogVisible', val);
        },
      }),
      viewUserId: '',
      pieData: [] as { prodOwnId: string; depBal: number;fixedDepBal:number;loanBal:number;wealthBal:number }[],
    });
    const pieChartRef = ref<HTMLElement | null>(null);

    const methodsMap = {
      async getUserDetails() {
        const queryParams = {
          prodOwnId: '',
          custId: '',
          lawOrgId: '',
          ecifCustId: '',
          isDep: '',
          isFixedDep: '',
          isLoan: '',
          isWealth: '',
          depBal: '',
          fixedDepBal: '',
          loanBal: '',
          wealthBal: '',
          pageNo: 1,
          pageSize: 10,
        };
        queryParams.custId = props.custId;
        const { data: { rows } } = await pcmApi.getProdOwn(queryParams) as {
          data: { rows: { prodOwnId: string; depBal: number;fixedDepBal:number;loanBal:number;wealthBal:number }[]; total: number };
        };
        // console.log('查询结果：', rows);
        dataMap.pieData = Array.isArray(rows) ? Array.from(rows) : [];
        // console.log('查询结果1：', dataMap.pieData);
        if(dataMap.pieData.length>0) {
          renderPieChart();
        }else{
          showMessage();
        }

      },

      onClose() {
        dataMap.visible = false;
      },
    };

    const renderPieChart = () => {
      if (pieChartRef.value) {
        const pieChart = echarts.init(pieChartRef.value);

        const total = dataMap.pieData[0].depBal + dataMap.pieData[0].fixedDepBal + dataMap.pieData[0].loanBal + dataMap.pieData[0].wealthBal;

        const pieDataArray = [
          { name: '活期余额', value: dataMap.pieData[0].depBal },
          { name: '定期余额', value: dataMap.pieData[0].fixedDepBal },
          { name: '贷款余额', value: dataMap.pieData[0].loanBal },
          { name: '理财余额', value: dataMap.pieData[0].wealthBal },
        ];

        const option = {
          title: {
            text: '好看的饼图',
          },
          series: [
            {
              type: 'pie',
              name: '数据',
              data: pieDataArray.map((item) => {
                return {
                  ...item,
                  value: item.value,
                  label: {
                    formatter: `{b} ({d}%)\n{c}`,
                  },
                  tooltip: {
                    formatter: `{b} ({d}%): {c}`,
                  },
                };
              }),
            },
          ],
        };

        pieChart.setOption(option);
      }
    };

    onMounted(async () => {
      await methodsMap.getUserDetails();
    });

    return {
      dataMap,
      pieChartRef,
      ...toRefs(methodsMap),
      ...toRefs(dataMap),
    };
  },
});
</script>