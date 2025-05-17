// @name 名单去重插件
// @version 1.0.0

// 添加去重按钮
api.addButton('名单去重', function() {
    const originalCount = students.length;
    students = [...new Set(students)]; // 去重逻辑
    updateDisplay(); // 刷新显示
    api.alert(`已移除 ${originalCount - students.length} 个重复项`);
    api.log('名单去重完成');
});