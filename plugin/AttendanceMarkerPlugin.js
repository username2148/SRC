// @name 考勤标记插件
// @version 1.0.0
api.addButton('✅ 标记考勤', function() {
    const absent = prompt('请输入缺勤学生姓名（逗号分隔）：').split(',').map(s => s.trim());
    const currentListEl = document.getElementById('currentList');
    
    students.forEach(student => {
        const regex = new RegExp(`\\b${student}\\b`, 'g');
        const html = absent.includes(student) 
            ? `<span style="color: red; text-decoration: line-through;">${student}</span>` 
            : student;
        currentListEl.innerHTML = currentListEl.innerHTML.replace(regex, html);
    });
    
    api.alert(`已标记 ${absent.length} 人缺勤`);
});