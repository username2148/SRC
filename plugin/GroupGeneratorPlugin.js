// @name 随机分组插件
// @version 1.0.0
api.addButton('📊 随机分组', function() {
    const groupNum = parseInt(prompt('请输入分组数：'), 10);
    if (isNaN(groupNum) || groupNum < 1) return;
    
    const shuffled = [...students].sort(() => Math.random() - 0.5);
    const groups = [];
    for (let i = 0; i < groupNum; i++) {
        groups[i] = shuffled.slice(i * Math.ceil(shuffled.length/groupNum), (i+1)*Math.ceil(shuffled.length/groupNum));
    }
    
    api.alert(`分组结果（共${groupNum}组）：\n${groups.map((g, i) => `第${i+1}组：${g.join(', ')}`).join('\n')}`);
});