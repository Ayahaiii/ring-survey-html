

// 导出
export function export2Excel(tHeader, filterVal, list, fileName) {
  require.ensure([], () => {
    const { export_json_to_excel } = require('../vendor/Export2Excel'); //这里必须使用绝对路径
    // const tHeader = tHeader; // 导出的表头名
    // const filterVal = filterVal; // 导出的表头字段名
    // const list = list; //你要导出的数据list。
    const data = list.map(v => filterVal.map(j => v[j]));
    export_json_to_excel(tHeader, data, fileName);// 导出的表格名称，根据需要自己命名
  })
}

