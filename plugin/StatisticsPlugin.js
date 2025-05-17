// @name 数据统计插件
// @version 1.0.0
api.addButton('📈 统计分析', function() {
    const drawCounts = {};
    history.forEach(item => {
        item.results.forEach(s => drawCounts[s] = (drawCounts[s] || 0) + 1);
    });
    
    const sorted = Object.entries(drawCounts).sort((a, b) => b[1] - a[1]);
    const stats = `抽选次数统计（共${history.length}次）：\n${sorted.map(([name, count]) => `${name}: ${count}次`).join('\n')}`;
    
    api.alert(stats);
});