import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';

import { useTimeoutFn } from '../useTimeout';
import { tryOnUnmounted } from '@vueuse/core';
import { unref, nextTick, watch, computed, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useEventListener } from '../useEventListener';
import { useBreakpoint } from '../useBreakpoint';

// import echarts from './lib/echarts';
import * as echarts from 'echarts';
// import { useRootSetting } from '/@/hooks/setting/useRootSetting';

export function useECharts(elRef: Ref<HTMLDivElement>, theme: 'light' | 'dark' | 'default' = 'default') {
  //const { getDarkMode: getSysDarkMode } = useRootSetting();

  const getDarkMode = computed(() => {
    // return theme === 'default' ? getSysDarkMode.value : theme;
    return 'default';
  });
  let chartInstance: echarts.ECharts | null = null;
  let resizeFn: AnyFunction<any> = resize;
  const cacheOptions = ref({}) as Ref<EChartsOption>;
  let removeResizeFn: AnyFunction<any> = () => {};

  resizeFn = useDebounceFn(resize, 200);

  const defaultOptions = {
    grid: {
      top: '70',
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      top: '10',
      right: '10',
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: { show: false },
        saveAsImage: { show: true },
      },
    },
    dataZoom: [
      {
        type: 'slider',
        show: false,
        height: 16,
        left: '5%',
        right: '5%',
        bottom: '0',
        start: 0,
        end: 100,
        textStyle: {
          color: '#333',
          fontSize: 11,
        },
      },
      {
        type: 'inside',
      },
    ],
  };

  const getOptions = computed(() => {
    if (getDarkMode.value !== 'dark') {
      return {
        ...defaultOptions,
        ...cacheOptions.value,
      } as EChartsOption;
    }
    return {
      ...defaultOptions,
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    } as EChartsOption;
  });

  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, t);
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    const { widthRef, screenEnum } = useBreakpoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30);
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(getDarkMode.value as 'default');

          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(unref(getOptions));

        // echarts中的区域缩放组件dataZoom，主动触发选区缩放点击事件
        chartInstance.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'dataZoomSelect',
          // 启动或关闭
          dataZoomSelectActive: true,
        });

        // echarts双击事件，还原dataZoom，还原主动触发选区缩放点击事件
        chartInstance.getZr().on('dblclick', () => {
          chartInstance?.setOption(unref(getOptions), true);
          chartInstance?.dispatchAction({
            type: 'takeGlobalCursor',
            key: 'dataZoomSelect',
            // 启动或关闭
            dataZoomSelectActive: true,
          });
        });
      }, 30);
    });
  }

  function resize(opts?: {
    width?: number | string;
    height?: number | string;
    silent?: boolean;
    animation?: {
      duration?: number;
      easing?: string;
    };
  }) {
    const options = {
      width: opts && opts.width ? opts.width : 'auto',
      height: opts && opts.height ? opts.height : 'auto',
      silent: opts && opts.silent ? opts.silent : 'auto',
      animation: opts && opts.animation ? opts.animation : 'auto',
    };
    chartInstance?.resize(options);
  }

  watch(
    () => getDarkMode.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose();
        initCharts(theme as 'default');
        setOptions(cacheOptions.value);
      }
    }
  );

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkMode.value as 'default');
    }
    return chartInstance;
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  };
}
