// @name 名单搜索插件
// @version 1.0.0
api.addButton('🔍 搜索学生', function() {
    const keyword = prompt('请输入搜索关键词：');
    if (!keyword) return;
    
    const results = students.filter(s => s.includes(keyword));
    api.alert(`找到 ${results.length} 人：\n${results.join('\n')}`);
});