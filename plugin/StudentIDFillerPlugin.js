// @name 学号补全插件
// @version 1.0.0
api.addButton('📌 补全学号', function() {
    const prefix = prompt('请输入学号前缀（如"202501"）：');
    if (!prefix) return;
    
    students = students.map((s, i) => `${prefix}-${(i+1).toString().padStart(2, '0')} ${s}`);
    updateDisplay();
    api.alert(`已为 ${students.length} 人补全学号（格式：前缀-序号 姓名）`);
});

function updateDisplay() {
    document.getElementById('currentList').textContent = students.join(', ');
    document.getElementById('count').textContent = students.length;
}