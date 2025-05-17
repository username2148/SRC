// @name 数据导出插件
// @version 1.0.0

// 导出名单和历史记录为CSV
api.addButton('导出数据', function() {
    const data = [
        ['学生名单', ...students],
        ['抽选历史', ...history.map(item => item.results.join(','))]
    ].join('\n');
    
    const blob = new Blob([data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_data_${Date.now()}.csv`;
    a.click();
    
    api.log('数据导出完成');
});