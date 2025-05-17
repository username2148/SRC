// @name Excel导出插件
// @version 1.0.0
api.addButton('📄 导出Excel', function() {
    const worksheet = XLSX.utils.json_to_sheet([{姓名: '学生名单', 值: students.join('\n')}, ...history.map(h => ({时间: h.time, 结果: h.results.join(', '))]));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '数据');
    
    XLSX.writeFile(workbook, `student_data_${Date.now()}.xlsx`);
    api.log('Excel导出完成');
});
// 需引入SheetJS库（需在插件中添加<script src="https://cdn.sheetjs.com/sheetjs/latest/sheetjs.min.js"></script>）