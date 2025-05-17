// @name 学生删除插件
// @version 1.0.0
// @description 支持按姓名/前缀批量删除学生

// 添加删除功能按钮
api.addButton('🗑️ 删除学生', function() {
    const deleteCondition = prompt('请输入删除条件：\n1. 精确姓名（如"张三"）\n2. 姓名前缀（如"张"）', '');
    
    if (!deleteCondition) return;
    
    // 执行删除逻辑
    const originalCount = students.length;
    const regex = /^[^\s].+/.test(deleteCondition) // 非空开头
        ? new RegExp(`^${deleteCondition}`, 'i') // 前缀匹配（不区分大小写）
        : new RegExp(`^${deleteCondition}$`, 'i'); // 精确匹配
    
    students = students.filter(student => !regex.test(student));
    
    if (students.length < originalCount) {
        updateDisplay(); // 刷新名单显示
        api.alert(`成功删除 ${originalCount - students.length} 人\n剩余：${students.length} 人`);
        api.log(`[删除插件] 条件：${deleteCondition}，删除数量：${originalCount - students.length}`);
    } else {
        api.alert('未找到匹配的学生');
    }
});

// 绑定到主系统的更新显示事件
function updateDisplay() {
    document.getElementById('currentList').textContent = students.join(', ');
    document.getElementById('count').textContent = students.length;
}